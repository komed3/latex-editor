import katex from 'katex';
import { Search, Sigma } from 'lucide-react';
import type React from 'react';
import { LATEX_CATEGORIES, LATEX_SYMBOLS, type LaTeXSymbol } from '../def/latex';

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

interface AButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  colorClass: string;
  onLeave: () => void;
  onMove: ( e: React.MouseEvent, label: string ) => void;
}

interface SButtonProps {
  symbol: LaTeXSymbol;
  onClick: () => void;
  onLeave: () => void;
  onMove: ( e: React.MouseEvent, symbol: any ) => void;
}

const ActionButton: React.FC< AButtonProps > = ( { onClick, icon, label, colorClass, onLeave, onMove } ) => (
  <button onClick={ onClick } onMouseLeave={ onLeave } onMouseMove={ ( e ) => onMove( e, label ) } className={
    `p-1.5 rounded hover:bg-[#edebe9] active:bg-[#e1dfdd] ${ colorClass } transition-colors cursor-pointer`
  }>{ icon }</button>
);

const SymbolButton: React.FC< SButtonProps > = ( { symbol, onClick, onLeave, onMove } ) => (
  <button onClick={ onClick } onMouseLeave={ onLeave } onMouseMove={ ( e ) => onMove( e, symbol ) } className="
    group flex flex-col justify-start items-center min-w-19 h-21.5 pt-1 pb-1 bg-white/50
    hover:bg-white active:bg-[#edebe9] rounded-sm border border-transparent hover:border-[#c8c6c4]
    transition-all cursor-pointer
  ">
    <div className="pointer-events-none flex-1 flex justify-center items-center w-full max-h-14 px-1 text-[#323130] overflow-hidden">
      <div className={
        `flex justify-center items-center transform scale-[${ symbol.scale }] origin-center`
      } dangerouslySetInnerHTML={ {
        __html: katex.renderToString( symbol.latex, { throwOnError: false } )
      } } />
    </div>
    <span className="
      flex justify-center items-center w-full h-4 px-1 font-medium text-center truncate text-[9px]
      text-[#605e5c] opacity-60 group-hover:opacity-100 transition-opacity
    ">{ symbol.label }</span>
  </button>
);

export const Ribbon: React.FC< RibbonProps > = ( {
  activeTab, setActiveTab, insertLatex, onClear, onShare, onExportPNG,
  onExportPDF, searchQuery, setSearchQuery
} ) => {
  const filteredSymbols = LATEX_SYMBOLS.filter( s => {
    const query = searchQuery.toLowerCase();

    return searchQuery
      ? s.label.toLowerCase().includes( query ) ||
        s.latex.toLowerCase().includes( query )
      : s.category === activeTab;
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
            <input type="text" placeholder="Search symbols …" value={ searchQuery } onChange={
              ( e ) => setSearchQuery( e.target.value )
            } className="
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
            <button key={ cat } onClick={
              () => { setActiveTab( cat ), setSearchQuery( '' ) }
            } className={
              `flex items-center shrink-0 h-[85%] px-4 text-xs font-medium rounded-t border-t border-x transition-colors cursor-pointer ${
                activeTab === cat && ! searchQuery
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
