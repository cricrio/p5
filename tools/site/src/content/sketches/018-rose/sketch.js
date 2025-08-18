const colors = ['#ffe5ec', '#ffc2d1', '#ffb3c6', '#ff8fab', '#fb6f92'];
let size = 150;
let direction = -1;

function setup() {
  frameRate(16);
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  push();
  translate(width / 2, height / 2);
  rotate((frameCount * 15) % 360);

  if (direction > 0) {
    noStroke();
    fill('white');
  } else {
    fill(random(colors));
  }
  square(0, 0, size);
  pop();

  size = size + direction;

  if (size < 0) {
    direction = 1;
  }
  if (size > 170) {
    direction = -1;
    size = 150;
  }
  console.log(size);
}

function reset() {
  background('white');
  size = 150;
}

function keyPressed() {
  reset();
}

function mouseClicked() {
  reset();
}
