import { readdir } from 'fs/promises';
import timecut from 'timecut';

const SKETCHES_DIRECTORY = process.env.SKETCHES_DIRECTORY;
const SERVER_URL = process.env.SERVER_URL;

async function getDirectories(source) {
  return (await readdir(source, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

function getSketchesPublicUrlAndRecordingPath(
  sketchesDirectory,
  serverUrl,
  directories
) {
  return directories.map((d) => ({
    publicUrl: `${serverUrl}/${d}/`,
    recordPath: `${sketchesDirectory}/${d}`,
  }));
}

function record(sketch) {
  return timecut({
    url: sketch.publicUrl,
    output: `${sketch.recordPath}/record.mp4`,
    duration: 5,
    fps: 10,
    start: 1, //waiting 1 second before recording to avoid having a white frame.
    selector: 'canvas',
    preparePage: async (page) => {
      await page.waitForSelector('canvas');
      return page;
    },
  });
}

async function main() {
  //list directories with sketches
  const directories = await getDirectories(SKETCHES_DIRECTORY);
  const sketches = getSketchesPublicUrlAndRecordingPath(
    SKETCHES_DIRECTORY,
    SERVER_URL,
    directories
  );

  for (let sketch of sketches) {
    await record(sketch);
  }
}

main().then(console.log);
