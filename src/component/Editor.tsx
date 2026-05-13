import { Copy } from 'lucide-react';
import { highlight } from 'prismjs';
import 'prismjs/components/prism-latex';
import React, { useState } from 'react';
import RawEditor from 'react-simple-code-editor';

// Fix for CommonJS/ESM interop issues in some environments
const EditorComponent = ( RawEditor as any ).default || RawEditor;

// Enhanced LaTeX grammar that doesn't use greedy environment matching and
// provides more granular tokens for numbers, operators, and symbols.
const latexGrammar: any = {
  comment: /%.*/,
  command: {
    pattern: /\\[a-z@*]+/i,
    alias: 'keyword'
  },
  operator: /[&=$+\-^/_!|]/,
  punctuation: /[{}()\[\]]/,
  number: /\b\d+(?:\.\d+)?\b/,
  symbol: {
    pattern: /\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|kappa|lambda|mu|nu|xi|pi|rho|sigma|tau|phi|chi|psi|omega|Gamma|Delta|Theta|Lambda|Xi|Pi|Sigma|Upsilon|Phi|Psi|Omega|to|infty|sqrt|sum|int|prod|lim|sin|cos|tan)\b/i,
    alias: 'symbol'
  },
  variable: {
    pattern: /\b[a-zA-Z]{1,}\b/
  }
};

interface EditorProps {
  latex: string;
  setLatex: ( val: string ) => void;
}

export const Editor: React.FC< EditorProps > = ( { latex, setLatex } ) => {
  const [ currentLine, setCurrentLine ] = useState( 1 );
  const lineCount = latex.split( '\n' ).length;
  const lineNumbers = Array.from( { length: lineCount }, ( _, i ) => i + 1 );

  const updateCurrentLine = ( e: any ) => {
    const textarea = e.target;
    const selectionStart = textarea.selectionStart;
    const lines = latex.substring( 0, selectionStart ).split( '\n' );

    setCurrentLine( lines.length );
  };

  return (
    <div className="flex flex-col shrink-0 h-48 bg-white border-b border-[#e1dfdd] shadow-inner">
      <div className="flex justify-between items-center h-8 px-4 z-20 font-medium text-[11px] text-[#605e5c] bg-white border-b border-[#e1dfdd]">
        <div className="flex items-center gap-4">
          <span className="uppercase tracking-wider opacity-60">LaTeX Script</span>
        </div>
        <button
          onClick={ () => navigator.clipboard.writeText( latex ) }
          className="flex items-center gap-1.5 hover:text-[#2b579a] cursor-pointer transition-colors"
        ><Copy size={ 12 } /> <span className="hidden sm:inline">Copy to Clipboard</span></button>
      </div>
      <div className="flex-1 overflow-auto bg-white no-scrollbar">
        <div className="flex min-h-full gap-2">
          {/** Line Numbers Gutter */}
          <div className="shrink-0 w-10 pt-2 pr-2 pb-2 text-right bg-[#f8f9fa] border-r border-[#e1dfdd] select-none">
            { lineNumbers.map( n => (
              <div key={ n } className={ `
                font-mono text-[12px] leading-5.25 transition-colors duration-100
                ${ n === currentLine ? 'text-[#2b579a] font-bold' : 'text-[#a19f9d]' }
              ` }>{ n }</div>
            ) ) }
          </div>

          {/** Editor Area */}
          <div className="flex-1">
            <EditorComponent
              value={ latex }
              onValueChange={ setLatex }
              highlight={ ( code: any ) => highlight( code, latexGrammar, 'latex' ) }
              onKeyUp={ updateCurrentLine }
              onMouseUp={ updateCurrentLine }
              onFocus={ updateCurrentLine }
              padding={ 8 }
              className="latex-editor"
              textareaId="latex-editor-textarea"
              textareaClassName="outline-none"
              style={ {
                fontFamily: '"Fira Code", monospace',
                fontSize: 14,
                lineHeight: '21px',
                minHeight: '100%'
              } }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
