import katex from 'katex';
import 'katex/dist/contrib/mhchem.mjs';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import React, { memo } from 'react';
import { useTooltip } from './Tooltip';

interface PreviewProps {
  latex: string;
  zoom: number;
  pan: { x: number; y: number };
  isPanning: boolean;
  isExporting: boolean;
  exportPadding: number;
  autoZoom: boolean;
  previewRef: React.RefObject< HTMLDivElement | null >;
  containerRef: React.RefObject< HTMLDivElement | null >;
  contentRef: React.RefObject< HTMLDivElement | null >;
  dimensions: {
    containerW: number;
    containerH: number;
    contentW: number;
    contentH: number;
  };
  onWheel: ( e: React.WheelEvent ) => void;
  onMouseDown: ( e: React.MouseEvent ) => void;
  setZoom: React.Dispatch< React.SetStateAction< number > >;
  resetView: () => void;
  setAutoZoom: ( val: boolean ) => void;
}

export const Preview: React.FC< PreviewProps > = memo( ( {
  latex, zoom, pan, isPanning, isExporting, exportPadding, autoZoom,
  previewRef, containerRef, contentRef, dimensions,
  onWheel, onMouseDown, setZoom, resetView, setAutoZoom
} ) => {
  const { showTooltip, hideTooltip } = useTooltip();

  const handleMouseMove = ( e: React.MouseEvent, label: string ) => {
    showTooltip( label, e.clientX, e.clientY );
  };

  // Center coordinates in the container
  const centerX = dimensions.containerW / 2 + pan.x;
  const centerY = dimensions.containerH / 2 + pan.y;

  // Calculate padding in pixels based on content dimensions
  const currentPadding = Math.max( dimensions.contentW, dimensions.contentH ) * exportPadding + 2;

  // Edge positions for guide lines
  const edgeL = centerX - ( dimensions.contentW / 2 + currentPadding ) * zoom;
  const edgeR = centerX + ( dimensions.contentW / 2 + currentPadding ) * zoom;
  const edgeT = centerY - ( dimensions.contentH / 2 + currentPadding ) * zoom;
  const edgeB = centerY + ( dimensions.contentH / 2 + currentPadding ) * zoom;

  return (
    <div className="relative flex-1 flex flex-col bg-white overflow-hidden select-none touch-none">
      <div className="flex justify-between items-center h-8 px-4 z-20 font-medium text-[11px] text-[#605e5c] bg-white border-b border-[#e1dfdd]">
        <div className="flex items-center gap-4">
          <span className="uppercase tracking-wider opacity-60">Result Preview</span>
          <div className="w-px h-4 bg-[#e1dfdd]" />
          <label className="flex items-center gap-2 hover:text-[#2b579a] cursor-pointer">
            <input type="checkbox" checked={ autoZoom } onChange={ ( e ) => {
              if ( e.target.checked ) resetView();
              else setAutoZoom( false );
            } } className="accent-[#2b579a]" />
            <span>Auto Scale</span>
          </label>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={ () => {
                setZoom( z => Math.max( z - 0.1, 0.1 ) );
                setAutoZoom( false );
            } }
            onMouseMove={ ( e ) => handleMouseMove( e, 'Zoom Out' ) }
            onMouseLeave={ hideTooltip }
            className="hover:text-[#2b579a] cursor-pointer"
          ><ZoomOut size={ 14 } /></button>
          <span className="w-10 text-center font-mono">{ Math.round( zoom * 100 ) }%</span>
          <button
            onClick={ () => {
                setZoom( z => Math.min( z + 0.1, 5 ) );
                setAutoZoom( false );
            } }
            onMouseMove={ ( e ) => handleMouseMove( e, 'Zoom In' ) }
            onMouseLeave={ hideTooltip }
            className="hover:text-[#2b579a] cursor-pointer"
          ><ZoomIn size={ 14 } /></button>
          <div className="w-px h-4 bg-[#e1dfdd]" />
          <button
            onClick={ resetView }
            onMouseMove={ ( e ) => handleMouseMove( e, 'Reset View' ) }
            onMouseLeave={ hideTooltip }
            className="hover:text-[#2b579a] cursor-pointer"
          ><Maximize2 size={ 14 } /></button>
        </div>
      </div>

      {/** Viewport container */}
      <div
        ref={ containerRef }
        className={ `flex-1 overflow-hidden relative ${ isPanning ? 'cursor-grabbing' : 'cursor-grab' }` }
        onMouseDown={ onMouseDown }
        onWheel={ onWheel }
      >
        {/** Guide Lines Layer */}
        { ! isExporting && (
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            <div className="absolute left-0 right-0 h-px border-t border-dashed border-[#2b579a]/40" style={ { top: edgeT } } />
            <div className="absolute left-0 right-0 h-px border-t border-dashed border-[#2b579a]/40" style={ { top: edgeB } } />
            <div className="absolute top-0 bottom-0 w-px border-l border-dashed border-[#2b579a]/40" style={ { left: edgeL } } />
            <div className="absolute top-0 bottom-0 w-px border-l border-dashed border-[#2b579a]/40" style={ { left: edgeR } } />
          </div>
        ) }

        {/** Transformation Layer */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none" style={ {
          transform: `translate(${ pan.x }px, ${ pan.y }px) scale(${ zoom })`,
          transformOrigin: 'center'
        } }>
          {/** Export target */}
          <div id="export-container" ref={ previewRef } className="relative flex justify-center items-center p-0 bg-white pointer-events-auto">
            {/** Content for measurement */}
            <div ref={ contentRef } className="m-0 p-0 text-[80px] opacity-100" dangerouslySetInnerHTML={ {
              __html: katex.renderToString( latex, { displayMode: true, throwOnError: false } )
            } } />
          </div>
        </div>
      </div>
    </div>
  );
} );

Preview.displayName = 'Preview';
