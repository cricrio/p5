import { readdir, copyFile, writeFile } from 'fs/promises';

const SKETCHES_DIRECTORY = process.env.SKETCHES_DIRECTORY;
const SITE_DIRECTORY = process.env.SITE_DIRECTORY;

async function getDirectories(source) {
  return (await readdir(source, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

function getData(sketches) {
  return sketches.map((s) => ({
    video: {
      source: `${SKETCHES_DIRECTORY}/${s}/record.mp4`,
      destination: `${SITE_DIRECTORY}/public/videos/${s}.mp4`,
      publicUrl: `videos/${s}.mp4`,
    },
    script: {
      source: `${SKETCHES_DIRECTORY}/${s}/sketch.js`,
      destination: `${SITE_DIRECTORY}/public/sketches/${s}.js`,
    },
    name: s,
  }));
}

async function copySketches(sketchesData) {
  const promise = Promise.all(
    sketchesData.map(({ script }) =>
      copyFile(script.source, script.destination)
    )
  );
  return promise;
}

function saveData(data) {
  return writeFile(
    `${SITE_DIRECTORY}/data.json`,
    JSON.stringify(data, null, 2)
  );
}

async function main() {
  const sketches = await getDirectories(SKETCHES_DIRECTORY);
  const data = getData(sketches);
  await Promise.all(
    data.map(({ video: { source, destination } }) =>
      copyFile(source, destination)
    )
  );
  await copySketches(data);
  await saveData(data);
}

main().then(console.log);
