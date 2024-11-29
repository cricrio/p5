function setup() {
  createCanvas(windowWidth, windowHeight);
  //by default draw is called 60 times per second, noLoop stops the call to draw()
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

const dotRadius = 10;

function draw() {
  background(252, 236, 201);
  for (let y = 0; y <= 1; y++) {
    for (let x = 0; x <= 8; x++) {}
  }
}
