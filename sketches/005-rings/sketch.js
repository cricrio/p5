let colors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  //by default draw is called 60 times per second, noLoop stops the call to draw()
  noStroke();
  frameRate(56);
  angleMode(DEGREES);
  colors = [color('blue'), color('red')];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

const nbOfDots = 10;
const distanceBeetweenRing = 30;

function ring(index) {
  const dotsByRing = nbOfDots * index;
  for (let x = 0; x < dotsByRing; x++) {
    push();
    rotate(x * (360 / dotsByRing));
    fill(colors[index % 2]);
    circle(index * distanceBeetweenRing, 0, 15);
    pop();
  }
}

function draw() {
  background(252, 236, 201);
  translate(width / 2, height / 2);
  fill(250, 0, 0);

  for (let x = 0; x < 15; x++) {
    const direction = x % 2 ? 1 : 1;
    push();
    rotate((direction * frameCount) / x);
    ring(x);
    pop();
  }
}
