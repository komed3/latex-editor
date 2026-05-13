import { Copy } from 'lucide-react';
import { highlight } from 'prismjs';
import 'prismjs/components/prism-latex';
import type React from 'react';
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
        <EditorComponent
          value={ latex }
          onValueChange={ setLatex }
          highlight={ ( code: any ) => highlight( code, latexGrammar, 'latex' ) }
          padding={ 20 }
          className="latex-editor"
          textareaId="latex-editor-textarea"
          textareaClassName="outline-none"
          style={ {
            fontFamily: '"FiraCode", monospace',
            fontSize: 14,
            minHeight: '100%'
          } }
        />
      </div>
    </div>
  );
};
