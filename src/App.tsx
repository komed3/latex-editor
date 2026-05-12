import { Ribbon } from './component/Ribbon';
import { useEditor } from './hook/useEditor';

export default function App () {
  const E = useEditor();

  return (
    <>
      <Ribbon
        { ...E }
        onClear={ () => E.setLatex( '' ) }
        onExportPNG={ E.handleExportImage }
        onExportPDF={ E.handleExportPDF }
        onShare={ E.handleShare }
      />
    </>
  );
}
