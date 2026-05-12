import { execSync } from 'node:child_process';
import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const build = execSync( 'git rev-parse --short HEAD' ).toString().trim();

export default defineConfig( () => ( {
  plugins: [ react(), tailwindcss() ],
  resolve: { alias: { '@': resolve( __dirname, '.' ) } },
  define: { 'process.env.build': JSON.stringify( build ) }
} ) );
