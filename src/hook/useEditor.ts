import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import LZString from 'lz-string';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export const useEditor = () => {
  const [ latex, setLatex ] = useState( '\\frac{\\sqrt{2}}{\\pi}' );
  const [ activeTab, setActiveTab ] = useState( 'Functions' );
  const [ searchQuery, setSearchQuery ] = useState( '' );
  const [ zoom, setZoom ] = useState( 1 );
  const [ pan, setPan ] = useState( { x: 0, y: 0 } );
  const [ isPanning, setIsPanning ] = useState( false );
  const [ isExporting, setIsExporting ] = useState( false );
  
  const previewRef = useRef< HTMLDivElement >( null );
  const editorRef = useRef< HTMLTextAreaElement >( null );

  // Load from URL Hash
  useEffect( () => {
    const hash = window.location.hash.slice( 1 );
    if ( ! hash ) return;

    try {
      const decoded = LZString.decompressFromEncodedURIComponent( hash );
      if ( decoded ) setLatex( decoded );
    } catch ( e ) {
      console.error( 'Failed to decode formula', e );
    }
  }, [] );

  // Save to URL Hash
  useEffect( () => {
    const compressed = LZString.compressToEncodedURIComponent( latex );
    window.history.replaceState( null, '', `#${ compressed }` );
  }, [ latex ] );
};
