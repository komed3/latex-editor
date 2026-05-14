import React, { useState, useCallback, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';

export interface Tooltip {
  content: string | { latex: string; tooltip: string };
  x: number;
  y: number;
}

interface TooltipContextType {
  showTooltip: ( content: string | { latex: string; tooltip: string }, x: number, y: number ) => void;
  hideTooltip: () => void;
}

const TooltipContext = createContext< TooltipContextType | undefined >( undefined );

export const TooltipProvider: React.FC< { children: React.ReactNode } > = ( { children } ) => {
  const [ tooltip, setTooltip ] = useState< Tooltip | null >( null );

  const showTooltip = useCallback( ( content: string | { latex: string; tooltip: string }, x: number, y: number ) => {
    setTooltip( { content, x, y } );
  }, [] );

  const hideTooltip = useCallback( () => {
    setTooltip( null );
  }, [] );

  const getPositionStyle = () => {
    if ( ! tooltip ) return {};

    const offset = 18;
    const padding = 16;
    let x = tooltip.x;
    let y = tooltip.y + offset;

    const estWidth = 140;
    const estHeight = 46;

    if ( x + estWidth / 2 > window.innerWidth - padding ) x = window.innerWidth - estWidth / 2 - padding;
    if ( x - estWidth / 2 < padding ) x = estWidth / 2 + padding;
    if ( y + estHeight > window.innerHeight - padding ) y = tooltip.y - estHeight - offset;

    return { top: `${ y }px`, left: `${ x }px` };
  };

  return (
    <TooltipContext.Provider value={ { showTooltip, hideTooltip } }>
      { children }
      { tooltip && createPortal(
        <div style={ getPositionStyle() } className="
          fixed z-10000 flex flex-col gap-1 items-center py-1.5 px-3 text-[10px] text-white bg-[#323130]
          border border-white/10 rounded shadow-2xl pointer-events-none -translate-x-1/2 animate-in
          fade-in zoom-in-95 duration-100
        ">
          { typeof tooltip.content === 'string' ? (
            <span className="whitespace-nowrap font-medium">{ tooltip.content }</span>
          ) : (
            <>
              <div className="font-bold whitespace-nowrap">{ tooltip.content.tooltip }</div>
              <div className="w-full h-px bg-white/10" />
              <code className="font-mono whitespace-nowrap text-sky-300">{ tooltip.content.latex }</code>
            </>
          ) }
        </div>,
        document.body
      ) }
    </TooltipContext.Provider>
  );
};

export const useTooltip = () => {
  const context = useContext( TooltipContext );
  if ( ! context ) throw new Error( 'useTooltip must be used within TooltipProvider' );

  return context;
};
