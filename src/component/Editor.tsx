import { Copy } from 'lucide-react';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-latex';
import type React from 'react';
import RawEditor from 'react-simple-code-editor';

// Fix for CommonJS/ESM interop issues in some environments
const EditorComponent = ( RawEditor as any ).default || RawEditor;

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
      <div className="flex-1 min-h-30 overflow-auto bg-white">
        <EditorComponent
          value={ latex }
          onValueChange={ setLatex }
          highlight={ ( code: any ) => highlight( code, languages.latex || languages.plain, 'latex' ) }
          padding={ 20 }
          className="min-h-full font-mono text-sm leading-relaxed outline-none"
          textareaId="latex-editor-textarea"
          textareaClassName="outline-none"
          style={ {
            fontFamily: '"FiraCode", monospace',
            fontSize: 14,
            width: '100%',
            height: '100%'
          } }
        />
      </div>
    </div>
  );
};
