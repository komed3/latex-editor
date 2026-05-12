import { Search, Sigma } from 'lucide-react';
import type React from 'react';

export const Ribbon: React.FC = ( {} ) => {
  return (
    <header className="relative z-100 flex flex-col shrink-0 bg-[#f3f2f1] select-none shadow-sm">
      <div className="flex items-center gap-3 h-12 px-4 text-white bg-[#2b579a]">
        <div className="flex justify-center items-center w-7 h-7 bg-white rounded-md shadow-sm">
          <Sigma size={ 18 } className="text-[#323130]" strokeWidth={ 2.5 } />
        </div>
        <h1 className="text-sm font-semibold tracking-tight">LaTeX Formula Editor</h1>
        <div className="flex-1 flex justify-center px-4">
          <div className="group relative flex items-center w-full max-w-lg h-8">
            <Search size={ 14 } className="
              absolute left-3 z-10 text-white/60 group-focus-within:text-[#323130]
              group-hover:text-[#323130] transition-colors
            " />
            <input type="text" placeholder="Search symbols …" className="
              w-full h-full py-0 pl-9 pr-3 text-xs text-white focus:text-[#323130] bg-white/10
              hover:bg-white focus:bg-white placeholder:text-white/50 hover:placeholder:text-[#323130]/40
              rounded border border-transparent focus:border-white outline-none transition-all
            " />
          </div>
        </div>
        <div className="flex gap-2 font-mono text-[10px] opacity-60">
          <span>Build { process.env.build || 'XXXXXXX' }</span>
        </div>
      </div>
    </header>
  );
};
