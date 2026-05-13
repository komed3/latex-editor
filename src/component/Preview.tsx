import katex from 'katex';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import React, { useEffect, useRef, useState, memo } from 'react';
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
  onWheel: ( e: React.WheelEvent ) => void;
  onMouseDown: ( e: React.MouseEvent ) => void;
  setZoom: ( val: ( prev: number ) => number ) => void;
  resetView: () => void;
  setAutoZoom: ( val: boolean ) => void;
}

export const Preview: React.FC< PreviewProps > = memo( ( {
  latex, zoom, pan, isPanning, isExporting, exportPadding, autoZoom, previewRef,
  onWheel, onMouseDown, setZoom, resetView, setAutoZoom
} ) => {
  const contentRef = useRef< HTMLDivElement >( null );
  const containerRef = useRef< HTMLDivElement >( null );
  const [ internalScale, setInternalScale ] = useState( 1 );
  const [ contentDims, setContentDims ] = useState( { w: 0, h: 0 } );
  const { showTooltip, hideTooltip } = useTooltip();

  useEffect( () => {
    const updateScale = () => {
      if ( contentRef.current && containerRef.current ) {
        const cWidth = contentRef.current.scrollWidth;
        const cHeight = contentRef.current.scrollHeight;
        setContentDims( { w: cWidth, h: cHeight } );

        if ( autoZoom ) {
          if ( cWidth === 0 || cHeight === 0 ) return;

          // Calculate equal padding based on the larger dimension
          const paddingInPx = Math.max( cWidth, cHeight ) * exportPadding + 2;
          const targetW = cWidth + paddingInPx * 2;
          const targetH = cHeight + paddingInPx * 2;
          const containerWidth = containerRef.current.clientWidth - 40;
          const containerHeight = containerRef.current.clientHeight - 40;
          const scaleX = containerWidth / targetW;
          const scaleY = containerHeight / targetH;
          const scale = Math.min( scaleX, scaleY, 4 );

          setInternalScale( Math.max( 0.1, scale ) );
        } else if ( ! autoZoom ) {
          setInternalScale( 1 );
        }
      }
    };

    updateScale();

    const timer = setTimeout( updateScale, 100 );
    window.addEventListener( 'resize', updateScale );
    return () => {
      window.removeEventListener( 'resize', updateScale );
      clearTimeout( timer );
    };
  }, [ latex, autoZoom, exportPadding ] );

  const handleMouseMove = ( e: React.MouseEvent, label: string ) => {
    showTooltip( label, e.clientX, e.clientY );
  };

  const currentZoom = autoZoom ? internalScale : zoom;

  // Calculate guide line positions
  const containerWidth = containerRef.current?.clientWidth || 0;
  const containerHeight = containerRef.current?.clientHeight || 0;
  const centerX = containerWidth / 2 + pan.x;
  const centerY = containerHeight / 2 + pan.y;
  const currentPadding = Math.max( contentDims.w, contentDims.h ) * exportPadding + 2;

  const edgeL = centerX - ( contentDims.w / 2 + currentPadding ) * currentZoom;
  const edgeR = centerX + ( contentDims.w / 2 + currentPadding ) * currentZoom;
  const edgeT = centerY - ( contentDims.h / 2 + currentPadding ) * currentZoom;
  const edgeB = centerY + ( contentDims.h / 2 + currentPadding ) * currentZoom;

  return (
    <div className="relative flex-1 flex flex-col bg-[#edebe9] overflow-hidden select-none touch-none">
      <div className="flex justify-between items-center h-8 px-4 z-20 font-medium text-[11px] text-[#605e5c] bg-white border-b border-[#e1dfdd]">
        <div className="flex items-center gap-4">
          <span className="uppercase tracking-wider opacity-60">Result Preview</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={ () => setZoom( z => Math.max( z - 0.1, 0.1 ) ) }
            onMouseMove={ ( e ) => handleMouseMove( e, 'Zoom Out' ) }
            onMouseLeave={ hideTooltip }
            className="hover:text-[#2b579a] cursor-pointer"
          ><ZoomOut size={ 14 } /></button>
          <span className="w-10 text-center font-mono">{ Math.round( zoom * 100 ) }%</span>
          <button
            onClick={ () => setZoom( z => Math.min( z + 0.1, 5 ) ) }
            onMouseMove={ ( e ) => handleMouseMove( e, 'Zoom In' ) }
            onMouseLeave={ hideTooltip }
            className="hover:text-[#2b579a] cursor-pointer"
          ><ZoomIn size={ 14 } /></button>
          <div className="w-px h-3 bg-[#e1dfdd]" />
          <button
            onClick={ resetView }
            onMouseMove={ ( e ) => handleMouseMove( e, 'Reset View' ) }
            onMouseLeave={ hideTooltip }
            className="hover:text-[#2b579a] cursor-pointer"
          ><Maximize2 size={ 14 } /></button>
        </div>
      </div>

      {/** LaTeX preview */}
      <div onWheel={ onWheel } onMouseDown={ onMouseDown } className={
        `relative flex-1 overflow-hidden ${ isPanning ? 'cursor-grabbing' : 'cursor-grab' }`
      }>
        <div className="absolute flex justify-center items-center pointer-events-none inset-0" style={ {
          transform: `translate(${ pan.x }px, ${ pan.y }px) scale(${ zoom })`,
          transformOrigin: "center"
        } }>
          <div id="export-container" ref={ previewRef } className="
            relative flex justify-center items-center min-w-200 min-h-100 p-20 pointer-events-auto
            bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]
          ">
            <div
              ref={ contentRef }
              style={ { transform: `scale(${ 1 })`, transformOrigin: 'center' } }
              className="text-[80px] transition-all duration-300 opacity-100"
              dangerouslySetInnerHTML={ {
                __html: katex.renderToString( latex, { displayMode: true, throwOnError: false } )
              } }
            />
          </div>
        </div>
      </div>
    </div>
  );
} );

Preview.displayName = 'Preview';
