import { p5Version } from './p5-version';

export const cdnLibraryUrl =
  import.meta.env?.PUBLIC_P5_LIBRARY_PATH ||
  (`https://cdn.jsdelivr.net/npm/p5@${p5Version}/lib/p5.min.js` as const);
