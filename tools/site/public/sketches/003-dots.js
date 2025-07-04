let colors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  frameRate(3);
  colors = [
    color(239, 71, 111), // pink
    color(255, 209, 102), // yellow
    color(6, 214, 160), // blue
    color(17, 138, 178), // darker blue
  ];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

const dotRadius = 50;
const spaceBetweenDots = 5;
let step = 0;

function draw() {
  background(252, 236, 201);
  fill(250, 0, 0);

  const verticalNumberOfDots = height / (dotRadius + spaceBetweenDots) + 1;
  const horizontalNumberOfDots = width / (dotRadius + spaceBetweenDots);

  for (let y = 0; y <= verticalNumberOfDots; y++) {
    for (let x = 0; x <= horizontalNumberOfDots; x++) {
      fill(colors[(Math.abs(y - x) + step) % colors.length]);
      circle(
        (y % 2 == 0 ? dotRadius / 2 : 0) + x * (dotRadius + spaceBetweenDots),
        y * (dotRadius + spaceBetweenDots),
        dotRadius
      );
    }
  }
  step++;
}
