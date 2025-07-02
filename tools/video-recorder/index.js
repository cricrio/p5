import { readdir, readFile } from 'fs/promises';
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
    name: d,
    publicUrl: `${serverUrl}/${d}/`,
    recordPath: `${sketchesDirectory}/${d}`,
    videoSettings: `${sketchesDirectory}/${d}/config.json`,
  }));
}

function record(sketch, { duration = 10, fps = 10 } = {}) {
  return timecut({
    url: sketch.publicUrl,
    output: `${sketch.recordPath}/record.mp4`,
    duration,
    fps,
    screenshotType: 'jpeg',
    screenshotQuality: 1,
    start: 1, //waiting 1 second before recording to avoid having a white frame.
    selector: 'canvas',
    preparePage: async (page) => {
      await page.waitForSelector('canvas');
      return page;
    },
  });
}

async function getVideoSettings(settingPath) {
  return JSON.parse(await readFile(settingPath));
}

function getSketchIndex(argv) {
  const sketchIndex = argv[2];
  console.log(sketchIndex);
  console.log(argv.length);
  return isNaN(sketchIndex) ? null : sketchIndex;
}

async function main() {
  const sketchIndex = getSketchIndex(process.argv);

  //list directories with sketches
  const directories = await getDirectories(SKETCHES_DIRECTORY);
  const sketches = getSketchesPublicUrlAndRecordingPath(
    SKETCHES_DIRECTORY,
    SERVER_URL,
    directories
  );

  if (sketchIndex) {
    const sketch = sketches.find((s) => s.name.startsWith(sketchIndex));
    if (sketch) {
      const videoSettings = await getVideoSettings(sketch.videoSettings);
      console.log(videoSettings);
      await record(sketch, videoSettings);
    } else {
      console.log('Sketch %s not found', sketchIndex);
    }
  } else {
    for (let sketch of sketches) {
      const videoSettings = await getVideoSettings(sketch.videoSettings);
      await record(sketch, videoSettings);
    }
  }
}

main();
