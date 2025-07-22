import { readFile } from 'node:fs/promises';

readFile(
  '/Users/christopher/DEV/p5/tools/site/src/content/sketches/001-complementary-color/steps/test.js',
  'utf-8'
).then(console.log);
