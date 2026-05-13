import { execSync } from 'node:child_process';
import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const build = execSync( 'git rev-parse --short HEAD' ).toString().trim();

export default defineConfig( () => ( {
  base: '/latex-editor/',
  plugins: [ react(), tailwindcss() ],
  resolve: { alias: { '@': resolve( __dirname, '.' ) } },
  define: { 'process.env.build': JSON.stringify( build ) },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: { output: { manualChunks( id: string ) {
      if ( id.includes( 'node_modules' ) ) {
        if ( id.includes( 'html-to-image' ) ) return 'html2img';
        if ( id.includes( 'jspdf' ) ) return 'jspdf';
        if ( id.includes( 'katex' ) ) return 'katex';
        if ( id.includes( 'lucide' ) ) return 'icons';
        if ( id.includes( 'prismjs' ) ) return 'prismjs';
        if ( id.includes( 'react' ) || id.includes( 'react-dom' ) ) return 'react';
        return 'vendor';
      }
    } } }
  }
} ) );
