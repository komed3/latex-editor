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
  previewRef: React.RefObject< HTMLDivElement >;
  onWheel: ( e: React.WheelEvent ) => void;
  onMouseDown: ( e: React.MouseEvent ) => void;
  setZoom: ( val: ( prev: number ) => number ) => void;
  resetView: () => void;
}

export const Preview: React.FC< PreviewProps > = memo( ( {
  latex, zoom, pan, isPanning, isExporting, previewRef,
  onWheel, onMouseDown, setZoom, resetView 
} ) => {} );

Preview.displayName = 'Preview';
