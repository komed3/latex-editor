import { Bolt, Cpu, Download, FileText, Info, Maximize2, MousePointer2, Save, X } from 'lucide-react';
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
    <div className="fixed inset-0 flex justify-center items-center z-1000 bg-black/30 animate-in fade-in duration-200">
      <div className="relative flex flex-col w-full max-w-4xl h-150 bg-[#f3f2f1] shadow-2xl animate-in zoom-in-98 duration-200 overflow-hidden">

        {/** Header */}
        <div className="flex justify-between items-center shrink-0 px-4 py-2.5 text-white bg-[#2b579a]">
          <div className="flex items-center gap-2">
            <Info size={ 16 } strokeWidth={ 2.5 } />
            <h2 className="font-bold text-[13px] tracking-tight">LaTeX Formula Editor</h2>
          </div>
          <button onClick={ onClose } className="p-1 hover:bg-[#1a4a8a] transition-colors cursor-pointer">
            <X size={ 18 } />
          </button>
        </div>

        {/** Body */}
        <div className="flex-1 flex overflow-hidden">

          {/** Sidebar Navigation */}
          <aside className="shrink-0 w-40 pt-4 bg-[#f3f2f1] border-r border-[#e1dfdd]">
            <NavItem id="general" icon={ <Cpu size={ 14 } /> } label="App Info" />
            <NavItem id="features" icon={ <Bolt size={ 14 } /> } label="Features" />
            <NavItem id="interaction" icon={ <MousePointer2 size={ 14 } /> } label="Viewport" />
            <NavItem id="storage" icon={ <Save size={ 14 } /> } label="Storage" />
            <NavItem id="export" icon={ <Download size={ 14 } /> } label="Export" />
            <div className="my-2 border-t border-[#e1dfdd] mx-4" />
            <NavItem id="examples" icon={ <FileText size={ 14 } /> } label="Examples" />
          </aside>

          {/** Content Area */}
          <main className="flex-1 bg-white overflow-y-auto p-6 no-scrollbar">

            { activeTab === 'general' && (
              <div className="space-y-6">
                <section>
                  <h3 className="flex items-center gap-2 mb-6 font-bold text-[16px] text-[#323130]">
                    <Cpu size={ 18 } className="text-[#2b579a]" /> App Info
                  </h3>
                  <p className="mb-4 text-sm text-[#323130] leading-relaxed">
                    This application is a specialized editor for LaTeX-based mathematical typesetting.
                    It enables the creation, preview, and export of formulas without requiring a local LaTeX distribution.
                  </p>
                  <p className="text-sm text-[#323130] leading-relaxed">
                    Formula processing is handled by the <strong>KaTeX</strong> engine directly in the browser.
                    This architecture ensures immediate feedback and operates independently of server-side resources.
                  </p>
                </section>
              </div>
            ) }

            { activeTab === 'features' && (
              <div className="space-y-6">
                <section>
                  <h3 className="flex items-center gap-2 mb-6 font-bold text-[16px] text-[#323130]">
                    <Bolt size={ 18 } className="text-[#2b579a]" /> Core Functionality
                  </h3>
                  <div className="grid grid-cols-1 gap-4 text-[13px]">
                    <div className="pl-4 py-1 border-l-2 border-[#2b579a]">
                      <strong className="block text-[#2b579a]">Real-Time Syntax Highlighting</strong>
                      <p className="text-[#605e5c]">
                        Integrated PrismJS logic with a optimized LaTeX grammar.
                        Highlights keywords, environments, operators, and grouping characters to improve script readability.
                      </p>
                    </div>
                    <div className="border-l-2 border-[#2b579a] pl-4 py-1">
                      <strong className="block text-[#2b579a]">Context-Aware Symbol Ribbon</strong>
                      <p className="text-[#605e5c]">
                        A categorized library of over 200 mathematical symbols and structures.
                        Commands are inserted at the current cursor position, preserving selection state.
                      </p>
                    </div>
                    <div className="border-l-2 border-[#2b579a] pl-4 py-1">
                      <strong className="block text-[#2b579a]">LaTeX Preview</strong>
                      <p className="text-[#605e5c]">
                        A live rendering pane powered by KaTeX that updates in real-time as you edit.
                        Supports complex multi-line environments and custom macros for accurate visualization.
                      </p>
                    </div>
                    <div className="border-l-2 border-[#2b579a] pl-4 py-1">
                      <strong className="block text-[#2b579a]">Export Pipeline</strong>
                      <p className="text-[#605e5c]">
                        Automated generation of high-resolution raster images (PNG) and vector documents
                        (PDF) based on the live preview state.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            ) }

            { activeTab === 'interaction' && (
              <div className="space-y-6">
                <section>
                  <h3 className="flex items-center gap-2 mb-6 font-bold text-[16px] text-[#323130]">
                    <MousePointer2 size={ 18 } className="text-[#2b579a]" /> Viewport Navigation
                  </h3>
                  <p className="mb-6 text-sm text-[#323130]">
                    The preview workspace allows for granular inspection of complex formulas through
                    coordinate and scale transformations.
                  </p>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-3 bg-[#f8f9fa] border border-[#e1dfdd]">
                      <MousePointer2 size={ 20 } className="shrink-0 text-[#2b579a]" />
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
                          <strong>Auto Scale:</strong> When enabled, the editor automatically calculates the optimal
                          scale to fit the formula within the viewport.
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
                  <h3 className="flex items-center gap-2 mb-6 font-bold text-[16px] text-[#323130]">
                    <Save size={ 18 } className="text-[#2b579a]" /> Persistence Model
                  </h3>
                  <p className="text-sm text-[#323130] leading-relaxed">
                    To ensure privacy and accessibility, the editor stores the entire formula state directly within
                    the URL hash fragment. No database records are created.
                  </p>
                  <div className="my-4 p-3 font-mono text-[11px] break-all bg-[#f3f2f1] border border-[#e1dfdd]">
                    https://komed3.github.io/latex-editor/# [Encoded_Formula_Data]
                  </div>
                  <p className="text-sm text-[#323130] leading-relaxed">
                    The formula string is compressed using the <strong>LZ-String</strong> algorithm and then URL-encoded.
                    This allows users to bookmark specific formulas or share them via a single link.
                  </p>
                </section>
              </div>
            ) }

            { activeTab === 'export' && (
              <div className="space-y-6">
                <section>
                  <h3 className="flex items-center gap-2 mb-6 font-bold text-[16px] text-[#323130]">
                    <Download size={ 18 } className="text-[#2b579a]" /> Output Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[#f8f9fa] border border-[#e1dfdd]">
                      <h4 className="mb-2 font-bold text-[13px] text-[#2b579a]">PNG (Raster)</h4>
                      <ul className="space-y-1 text-[12px] text-[#605e5c]">
                        <li>Resolution: 4x Retina Scale</li>
                        <li>Density: ~384 DPI equivalent</li>
                        <li>Channel: 32-bit (Transparent)</li>
                        <li>Usage: General presentations/Web</li>
                      </ul>
                    </div>
                    <div className="p-4 border bg-[#f8f9fa] border-[#e1dfdd]">
                      <h4 className="mb-2 font-bold text-[13px] text-[#2b579a]">PDF (Vector)</h4>
                      <ul className="space-y-1 text-[12px] text-[#605e5c]">
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
                  <h3 className="flex items-center gap-2 mb-6 font-bold text-[16px] text-[#323130]">
                    <FileText size={ 18 } className="text-[#2b579a]" /> Reference Templates
                  </h3>
                  <p className="mb-6 text-sm text-[#605e5c]">
                    These examples demonstrate the rendering of complex multi-line environments and specialized mathematical notation.
                  </p>

                  <div className="space-y-8">
                    <div>
                      <h4 className="mb-2 uppercase font-bold text-[11px] text-[#2b579a] tracking-wide">
                        Maxwell's Equations (Differential Form)
                      </h4>
                      <code className="
                        block p-3 whitespace-pre font-mono text-[12px] bg-[#f3f2f1] border border-[#e1dfdd]
                        overflow-x-auto select-all no-scrollbar
                      ">
{ `\\begin{cases}
  \\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\epsilon_0} \\\\
  \\nabla \\cdot \\mathbf{B} = 0 \\\\
  \\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t} \\\\
  \\nabla \\times \\mathbf{B} = \\mu_0\\left(\\mathbf{J} + \\epsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t}\\right)
\\end{cases}` }
                      </code>
                    </div>

                    <div>
                      <h4 className="mb-2 uppercase font-bold text-[11px] text-[#2b579a] tracking-wide">
                        Schrödinger Equation (Time-Dependent)
                      </h4>
                      <code className="
                        block p-3 whitespace-pre font-mono text-[12px] bg-[#f3f2f1] border border-[#e1dfdd]
                        overflow-x-auto select-all no-scrollbar
                      ">
{ `i\\hbar \\frac{\\partial}{\\partial t} \\Psi(\\mathbf{r}, t) = \\left[ -\\frac{\\hbar^2}{2m} \\nabla^2 + V(\\mathbf{r}, t) \\right] \\Psi(\\mathbf{r}, t)` }
                      </code>
                    </div>

                    <div>
                      <h4 className="mb-2 uppercase font-bold text-[11px] text-[#2b579a] tracking-wide">
                        Navier-Stokes Equations (Incompressible)
                      </h4>
                      <code className="
                        block p-3 whitespace-pre font-mono text-[12px] bg-[#f3f2f1] border border-[#e1dfdd]
                        overflow-x-auto select-all no-scrollbar
                      ">
{ `\\begin{cases}
  \\nabla \\cdot \\mathbf{u} = 0 \\\\
  \\frac{\\partial \\mathbf{u}}{\\partial t} + (\\mathbf{u} \\cdot \\nabla)\\mathbf{u} = -\\frac{1}{\\rho}\\nabla p + \\nu \\nabla^2 \\mathbf{u} + \\mathbf{f}
\\end{cases}` }
                      </code>
                    </div>

                    <div>
                      <h4 className="mb-2 uppercase font-bold text-[11px] text-[#2b579a] tracking-wide">
                        Standard Model Lagrangian
                      </h4>
                      <code className="
                        block p-3 whitespace-pre font-mono text-[12px] bg-[#f3f2f1] border border-[#e1dfdd]
                        overflow-x-auto select-all no-scrollbar
                      ">
{ `\\mathcal{L} = -\\frac{1}{4}F_{\\mu\\nu}F^{\\mu\\nu} + i\\bar{\\psi}\\cancel{D}\\psi + |D_\\mu\\phi|^2 - V(\\phi) + \\psi_i y_{ij} \\psi_j \\phi + h.c.` }
                      </code>
                    </div>

                    <div>
                      <h4 className="mb-2 uppercase font-bold text-[11px] text-[#2b579a] tracking-wide">
                        Matrix Decomposition (SVD)
                      </h4>
                      <code className="
                        block p-3 whitespace-pre font-mono text-[12px] bg-[#f3f2f1] border border-[#e1dfdd]
                        overflow-x-auto select-all no-scrollbar
                      ">
{ `\\mathbf{A} = \\mathbf{U} \\boldsymbol{\\Sigma} \\mathbf{V}^T = \\sum_{i=1}^{r} \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^T` }
                      </code>
                    </div>

                    <div>
                      <h4 className="mb-2 uppercase font-bold text-[11px] text-[#2b579a] tracking-wide">
                        Linear System (Augmented)
                      </h4>
                      <code className="
                        block p-3 whitespace-pre font-mono text-[12px] bg-[#f3f2f1] border border-[#e1dfdd]
                        overflow-x-auto select-all no-scrollbar
                      ">
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
        <div className="flex justify-between items-center shrink-0 px-4 py-2.5 bg-[#f3f2f1] border-t border-[#e1dfdd]">
          <div className="text-[12px] text-[#605e5c]">
            LaTeX Formula Editor, Copyright &copy; 2026 by komed3.
            All rights reserved.
          </div>
          <button onClick={ onClose } className="
            px-8 py-1.5 font-bold text-[12px] text-white bg-[#2b579a] hover:bg-[#1a4a8a]
            border border-[#2b579a] transition-colors cursor-pointer
          ">Close</button>
        </div>
      </div>
    </div>
  );
};
