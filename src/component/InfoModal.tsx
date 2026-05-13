import { Book, Cpu, Download, FileText, Info, Keyboard, Maximize2, MousePointer2, Save, X } from 'lucide-react';
import React, { useState } from 'react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'general' | 'features' | 'interaction' | 'storage' | 'export' | 'examples';

export const InfoModal: React.FC< InfoModalProps > = ( { isOpen, onClose } ) => {
  const [ activeTab, setActiveTab ] = useState< Tab >( 'general' );

  if ( ! isOpen ) return null;

  const NavItem: React.FC< { id: Tab; icon: React.ReactNode; label: string } > = ( { id, icon, label } ) => (
    <button onClick={ () => setActiveTab( id ) } className={ `
      flex items-center gap-3 w-full px-4 py-2.5 text-[12px] font-medium transition-all cursor-pointer ${
        activeTab === id
          ? 'bg-white text-[#2b579a] border-l-4 border-[#2b579a] shadow-sm'
          : 'text-[#605e5c] hover:bg-[#edebe9] border-l-4 border-transparent'
      }
    ` }>{ icon } { label }</button>
  );

  return (
    <div className="fixed inset-0 flex justify-center items-center z-[1000] bg-black/30 animate-in fade-in duration-200">
      <div className="relative flex flex-col w-full max-w-4xl h-[600px] bg-[#f3f2f1] shadow-2xl animate-in zoom-in-98 duration-200 overflow-hidden">

        {/** Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#2b579a] text-white shrink-0">
          <div className="flex items-center gap-2">
            <Info size={ 16 } strokeWidth={ 2.5 } />
            <h2 className="text-[13px] font-bold tracking-tight">LaTeX Editor - Documentation & Examples</h2>
          </div>
          <button onClick={ onClose } className="p-1 hover:bg-[#1a4a8a] transition-colors cursor-pointer">
            <X size={ 18 } />
          </button>
        </div>

        {/** Body */}
        <div className="flex-1 flex overflow-hidden">
          
          {/** Sidebar Navigation */}
          <aside className="w-52 bg-[#f3f2f1] border-r border-[#e1dfdd] shrink-0 pt-4">
            <NavItem id="general" icon={ <Book size={ 14 } /> } label="Technical Overview" />
            <NavItem id="features" icon={ <Keyboard size={ 14 } /> } label="Core Features" />
            <NavItem id="interaction" icon={ <MousePointer2 size={ 14 } /> } label="Viewport Navigation" />
            <NavItem id="storage" icon={ <Save size={ 14 } /> } label="Persistence Model" />
            <NavItem id="export" icon={ <Download size={ 14 } /> } label="Output Specifications" />
            <div className="my-2 border-t border-[#e1dfdd] mx-4" />
            <NavItem id="examples" icon={ <FileText size={ 14 } /> } label="Reference Templates" />
          </aside>

          {/** Content Area */}
          <main className="flex-1 bg-white overflow-y-auto p-8 no-scrollbar">
            
            { activeTab === 'general' && (
              <div className="space-y-6">
                <section>
                  <h3 className="text-[16px] font-bold text-[#323130] mb-3 flex items-center gap-2">
                    <Cpu size={ 18 } className="text-[#2b579a]" /> System Architecture
                  </h3>
                  <p className="text-[13px] text-[#323130] leading-relaxed mb-4">
                    This application is a specialized editor for LaTeX-based mathematical typesetting. It enables the creation, preview, and export of formulas without requiring a local LaTeX distribution.
                  </p>
                  <div className="p-4 bg-[#f3f2f1] border-l-4 border-[#2b579a]">
                    <h4 className="text-[12px] font-bold text-[#2b579a] mb-1 text-uppercase">Client-Side Rendering</h4>
                    <p className="text-[12px] text-[#605e5c]">
                      Formula processing is handled by the <strong>KaTeX</strong> engine directly in the browser. This architecture ensures immediate feedback and operates independently of server-side resources.
                    </p>
                  </div>
                </section>
              </div>
            ) }

            { activeTab === 'features' && (
              <div className="space-y-6">
                <section>
                  <h3 className="text-[16px] font-bold text-[#323130] mb-3">Core Functionality</h3>
                  <div className="grid grid-cols-1 gap-4 text-[13px]">
                    <div className="border-l-2 border-[#2b579a] pl-4 py-1">
                      <strong className="block text-[#2b579a]">Real-Time Syntax Highlighting</strong>
                      <p className="text-[#605e5c]">Integrated PrismJS logic with a optimized LaTeX grammar. Highlights keywords, environments, operators, and grouping characters to improve script readability.</p>
                    </div>
                    <div className="border-l-2 border-[#2b579a] pl-4 py-1">
                      <strong className="block text-[#2b579a]">Context-Aware Symbol Ribbon</strong>
                      <p className="text-[#605e5c]">A categorized library of over 200 mathematical symbols and structures. Commands are inserted at the current cursor position, preserving selection state.</p>
                    </div>
                    <div className="border-l-2 border-[#2b579a] pl-4 py-1">
                      <strong className="block text-[#2b579a]">Line-Level Tracking</strong>
                      <p className="text-[#605e5c]">The editor gutter displays line numbers and highlights the current focus line, facilitating navigation in complex multi-line environments.</p>
                    </div>
                    <div className="border-l-2 border-[#2b579a] pl-4 py-1">
                      <strong className="block text-[#2b579a]">Export Pipeline</strong>
                      <p className="text-[#605e5c]">Automated generation of high-resolution raster images (PNG) and vector documents (PDF) based on the live preview state.</p>
                    </div>
                  </div>
                </section>
              </div>
            ) }

            { activeTab === 'interaction' && (
              <div className="space-y-6">
                <section>
                  <h3 className="text-[16px] font-bold text-[#323130] mb-3">Viewport Navigation</h3>
                  <p className="text-[13px] text-[#323130] mb-4">The preview workspace allows for granular inspection of complex formulas through coordinate and scale transformations.</p>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-3 bg-[#f8f9fa] border border-[#e1dfdd]">
                      <MousePointer2 size={ 20 } className="text-[#2b579a] shrink-0" />
                      <div>
                        <h4 className="font-bold text-[12px]">Canvas Manipulation</h4>
                        <p className="text-[12px] text-[#605e5c]">
                          <strong>Pan:</strong> Hold the primary mouse button and drag to reposition the canvas.<br />
                          <strong>Zoom:</strong> Rotate the mouse wheel to scale the preview between 10% and 500% magnification.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-3 bg-[#f8f9fa] border border-[#e1dfdd]">
                      <Maximize2 size={ 20 } className="text-[#2b579a] shrink-0" />
                      <div>
                        <h4 className="font-bold text-[12px]">Dynamic Scaling</h4>
                        <p className="text-[12px] text-[#605e5c]">
                          <strong>Auto Scale:</strong> When enabled, the editor automatically calculates the optimal scale to fit the formula within the viewport.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            ) }

            { activeTab === 'storage' && (
              <div className="space-y-6">
                <section>
                  <h3 className="text-[16px] font-bold text-[#323130] mb-3">Persistence Model</h3>
                  <div className="text-[13px] space-y-3">
                    <p>To ensure privacy and accessibility, the editor stores the entire formula state directly within the URL hash fragment. No database records are created.</p>
                    <div className="p-3 bg-[#f3f2f1] border border-[#e1dfdd] font-mono text-[11px] break-all">
                      https://[editor-url]/# [Encoded_Formula_Data]
                    </div>
                    <p className="text-[#605e5c]">
                      The formula string is compressed using the <strong>LZ-String</strong> algorithm and then URL-encoded. This allows users to bookmark specific formulas or share them via a single link.
                    </p>
                  </div>
                </section>
              </div>
            ) }

            { activeTab === 'export' && (
              <div className="space-y-6">
                <section>
                  <h3 className="text-[16px] font-bold text-[#323130] mb-3">Output Specifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-[#e1dfdd] bg-[#f8f9fa]">
                      <h4 className="font-bold text-[13px] mb-2 text-[#2b579a]">PNG (Raster)</h4>
                      <ul className="text-[12px] space-y-1 text-[#605e5c]">
                        <li>Resolution: 4x Retina Scale</li>
                        <li>Density: ~384 DPI equivalent</li>
                        <li>Channel: 32-bit (Transparent)</li>
                        <li>Usage: General presentations/Web</li>
                      </ul>
                    </div>
                    <div className="p-4 border border-[#e1dfdd] bg-[#f8f9fa]">
                      <h4 className="font-bold text-[13px] mb-2 text-[#2b579a]">PDF (Vector)</h4>
                      <ul className="text-[12px] space-y-1 text-[#605e5c]">
                        <li>Type: Native PDF Vectors</li>
                        <li>Resolution: Infinite</li>
                        <li>Coordinate System: Metric (mm)</li>
                        <li>Usage: LaTeX publications/Print</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            ) }

            { activeTab === 'examples' && (
              <div className="space-y-6">
                <section>
                  <h3 className="text-[16px] font-bold text-[#323130] mb-3">Reference Templates</h3>
                  <p className="text-[13px] text-[#605e5c] mb-6">These examples demonstrate the rendering of complex multi-line environments and specialized mathematical notation.</p>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[11px] font-bold uppercase text-[#2b579a] mb-2 tracking-wide">Maxwell's Equations (Differential Form)</h4>
                      <code className="block p-3 bg-[#f3f2f1] border border-[#e1dfdd] text-[12px] font-mono whitespace-pre overflow-x-auto select-all">
{ `\\begin{cases} 
  \\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\epsilon_0} \\\\ 
  \\nabla \\cdot \\mathbf{B} = 0 \\\\ 
  \\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t} \\\\ 
  \\nabla \\times \\mathbf{B} = \\mu_0\\left(\\mathbf{J} + \\epsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t}\\right) 
\\end{cases}` }
                      </code>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-bold uppercase text-[#2b579a] mb-2 tracking-wide">Schrödinger Equation (Time-Dependent)</h4>
                      <code className="block p-3 bg-[#f3f2f1] border border-[#e1dfdd] text-[12px] font-mono whitespace-pre overflow-x-auto select-all">
{ `i\\hbar \\frac{\\partial}{\\partial t} \\Psi(\\mathbf{r}, t) = \\left[ -\\frac{\\hbar^2}{2m} \\nabla^2 + V(\\mathbf{r}, t) \\right] \\Psi(\\mathbf{r}, t)` }
                      </code>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-bold uppercase text-[#2b579a] mb-2 tracking-wide">Navier-Stokes Equations (Incompressible)</h4>
                      <code className="block p-3 bg-[#f3f2f1] border border-[#e1dfdd] text-[12px] font-mono whitespace-pre overflow-x-auto select-all">
{ `\\begin{cases}
  \\nabla \\cdot \\mathbf{u} = 0 \\\\
  \\frac{\\partial \\mathbf{u}}{\\partial t} + (\\mathbf{u} \\cdot \\nabla)\\mathbf{u} = -\\frac{1}{\\rho}\\nabla p + \\nu \\nabla^2 \\mathbf{u} + \\mathbf{f}
\\end{cases}` }
                      </code>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-bold uppercase text-[#2b579a] mb-2 tracking-wide">Standard Model Lagrangian</h4>
                      <code className="block p-3 bg-[#f3f2f1] border border-[#e1dfdd] text-[12px] font-mono whitespace-pre overflow-x-auto select-all">
{ `\\mathcal{L} = -\\frac{1}{4}F_{\\mu\\nu}F^{\\mu\\nu} + i\\bar{\\psi}\\cancel{D}\\psi + |D_\\mu\\phi|^2 - V(\\phi) + \\psi_i y_{ij} \\psi_j \\phi + h.c.` }
                      </code>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-bold uppercase text-[#2b579a] mb-2 tracking-wide">Matrix Decomposition (SVD)</h4>
                      <code className="block p-3 bg-[#f3f2f1] border border-[#e1dfdd] text-[12px] font-mono whitespace-pre overflow-x-auto select-all">
{ `\\mathbf{A} = \\mathbf{U} \\boldsymbol{\\Sigma} \\mathbf{V}^T = \\sum_{i=1}^{r} \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^T` }
                      </code>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-bold uppercase text-[#2b579a] mb-2 tracking-wide">Linear System (Augmented)</h4>
                      <code className="block p-3 bg-[#f3f2f1] border border-[#e1dfdd] text-[12px] font-mono whitespace-pre overflow-x-auto select-all">
{ `\\left( \\begin{array}{ccc|c} 
  a_{11} & a_{12} & a_{13} & b_1 \\\\ 
  a_{21} & a_{22} & a_{23} & b_2 \\\\ 
  a_{31} & a_{32} & a_{33} & b_3 
\\end{array} \\right)` }
                      </code>
                    </div>
                  </div>
                </section>
              </div>
            ) }

          </main>
        </div>

        {/** Footer */}
        <div className="px-4 py-2.5 bg-[#f3f2f1] border-t border-[#e1dfdd] flex justify-between items-center shrink-0">
          <div className="text-[11px] text-[#605e5c]">
            LaTeX Formula Editor v1.0 &bull; Build 2026
          </div>
          <button
            onClick={ onClose }
            className="px-8 py-1.5 text-[12px] font-bold text-white bg-[#2b579a] hover:bg-[#1a4a8a] border border-[#2b579a] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
