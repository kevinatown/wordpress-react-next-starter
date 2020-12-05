export const GROW = `
  -moz-osx-font-smoothing: grayscale;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: translateZ( 0 );
  transform: translateZ( 0 );
  transition: -webkit-transform .25s ease-out;
  transition: transform .25s ease-out;
  transition: transform .25s ease-out, -webkit-transform .25s ease-out;
`;

export const COLOR_TRANSFORM = `
  transition: color .15s ease-in;
`;