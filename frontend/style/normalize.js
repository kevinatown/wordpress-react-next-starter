import { COLORS, COLOR_TRANSFORM } from './';

export const normalize =`
  html { line-height: 1.15; /* 1 */ -webkit-text-size-adjust: 100%; /* 2 */ }
  body { margin: 0; }
  h1 { font-size: 2em; margin: .67em 0; }
  hr { box-sizing: content-box; /* 1 */ height: 0; /* 1 */ overflow: visible; /* 2 */ }
  pre { font-family: monospace, monospace; /* 1 */ font-size: 1em; /* 2 */ }
  a { background-color: transparent; text-decoration: none; ${COLOR_TRANSFORM} color: ${COLORS.black}; }
  abbr[title] { border-bottom: none; /* 1 */ text-decoration: underline; /* 2 */ -webkit-text-decoration: underline dotted; text-decoration: underline dotted; /* 2 */ }
  b, strong { font-weight: bolder; }
  code, kbd, samp { font-family: monospace, monospace; /* 1 */ font-size: 1em; /* 2 */ }
  small { font-size: 80%; }
  sub, sup { font-size: 75%; line-height: 0; position: relative; vertical-align: baseline; }
  sub { bottom: -0.25em; }
  sup { top: -0.5em; }
  img { border-style: none; }
  button, input, optgroup, select, textarea { font-family: inherit; /* 1 */ font-size: 100%; /* 1 */ line-height: 1.15; /* 1 */ margin: 0; /* 2 */ }
  button, input {/* 1 */ overflow: visible; }
  button, select {/* 1 */ text-transform: none; }
  button, [type="button"], [type="reset"], [type="submit"] { -webkit-appearance: button; }
  button::-moz-focus-inner, [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner { border-style: none; padding: 0; }
  button:-moz-focusring, [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring, [type="submit"]:-moz-focusring { outline: 1px dotted ButtonText; }
  fieldset { padding: .35em .75em .625em; }
  legend { box-sizing: border-box; /* 1 */ color: inherit; /* 2 */ display: table; /* 1 */ max-width: 100%; /* 1 */ padding: 0; /* 3 */ white-space: normal; /* 1 */ }
  progress { vertical-align: baseline; }
  textarea { overflow: auto; }
  [type="checkbox"], [type="radio"] { box-sizing: border-box; /* 1 */ padding: 0; /* 2 */ }
  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button { height: auto; }
  [type="search"] { -webkit-appearance: textfield; /* 1 */ outline-offset: -2px; /* 2 */ }
  [type="search"]::-webkit-search-decoration { -webkit-appearance: none; }
  ::-webkit-file-upload-button { -webkit-appearance: button; /* 1 */ font: inherit; /* 2 */ }
  details { display: block; }
  summary { display: list-item; }
  template { display: none; }
  [hidden] { display: none; }
  html, body, div, article, aside, section, main, nav, footer, header, form,
  fieldset, legend, pre, code, a, h1, h2, h3, h4, h5, h6, p, ul, ol, li, dl, dt,
  dd, blockquote, figcaption, figure, textarea, table, td, th, tr,
  input[type="email"], input[type="number"], input[type="password"],
  input[type="tel"], input[type="text"], input[type="url"], .border-box { box-sizing: border-box; }
  .aspect-ratio { height: 0; position: relative; }
  .aspect-ratio--16x9 { padding-bottom: 56.25%; }
  .aspect-ratio--9x16 { padding-bottom: 177.77%; }
  .aspect-ratio--4x3 { padding-bottom: 75%; }
  .aspect-ratio--3x4 { padding-bottom: 133.33%; }
  .aspect-ratio--6x4 { padding-bottom: 66.6%; }
  .aspect-ratio--4x6 { padding-bottom: 150%; }
  .aspect-ratio--8x5 { padding-bottom: 62.5%; }
  .aspect-ratio--5x8 { padding-bottom: 160%; }
  .aspect-ratio--7x5 { padding-bottom: 71.42%; }
  .aspect-ratio--5x7 { padding-bottom: 140%; }
  .aspect-ratio--1x1 { padding-bottom: 100%; }
  .aspect-ratio--object { position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%; z-index: 100; }
  img { max-width: 100%; }
`;
