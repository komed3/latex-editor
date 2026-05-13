import type React from 'react';

interface FooterProps {
  length: number;
  isExporting: boolean;
}

export const Footer: React.FC< FooterProps > = ( { length, isExporting } ) => {
  return (
    <footer className="flex justify-between items-center shrink-0 h-6 px-4 text-[11px] text-white bg-[#2b579a]">
      <div className="flex items-center gap-4">
        <span className="mr-4">{ length } characters</span>
        { isExporting ? (
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            Exporting …
          </span>
        ) : '' }
      </div>
      <div className="flex items-center gap-3 uppercase text-[10px] opacity-70">
        <span>&copy; 2026 by <a href="https://komed3.de" target="_blank">komed3</a></span>
        <div className="w-px h-3 my-1 bg-[#e1dfdd]" />
        <a href="https://github.com/komed3/latex-editor" target="_blank">GitHub</a>
        <div className="w-px h-3 my-1 bg-[#e1dfdd]" />
        <a href="https://en.wikibooks.org/wiki/LaTeX/Mathematics" target="_blank">LaTeX Docs</a>
        <div className="w-px h-3 my-1 bg-[#e1dfdd]" />
        <span>Build { process.env.build || 'XXXXXXX' }</span>
      </div>
    </footer>
  );
};
