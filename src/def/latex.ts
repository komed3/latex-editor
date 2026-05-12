export interface LaTeXSymbol {
  label: string;
  latex: string;
  category: string;
  tooltip: string;
}

export const LATEX_CATEGORIES = [
  'Functions',
  'Operators',
  'Relations',
  'Arrows',
  'Brackets',
  'Symbols',
  'Fonts',
  'Greek',
  'Matrices',
  'Environments',
  'Accents'
];
