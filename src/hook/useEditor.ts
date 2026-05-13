import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import LZString from 'lz-string';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export const useEditor = () => {
  // --- State ---
  const [ latex, setLatex ] = useState( 'x_{1,2} = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}' );
  const [ activeTab, setActiveTab ] = useState( 'Functions' );
  const [ searchQuery, setSearchQuery ] = useState( '' );
  const [ zoom, setZoom ] = useState( 1 );
  const [ pan, setPan ] = useState( { x: 0, y: 0 } );
  const [ isPanning, setIsPanning ] = useState( false );
  const [ isExporting, setIsExporting ] = useState( false );
  const [ autoZoom, setAutoZoom ] = useState( true );
  const [ exportPadding, setExportPadding ] = useState( 0.02 );

  // --- Refs ---
  const previewRef = useRef< HTMLDivElement >( null ); // The math element to be exported
  const containerRef = useRef< HTMLDivElement >( null ); // The viewport container
  const contentRef = useRef< HTMLDivElement >( null ); // The inner math content for measurement

  // --- Dimension Tracking ---
  const [ dimensions, setDimensions ] = useState( {
    containerW: 0, containerH: 0, contentW: 0, contentH: 0
  } );

  const updateDimensions = useCallback( () => {
    if ( containerRef.current && contentRef.current ) setDimensions( {
      containerW: containerRef.current.clientWidth,
      containerH: containerRef.current.clientHeight,
      contentW: contentRef.current.scrollWidth,
      contentH: contentRef.current.scrollHeight
    } );
  }, [] );

  // Update dimensions on resize or latex change
  useEffect( () => {
    updateDimensions();
    const observer = new ResizeObserver( updateDimensions );

    if ( containerRef.current ) observer.observe( containerRef.current );
    if ( contentRef.current ) observer.observe( contentRef.current );

    return () => observer.disconnect();
  }, [ latex, updateDimensions ] );

  // --- Auto-Scale Logic ---
  useEffect( () => {
    if ( autoZoom && dimensions.contentW > 0 && dimensions.contentH > 0 ) {
      const padInPx = Math.max( dimensions.contentW, dimensions.contentH ) * exportPadding + 2;
      const targetW = dimensions.contentW + padInPx * 2;
      const targetH = dimensions.contentH + padInPx * 2;

      const availW = Math.max( dimensions.containerW - 40, 40 );
      const availH = Math.max( dimensions.containerH - 40, 40 );

      const scaleX = availW / targetW;
      const scaleY = availH / targetH;
      const optimalScale = Math.min( scaleX, scaleY, 4 );

      setZoom( Math.max( 0.1, optimalScale ) );
      setPan( { x: 0, y: 0 } );
    }
  }, [ autoZoom, dimensions, exportPadding ] );

  // --- URL Persistence ---
  useEffect( () => {
    const hash = window.location.hash.slice( 1 );

    if ( hash ) try {
      const decoded = LZString.decompressFromEncodedURIComponent( hash );
      if ( decoded ) setLatex( decoded );
    } catch ( e ) {
      console.error( 'Failed to decode formula', e );
    }
  }, [] );

  useEffect( () => {
    const compressed = LZString.compressToEncodedURIComponent( latex );
    window.history.replaceState( null, '', `#${ compressed }` );
  }, [ latex ] );

  // --- Handlers ---
  const handleShare = useCallback( async () => {
    try {
      await navigator.clipboard.writeText( window.location.href );
      alert( 'Link copied to clipboard!' );
    } catch ( err ) {
      console.error( 'Clipboard access failed', err );
    }
  }, [] );

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

  const resetView = useCallback( () => {
    setPan( { x: 0, y: 0 } );
    setAutoZoom( true );
  }, [] );

  // --- Interaction Handlers ---
  const handleWheel = useCallback( ( e: React.WheelEvent ) => {
    e.preventDefault();

    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setAutoZoom( false );
    setZoom( z => Math.min( Math.max( z * delta, 0.1 ), 5 ) );
  }, [] );

  const handleMouseDown = useCallback( ( e: React.MouseEvent ) => {
    if ( e.button === 0 || e.button === 1 ) {
      e.preventDefault();
      setIsPanning( true );
    }
  }, [] );

  const handleMouseMove = useCallback( ( e: MouseEvent ) => {
    if ( isPanning ) setPan( prev => ( {
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
    }

    return () => {
      window.removeEventListener( 'mousemove', handleMouseMove );
      window.removeEventListener( 'mouseup', handleMouseUp );
    };
  }, [ isPanning, handleMouseMove, handleMouseUp ] );

  // --- Export Logic ---
  const handleExportImage = useCallback( async () => {
    if ( ! previewRef.current ) return;
    setIsExporting( true );

    try {
      const el = previewRef.current;
      const pad = Math.max( el.offsetWidth, el.offsetHeight ) * exportPadding + 2;

      const dataUrl = await toPng( el, {
        backgroundColor: '#ffffff',
        pixelRatio: 4,
        width: el.offsetWidth + pad * 2,
        height: el.offsetHeight + pad * 2,
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0',
          padding: `${ pad }px`,
          transform: 'none'
        }
      } );

      const link = document.createElement( 'a' );
      link.download = `formula-${ Date.now() }.png`;
      link.href = dataUrl;
      link.click();
    } catch ( err ) {
      console.error( 'PNG Export failed', err );
    } finally {
      setIsExporting( false );
    }
  }, [ exportPadding ] );

  const handleExportPDF = useCallback( async () => {
    if ( ! previewRef.current ) return;
    setIsExporting( true );

    try {
      const el = previewRef.current;
      const pad = Math.max( el.offsetWidth, el.offsetHeight ) * exportPadding + 2;

      const dataUrl = await toPng( el, {
        backgroundColor: '#ffffff',
        pixelRatio: 4,
        width: el.offsetWidth + pad * 2,
        height: el.offsetHeight + pad * 2,
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0',
          padding: `${ pad }px`,
          transform: 'none'
        }
      } );

      const img = new Image();
      await new Promise( r => { img.onload = r; img.src = dataUrl; } );

      const pxToMm = 0.264583;
      const wMm = ( img.width / 4 ) * pxToMm;
      const hMm = ( img.height / 4 ) * pxToMm;

      const pdf = new jsPDF( {
        orientation: wMm > hMm ? 'l' : 'p',
        unit: 'mm',
        format: [ wMm, hMm ]
      } );

      pdf.addImage( dataUrl, 'PNG', 0, 0, wMm, hMm );
      pdf.save( `formula-${ Date.now() }.pdf` );
    } catch ( err ) {
      console.error( 'PDF Export failed', err );
    } finally {
      setIsExporting( false );
    }
  }, [ exportPadding ] );

  return {
    latex, setLatex, activeTab, setActiveTab, searchQuery, setSearchQuery,
    zoom, setZoom, pan, isPanning, isExporting, autoZoom, setAutoZoom,
    previewRef, containerRef, contentRef, insertLatex, handleShare,
    handleExportImage, handleExportPDF, handleWheel, handleMouseDown,
    resetView, exportPadding, setExportPadding, dimensions
  };
};
