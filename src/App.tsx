import { Editor } from './component/Editor';
import { Footer } from './component/Footer';
import { Preview } from './component/Preview';
import { Ribbon } from './component/Ribbon';
import { TooltipProvider } from './component/Tooltip';
import { useEditor } from './hook/useEditor';

export default function App () {
  const E = useEditor();

  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen bg-[#f3f2f1] overflow-hidden">
        <Ribbon
          { ...E }
          onClear={ () => E.setLatex( '' ) }
          onExportPNG={ E.handleExportImage }
          onExportPDF={ E.handleExportPDF }
          onShare={ E.handleShare }
        />
        <main className="flex-1 flex flex-col overflow-hidden">
          <Editor
            latex={ E.latex }
            setLatex={ E.setLatex }
          />
          <Preview
            { ...E }
            resetView={ E.resetView }
            onMouseDown={ E.handleMouseDown }
            onWheel={ E.handleWheel }
          />
        </main>
        <Footer
          length={ E.latex.length }
          isExporting={ E.isExporting }
        />
      </div>
    </TooltipProvider>
  );
}
