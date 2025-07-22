import { type Loader } from 'astro/loaders';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';

function loadSteps(sketchPath: string) {
  const stepsPath = path.join(sketchPath, 'steps');
  if (!fs.existsSync(stepsPath)) {
    return [];
  }

  const steps = fs
    .readdirSync(stepsPath, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith('.js'))
    .map((dirent) => {
      const stepPath = path.join(stepsPath, dirent.name);
      return {
        path: stepPath,
        name: dirent.name,
        content: fs.readFileSync(stepPath, { encoding: 'utf8' }),
      };
    });

  return steps;
}

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

          const steps = loadSteps(`${sketchDirectory}${dirent.name}`);

          fileToIdMap.set(path, id);
          steps.forEach((step) => {
            fileToIdMap.set(`${id}/${step.name}`, step.path);
          });

          return {
            id,
            sketch: fs.readFileSync(path, {
              encoding: 'utf8',
            }),
            steps: Object.fromEntries(
              steps.map((step) => [step.name, step.content])
            ),
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

      watcher.add(sketchDirectory);

      function onChange(changedPath: string) {
        if (!changedPath.startsWith(sketchDirectory)) {
          return;
        }
        const id = fileToIdMap.get(changedPath);

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
