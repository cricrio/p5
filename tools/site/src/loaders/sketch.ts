import { type Loader } from 'astro/loaders';
import { log } from 'node:console';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
const sketchDirectory = '/content/sketches';
import { glob as tinyglobby } from 'tinyglobby';

export function sketchLoader({ pattern }): Loader {
  const fileToIdMap = new Map<string, string>();

  return {
    name: 'sketchLoader',
    load: async ({ store, config, logger, watcher }) => {
      const sketchDirectory = fileURLToPath(
        new URL('./src/content/sketches/', config.root)
      );

      if (!fs.existsSync(sketchDirectory)) {
        throw new Error(`Sketch directory does not exist: ${sketchDirectory}`);
      }

      const sketches = fs
        .readdirSync(sketchDirectory, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => {
          const path = `${sketchDirectory}${dirent.name}/sketch.js`;
          const id = dirent.name;
          console.log(path);
          fileToIdMap.set(path, id);

          return {
            id,
            sketch: fs.readFileSync(path, {
              encoding: 'utf8',
            }),
          };
        });

      store.clear();

      for (const s of sketches) {
        store.set({
          id: s.id,
          data: { sketch: s.sketch },
        });
      }

      if (!watcher) {
        return;
      }
      console.log(sketchDirectory);
      watcher.add(sketchDirectory);

      function onChange(changedPath: string) {
        if (!changedPath.startsWith(sketchDirectory)) {
          return;
        }
        const id = fileToIdMap.get(changedPath);
        logger.info([...fileToIdMap.keys()].toString());
        if (!id) {
          logger.info(
            `Unabled to find in ${changedPath} in store. You may need to restart astro.`
          );
          return;
        }

        const sketch = fs.readFileSync(changedPath, {
          encoding: 'utf8',
        });
        console.log({ id });
        store.set({
          id,
          data: { sketch: sketch },
        });
      }

      watcher.on('change', onChange);

      watcher.on('add', onChange);
    },
  };
}
