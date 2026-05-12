import { Footer } from './component/Footer';
import { Ribbon } from './component/Ribbon';
import { TooltipProvider } from './component/Tooltip';
import { useEditor } from './hook/useEditor';

export default function App () {
  const E = useEditor();

  return (
    <TooltipProvider>
      <Ribbon
        { ...E }
        onClear={ () => E.setLatex( '' ) }
        onExportPNG={ E.handleExportImage }
        onExportPDF={ E.handleExportPDF }
        onShare={ E.handleShare }
      />
      <Footer length={ E.latex.length } isExporting={ E.isExporting } />
    </TooltipProvider>
  );
}
