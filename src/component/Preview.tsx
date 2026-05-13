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
    <div className="relative flex-1 flex flex-col bg-white overflow-hidden select-none touch-none">
      <div className="flex justify-between items-center h-8 px-4 z-20 font-medium text-[11px] text-[#605e5c] bg-white border-b border-[#e1dfdd]">
        <div className="flex items-center gap-4">
          <span className="uppercase tracking-wider opacity-60">Result Preview</span>
          <div className="w-px h-4 bg-[#e1dfdd]" />
          <label className="flex items-center gap-2 hover:text-[#2b579a] cursor-pointer">
            <input type="checkbox" checked={ autoZoom } onChange={ ( e ) => {
              if ( e.target.checked ) resetView();
              setAutoZoom( e.target.checked );
            } } className="accent-[#2b579a]" />
            <span>Auto Scale</span>
          </label>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={ () => {
                setZoom( () => Math.max( currentZoom - 0.1, 0.1 ) );
                setAutoZoom( false );
            } }
            onMouseMove={ ( e ) => handleMouseMove( e, 'Zoom Out' ) }
            onMouseLeave={ hideTooltip }
            className="hover:text-[#2b579a] cursor-pointer"
          ><ZoomOut size={ 14 } /></button>
          <span className="w-10 text-center font-mono">{ Math.round( zoom * 100 ) }%</span>
          <button
            onClick={ () => {
                setZoom( () => Math.min( currentZoom + 0.1, 5 ) );
                setAutoZoom( false );
            } }
            onMouseMove={ ( e ) => handleMouseMove( e, 'Zoom In' ) }
            onMouseLeave={ hideTooltip }
            className="hover:text-[#2b579a] cursor-pointer"
          ><ZoomIn size={ 14 } /></button>
          <div className="w-px h-4 bg-[#e1dfdd]" />
          <button
            onClick={ () => { resetView(), setAutoZoom( true ) } }
            onMouseMove={ ( e ) => handleMouseMove( e, 'Reset View' ) }
            onMouseLeave={ hideTooltip }
            className="hover:text-[#2b579a] cursor-pointer"
          ><Maximize2 size={ 14 } /></button>
        </div>
      </div>

      {/** LaTeX preview */}
      <div ref={ containerRef } className={
        `flex-1 overflow-hidden relative ${ isPanning ? 'cursor-grabbing' : 'cursor-grab' }`
      } onMouseDown={ onMouseDown } onWheel={ ( e ) => {
        if ( autoZoom ) { setZoom( () => internalScale ), setAutoZoom( false ) }
        onWheel( e );
      } }>
        {/** Guide Lines Layer */}
        { ! isExporting && (
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            <div className="absolute left-0 right-0 h-1 border-t border-dashed border-[#2b579a]/40" style={ { top: edgeT } } />
            <div className="absolute left-0 right-0 h-1 border-t border-dashed border-[#2b579a]/40" style={ { top: edgeB } } />
            <div className="absolute top-0 bottom-0 w-1 border-l border-dashed border-[#2b579a]/40" style={ { left: edgeL } } />
            <div className="absolute top-0 bottom-0 w-px border-l border-dashed border-[#2b579a]/40" style={ { left: edgeR } } />
          </div>
        ) }

        {/** Output */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none" style={ {
          transform: `translate(${ pan.x }px, ${ pan.y }px) scale(${ currentZoom })`,
          transformOrigin: 'center'
        } }>
          <div id="export-container" ref={ previewRef } className="relative flex justify-center items-center p-0 bg-white pointer-events-auto">
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
