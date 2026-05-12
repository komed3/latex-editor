import React, { useState, useCallback, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';

interface TooltipContextType {
  showTooltip: ( content: string | { label: string; latex: string }, x: number, y: number ) => void;
  hideTooltip: () => void;
}

const TooltipContext = createContext< TooltipContextType | undefined >( undefined );
