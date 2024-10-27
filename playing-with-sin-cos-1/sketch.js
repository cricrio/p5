/*

Playing with loop

*/

const STARTING_POINT = 50;
let pos = STARTING_POINT;
const spaceFromCenter = 20;
const dotRadius = 30;
const spaceBeetweenDots = 6;
const verticalOffset = 50;
const angleMultiplier = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //by default draw is called 60 times per second, noLoop stops the call to draw()
  frameRate(6);
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let angle = 0;

function draw() {
  background(252, 236, 201);

  for (let y = -1; y <= 1; y++) {
    for (let x = 0; x <= 8; x++) {
      const c = cos(angle + (x + y) * angleMultiplier);
      const s = sin(angle + x * angleMultiplier);

      if (c > 0) {
        fill(252, 176, 179);
      } else {
        fill(249, 57, 67);
      }
      circle(
        width / 2 - spaceBeetweenDots * x * x + c * 10 - 20,
        height / 2 + s * 10 - (x + y) * verticalOffset,
        dotRadius
      );
      circle(
        width / 2 + spaceBeetweenDots * x * x - c * 10 + 20,
        height / 2 - s * 10 - (x + y) * verticalOffset,
        dotRadius
      );
    }
  }

  for (let x = 0; x <= 8; x++) {
    const c = cos(angle + (6 + x) * angleMultiplier);
    const s = sin(angle + (6 + x) * angleMultiplier);

    if (c > 0) {
      fill(252, 176, 179);
    } else {
      fill(249, 57, 67);
    }
    circle(
      width / 2 - c * 10,
      height / 2 - s * 10 + x * verticalOffset,
      dotRadius
    );
  }
  console.log(angle);
  angle = angle + 10;
}
