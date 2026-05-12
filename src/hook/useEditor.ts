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

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      alert('Sharing link copied to clipboard!');
    } catch (err) {
      console.error('Clipboard access failed', err);
    }
  }, []);

  // Export LaTeX as PNG image
  const handleExportImage = useCallback( async () => {
    if ( ! previewRef.current ) return;
    setIsExporting( true );

    try {
      const dataUrl = await toPng( previewRef.current, {
        backgroundColor: '#ffffff',
        pixelRatio: 4,
        style: { transform: 'none' }
      } );

      const link = document.createElement( 'a' );
      link.download = `latex-formula-${ Date.now() }.png`;
      link.href = dataUrl;
      link.click();
    } catch ( err ) {
      console.error( 'Export failed', err );
    } finally {
      setIsExporting( false );
    }
  }, [] );

  // Export LaTeX as PDF
  const handleExportPDF = useCallback( async () => {
    if ( ! previewRef.current ) return;
    setIsExporting( true );

    try {
      const dataUrl = await toPng( previewRef.current, {
        backgroundColor: '#ffffff',
        pixelRatio: 4,
        style: { transform: 'none' }
      } );

      const img = new Image();
      await new Promise( resolve => {
        img.onload = resolve;
        img.src = dataUrl;
      } );

      const pxToMm = 0.264583;
      const widthMm = ( img.width / 4 ) * pxToMm;
      const heightMm = ( img.height / 4 ) * pxToMm;

      const pdf = new jsPDF( {
        orientation: widthMm > heightMm ? 'landscape' : 'portrait',
        unit: 'mm',
        format: [ widthMm, heightMm ]
      } );

      pdf.addImage( dataUrl, 'PNG', 0, 0, widthMm, heightMm );
      pdf.save( `latex-formula-${ Date.now() }.pdf` );
    } catch ( err ) {
      console.error( 'PDF export failed', err );
    } finally {
      setIsExporting( false );
    }
  }, [] );
};
