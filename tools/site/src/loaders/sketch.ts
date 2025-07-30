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
        name: path.parse(stepPath).name,
        content: fs.readFileSync(stepPath, 'utf-8'),
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

          if (steps.length) {
            console.log(
              { steps },
              Object.fromEntries(steps.map((step) => [step.name, step.content]))
            );
          }

          fileToIdMap.set(path, id);
          steps.forEach((step) => {
            fileToIdMap.set(step.path, `${id}/${step.name}`);
          });

          return {
            id,
            sketch: fs.readFileSync(path, 'utf-8'),
            steps: Object.fromEntries(
              steps.map((step) => [step.name, step.content])
            ),
          };
        });

      store.clear();

      for (const s of sketches) {
        store.set({
          id: s.id,
          data: { sketch: s.sketch, steps: s.steps },
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

        const sketch = fs.readFileSync(changedPath, 'utf-8');

        const steps = loadSteps(changedPath);

        store.set({
          id,
          data: {
            sketch: sketch,
            steps: Object.fromEntries(
              steps.map((step) => [step.name, step.content])
            ),
          },
        });
      }

      watcher.on('change', onChange);

      watcher.on('add', onChange);
    },
  };
}
