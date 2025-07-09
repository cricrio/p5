import { defineCollection, z } from 'astro:content';
import { glob, file, type Loader, type LoaderContext } from 'astro/loaders';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function sketchLoader(): Loader {
  const directory = `${path.dirname(
    fileURLToPath(import.meta.url)
  )}${sketchDirectory}`;

  if (!fs.existsSync(directory)) {
    throw new Error(`Sketch directory does not exist: ${sketchDirectory}`);
  }
  console.log('tetet');
  const result = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => ({
      id: dirent.name,
      name: dirent.name,
      sketch: fs.readFileSync(`${directory}/${dirent.name}/sketch.js`, {
        encoding: 'utf8',
      }),
    }));

  return {
    name: 'kesese',
    load: async (context: LoaderContext) => {
      const directory = `${path.dirname(
        fileURLToPath(import.meta.url)
      )}${sketchDirectory}`;

      if (!fs.existsSync(directory)) {
        throw new Error(`Sketch directory does not exist: ${sketchDirectory}`);
      }

      context.store.clear();

      try {
        const res = fs
          .readdirSync(directory, { withFileTypes: true })
          .filter((dirent) => dirent.isDirectory())
          .map((dirent) => ({
            id: dirent.name,
            name: dirent.name,
            sketch: fs.readFileSync(`${directory}/${dirent.name}/sketch.js`, {
              encoding: 'utf8',
            }),
          }));
        // console.log(res);
      } catch (err) {
        console.log(err);
      }
      for (const s of result) {
        console.log(s);
        context.store.set({
          id: s.id,
          data: s,
        });
      }
    },
  };
}

const sketchDirectory = '/content/sketches';

const sketches = defineCollection({
  loader: sketchLoader(),
});

export const collections = { sketches };
