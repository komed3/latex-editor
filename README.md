# LaTeX Formula Editor

A web-based tool for drafting, previewing, and exporting mathematical equations using LaTeX syntax.

## Core Components

- **Rendering Engine**: Utilizes the **KaTeX** library for client-side mathematical typesetting.
- **Editor Interface**: Implements **PrismJS** for LaTeX-specific syntax highlighting and cursor-aware symbol insertion.
- **Viewport Workspace**: A zoomable canvas environment supporting coordinate transformations (pan/zoom) and automatic fit-to-viewport scaling.

## Technical Specifications

- **Client-Side Processing**: All formula rendering and logic occur within the browser. No server-side LaTeX distribution or external processing API is required.
- **Stateless Persistence**: Formula states are encoded using **LZ-String** compression and stored in the URL hash fragment. This enables formula sharing and bookmarking without database dependency.

### Export Formats

- **PNG (Raster)**: 32-bit transparent output at 4x Retina scale (~384 DPI equivalent).
- **PDF (Vector)**: Native vector-based output for lossless scaling in documents and print media.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.  
(c) 2026 Paul Köhler (komed3). All rights reserved.
