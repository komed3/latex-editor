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

  return ( <></> );
} );

Preview.displayName = 'Preview';
