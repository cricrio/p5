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

const dotRadius = 30;
const space = 5;

function infiniteTranslate(shape, count) {
  shape();
  for (let x = 0; x < count; x++) {
    push();
    translate(
      (x * (dotRadius + space) + frameCount) % (count * (dotRadius + space)),
      0
    );
    shape();
    pop();
  }
  push();
  translate(count * (dotRadius + space), 0);
  shape();
  push();
}

function draw() {
  background(252, 236, 201);
  translate(width / 2 - (dotRadius + space) * 2.5, height / 2);
  fill(250, 0, 0);
  infiniteTranslate(() => {
    fill(colors[0]);
    circle(0, 0, 30);
  }, 5);
}
