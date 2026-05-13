import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import LZString from 'lz-string';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export const useEditor = () => {
  const [ latex, setLatex ] = useState( 'x_{1,2} = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}' );
  const [ activeTab, setActiveTab ] = useState( 'Functions' );
  const [ searchQuery, setSearchQuery ] = useState( '' );
  const [ zoom, setZoom ] = useState( 1 );
  const [ pan, setPan ] = useState( { x: 0, y: 0 } );
  const [ isPanning, setIsPanning ] = useState( false );
  const [ isExporting, setIsExporting ] = useState( false );
  const [ exportPadding, setExportPadding ] = useState( 0.02 );
  const [ autoZoom, setAutoZoom ] = useState( true );
  const previewRef = useRef< HTMLDivElement >( null );

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

  const handleShare = useCallback( async () => {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText( url );
      alert( 'Sharing link copied to clipboard!' );
    } catch ( err ) {
      console.error( 'Clipboard access failed', err );
    }
  }, [] );

  // Insert LaTeX
  const insertLatex = useCallback( ( symbol: string ) => {
    const textarea = document.getElementById( 'latex-editor-textarea' ) as HTMLTextAreaElement;
    if ( ! textarea ) return;

    const start = textarea.selectionStart || 0;
    const end = textarea.selectionEnd || 0;
    const newLatex = latex.slice( 0, start ) + symbol + latex.slice( end );
    setLatex( newLatex );

    requestAnimationFrame( () => {
      textarea.focus();
      const pos = start + symbol.length;
      textarea.setSelectionRange( pos, pos );
    } );
  }, [ latex ] );

  // Export LaTeX as PNG image
  const handleExportImage = useCallback( async () => {
    const element = previewRef.current;
    if ( ! element ) return;

    setIsExporting( true );

    try {
      const nWidth = element.offsetWidth;
      const nHeight = element.offsetHeight;
      const padInPx = Math.max( nWidth, nHeight ) * exportPadding + 2;
      const finalWidth = nWidth + padInPx * 2;
      const finalHeight = nHeight + padInPx * 2;

      const dataUrl = await toPng( element, {
        backgroundColor: '#ffffff',
        pixelRatio: 4,
        width: Math.ceil( finalWidth ),
        height: Math.ceil( finalHeight ),
        style: {
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0',
          padding: `${ padInPx }px`,
          transform: 'none',
          border: 'none',
          boxShadow: 'none'
        }
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
  }, [ exportPadding ] );

  // Export LaTeX as PDF
  const handleExportPDF = useCallback( async () => {
    const element = previewRef.current;
    if ( ! element ) return;

    setIsExporting( true );

    try {
      const nWidth = element.offsetWidth;
      const nHeight = element.offsetHeight;
      const padInPx = Math.max( nWidth, nHeight ) * exportPadding + 2;
      const finalWidth = nWidth + padInPx * 2;
      const finalHeight = nHeight + padInPx * 2;

      const dataUrl = await toPng( element, {
        backgroundColor: '#ffffff',
        pixelRatio: 4,
        width: Math.ceil( finalWidth ),
        height: Math.ceil( finalHeight ),
        style: {
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0',
          padding: `${padInPx}px`,
          transform: 'none',
          border: 'none',
          boxShadow: 'none'
        }
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
  }, [ exportPadding ] );

  // Manipulate preview canvas
  const handleWheel = useCallback( ( e: React.WheelEvent ) => {
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom( prev => Math.min( Math.max( prev * delta, 0.1 ), 5 ) );
    e.preventDefault();
  }, [] );

  const handleMouseDown = useCallback( ( e: React.MouseEvent ) => {
    if ( e.button === 0 || e.button === 1 ) {
      setIsPanning( true );
      e.preventDefault();
    }
  }, [] );

  const handleMouseMove = useCallback( ( e: MouseEvent ) => {
    if ( ! isPanning ) return;
    setPan( prev => ( {
      x: prev.x + e.movementX,
      y: prev.y + e.movementY
    } ) );
  }, [ isPanning ] );

  const handleMouseUp = useCallback( () => {
    setIsPanning( false );
  }, [] );

  useEffect( () => {
    if ( isPanning ) {
      window.addEventListener( 'mousemove', handleMouseMove );
      window.addEventListener( 'mouseup', handleMouseUp );
    } else {
      window.removeEventListener( 'mousemove', handleMouseMove );
      window.removeEventListener( 'mouseup', handleMouseUp );
    }
    return () => {
      window.removeEventListener( 'mousemove', handleMouseMove );
      window.removeEventListener( 'mouseup', handleMouseUp );
    };
  }, [ isPanning, handleMouseMove, handleMouseUp ] );

  const resetView = useCallback( () => {
    setZoom( 1 ), setPan( { x: 0, y: 0 } )
  }, [] );

  return {
    latex, setLatex, activeTab, setActiveTab, searchQuery,
    setSearchQuery, zoom, setZoom, pan, setPan, isPanning,
    isExporting, previewRef, insertLatex, handleShare,
    handleExportImage, handleExportPDF, handleWheel,
    handleMouseDown, resetView
  };
};
