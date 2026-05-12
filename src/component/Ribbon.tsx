import { Search, Sigma } from 'lucide-react';
import type React from 'react';
import { LATEX_CATEGORIES, LATEX_SYMBOLS } from '../def/latex';

interface RibbonProps {
  activeTab: string;
  setActiveTab: ( tab: string ) => void;
  insertLatex: ( latex: string ) => void;
  onClear: () => void;
  onShare: () => void;
  onExportPNG: () => void;
  onExportPDF: () => void;
  searchQuery: string;
  setSearchQuery: ( query: string ) => void;
}

export const Ribbon: React.FC< RibbonProps > = ( {
  activeTab, setActiveTab, insertLatex, onClear, onShare, onExportPNG,
  onExportPDF, searchQuery, setSearchQuery
} ) => {
  const filteredSymbols = LATEX_SYMBOLS.filter( s => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = s.label.toLowerCase().includes( query ) || s.latex.toLowerCase().includes( query );

    return searchQuery ? matchesSearch : s.category === activeTab;
  } );

  return (
    <header className="relative z-100 flex flex-col shrink-0 bg-[#f3f2f1] select-none shadow-sm">
      {/** Title and search bar */}
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

      {/** Category tabs */}
      <div className="flex items-end h-9 px-2 bg-white border-b border-[#e1dfdd]">
        <div className="flex items-end gap-1 h-full">
          { LATEX_CATEGORIES.map( cat => (
            <button key={ cat } className={
              `flex items-center shrink-0 h-[85%] px-4 text-xs font-medium rounded-t border-t border-x transition-colors cursor-pointer ${
                false
                  ? "text-[#2b579a] bg-[#f3f2f1] border-[#e1dfdd] shadow-[0_1px_0_#f3f2f1]"
                  : "text-[#323130] bg-transparent hover:bg-[#f3f2f1] border-transparent"
              }`
            }>{ cat }</button>
          ) ) }
        </div>
        <div className="flex-1" />
        <div className="flex gap-1 py-1 pr-1">
          //
        </div>
      </div>
    </header>
  );
};
