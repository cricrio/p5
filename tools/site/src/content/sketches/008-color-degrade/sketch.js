let colors = [];
const numCol = 10;
const numRow = 10;

const maxWidth = 300;
let width = 300;

function lerpSquare(posX, posY, colorFrom, colorTo) {
  const step = 6;

  for (let x = 0; x <= step; x++) {
    const inter = lerpColor(colorFrom, colorTo, x / step);
    fill(inter);
    square(posX, posY, Math.ceil((width / step) * (step - x)));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  const idealWidth = (0.9 * Math.min(windowWidth, windowHeight)) / 2;
  width = Math.min(idealWidth, maxWidth);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  const idealWidth = (0.9 * Math.min(windowWidth, windowHeight)) / 2;
  width = Math.min(idealWidth, maxWidth);
}

function draw() {
  rectMode(CENTER);
  noStroke();
  background('#E56399');

  const innerColorTo = color('#E56399');
  const innerColorFrom = color('#02007A');

  lerpSquare(
    windowWidth / 2 - width / 2,
    windowHeight / 2 + width / 2,
    innerColorFrom,
    innerColorTo
  );
  lerpSquare(
    windowWidth / 2 + width / 2,
    windowHeight / 2 + width / 2,
    innerColorFrom,
    innerColorTo
  );
  lerpSquare(
    windowWidth / 2 - width / 2,
    windowHeight / 2 - width / 2,
    innerColorFrom,
    innerColorTo
  );
  lerpSquare(
    windowWidth / 2 + width / 2,
    windowHeight / 2 - width / 2,
    innerColorFrom,
    innerColorTo
  );
}
