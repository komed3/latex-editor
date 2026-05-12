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

export const LATEX_SYMBOLS: LaTeXSymbol[] = [
  // FUNCTIONS
  { label: 'Fraction', latex: '\\frac{a}{b}', category: 'Functions', tooltip: 'Fraction: \\frac{num}{den}' },
  { label: 'Sqrt', latex: '\\sqrt{x}', category: 'Functions', tooltip: 'Square Root: \\sqrt{x}' },
  { label: 'n-th Sqrt', latex: '\\sqrt[n]{x}', category: 'Functions', tooltip: 'n-th Root: \\sqrt[n]{x}' },
  { label: 'Exponent', latex: 'x^{n}', category: 'Functions', tooltip: 'Exponent/Superscript: x^n' },
  { label: 'Subscript', latex: 'x_{n}', category: 'Functions', tooltip: 'Subscript: x_n' },
  { label: 'Log', latex: '\\log_{b}(x)', category: 'Functions', tooltip: 'Logarithm: \\log_b(x)' },
  { label: 'Ln', latex: '\\ln(x)', category: 'Functions', tooltip: 'Natural Logarithm: \\ln(x)' },
  { label: 'Limit', latex: '\\lim_{x \\to \\infty}', category: 'Functions', tooltip: 'Limit: \\lim' },
  { label: 'Sum', latex: '\\sum_{i=1}^{n}', category: 'Functions', tooltip: 'Summation: \\sum' },
  { label: 'Product', latex: '\\prod_{i=1}^{n}', category: 'Functions', tooltip: 'Product: \\prod' },
  { label: 'Integral', latex: '\\int_{a}^{b}', category: 'Functions', tooltip: 'Definite Integral: \\int' },
  { label: 'Double Int', latex: '\\iint_{D}', category: 'Functions', tooltip: 'Double Integral: \\iint' },
  { label: 'Triple Int', latex: '\\iiint_{V}', category: 'Functions', tooltip: 'Triple Integral: \\iiint' },
  { label: 'Contour Int', latex: '\\oint_{C}', category: 'Functions', tooltip: 'Contour Integral: \\oint' },
  { label: 'Partial', latex: '\\partial', category: 'Functions', tooltip: 'Partial: \\partial' },
  { label: 'Derivative', latex: '\\frac{dy}{dx}', category: 'Functions', tooltip: 'Derivative: \\frac{dy}{dx}' },
  { label: 'sin', latex: '\\sin', category: 'Functions', tooltip: 'Sine' },
  { label: 'cos', latex: '\\cos', category: 'Functions', tooltip: 'Cosine' },
  { label: 'tan', latex: '\\tan', category: 'Functions', tooltip: 'Tangent' },
  { label: 'cot', latex: '\\cot', category: 'Functions', tooltip: 'Cotangent' },
  { label: 'sec', latex: '\\sec', category: 'Functions', tooltip: 'Secant' },
  { label: 'csc', latex: '\\csc', category: 'Functions', tooltip: 'Cosecant' },
  { label: 'arcsin', latex: '\\arcsin', category: 'Functions', tooltip: 'Arcsine' },
  { label: 'arccos', latex: '\\arccos', category: 'Functions', tooltip: 'Arccosine' },
  { label: 'arctan', latex: '\\arctan', category: 'Functions', tooltip: 'Arctangent' },
  { label: 'sinh', latex: '\\sinh', category: 'Functions', tooltip: 'Hyperbolic Sine' },
  { label: 'cosh', latex: '\\cosh', category: 'Functions', tooltip: 'Hyperbolic Cosine' },
  { label: 'tanh', latex: '\\tanh', category: 'Functions', tooltip: 'Hyperbolic Tangent' },
  { label: 'exp', latex: '\\exp', category: 'Functions', tooltip: 'Exponential function' },
  { label: 'max', latex: '\\max', category: 'Functions', tooltip: 'Maximum' },
  { label: 'min', latex: '\\min', category: 'Functions', tooltip: 'Minimum' },
  { label: 'sup', latex: '\\sup', category: 'Functions', tooltip: 'Supremum' },
  { label: 'inf', latex: '\\inf', category: 'Functions', tooltip: 'Infimum' },
  { label: 'arg', latex: '\\arg', category: 'Functions', tooltip: 'Argument' },
  { label: 'deg', latex: '\\deg', category: 'Functions', tooltip: 'Degree' },
  { label: 'det', latex: '\\det', category: 'Functions', tooltip: 'Determinant' },
  { label: 'dim', latex: '\\dim', category: 'Functions', tooltip: 'Dimension' },
  { label: 'gcd', latex: '\\gcd', category: 'Functions', tooltip: 'Greatest Common Divisor' },
  { label: 'ker', latex: '\\ker', category: 'Functions', tooltip: 'Kernel' },
  { label: 'lg', latex: '\\lg', category: 'Functions', tooltip: 'Binary Logarithm' },
  { label: 'Pr', latex: '\\Pr', category: 'Functions', tooltip: 'Probability' }
];
