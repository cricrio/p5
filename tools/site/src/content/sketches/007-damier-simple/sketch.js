let colors = [];
const numCol = 10;
const numRow = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  const rectWidth = windowWidth / numCol;
  const rectHeight = windowHeight / numRow;

  for (let x = 0; x <= 10; x++) {
    for (let y = 0; y <= 10; y++) {
      const offset = y % 2 ? 0 : 1;
      fill((x + offset) % 2 ? 'blue' : 'red');
      rect(x * rectWidth, y * rectHeight, rectWidth, rectHeight);
    }
  }
}
