const colors = ['#ffe5ec', '#ffc2d1', '#ffb3c6', '#ff8fab', '#fb6f92'];
let size = 150;

function setup() {
  frameRate(16);
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  if (size) {
    push();
    translate(width / 2, height / 2);
    rotate((frameCount * 15) % 360);
    fill(random(colors));
    square(0, 0, size);
    pop();
    size = size - 1;
  }
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
