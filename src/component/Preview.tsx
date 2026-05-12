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
  previewRef: React.RefObject< HTMLDivElement | null >;
  onWheel: ( e: React.WheelEvent ) => void;
  onMouseDown: ( e: React.MouseEvent ) => void;
  setZoom: ( val: ( prev: number ) => number ) => void;
  resetView: () => void;
}

export const Preview: React.FC< PreviewProps > = memo( ( {
  latex, zoom, pan, isPanning, isExporting, previewRef,
  onWheel, onMouseDown, setZoom, resetView
} ) => {
  const contentRef = useRef< HTMLDivElement >( null );
  const [ autoScale, setAutoScale ] = useState( 1 );
  const { showTooltip, hideTooltip } = useTooltip();

  useEffect( () => {
    if ( contentRef.current ) {
      const containerWidth = 800;
      const contentWidth = contentRef.current.scrollWidth;

      if ( contentWidth > containerWidth ) setAutoScale( containerWidth / contentWidth );
      else setAutoScale( 1 );
    }
  }, [ latex ] );

  const handleMouseMove = ( e: React.MouseEvent, label: string ) => {
    showTooltip( label, e.clientX, e.clientY );
  };

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
    </div>
  );
} );

Preview.displayName = 'Preview';
