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
  const fileToIdMap = new Map<
    string,
    | { id: string; type: 'sketch' }
    | { type: 'steps'; id: string; stepId: string }
  >();

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
          const directory = `${sketchDirectory}${dirent.name}`;

          const steps = loadSteps(directory);

          fileToIdMap.set(path, { id, type: 'sketch' });

          steps.forEach((step) => {
            fileToIdMap.set(step.path, {
              id,
              type: 'steps',
              stepId: step.name,
            });
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

        const identifier = fileToIdMap.get(changedPath);
        console.log(identifier);
        if (!identifier) {
          logger.info(
            `Unabled to find in ${changedPath} in store. You may need to restart astro.`
          );
          return;
        }

        if (identifier.type === 'sketch') {
          const sketch = store.get(identifier.id);
          const sketchScript = fs.readFileSync(changedPath, 'utf-8');
          store.set({
            id: identifier.id,
            data: { ...sketch?.data, sketch: sketchScript },
          });
        } else if (identifier.type === 'steps') {
          const updatedScript = fs.readFileSync(changedPath, 'utf-8');
          const sketch = store.get(identifier.id);
          console.log(sketch);
          store.set({
            id: identifier.id,

            data: {
              ...sketch?.data,
              steps: {
                ...(sketch?.data?.steps ?? {}),
                [identifier.stepId]: updatedScript,
              },
            },
          });

          console.log(store.get(identifier.id));
        }
      }

      watcher.on('change', onChange);

      watcher.on('add', onChange);
    },
  };
}
