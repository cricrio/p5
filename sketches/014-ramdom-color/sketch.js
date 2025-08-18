function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#EFD9CE');
}

const maxDots = 400;
let dots = 0;

function draw() {
  if (dots < maxDots) {
    dots++;
    fill(random(0, 255), random(0, 255), random(0, 255));
    circle(random(0, width), random(0, height), random(30, 100));
  }
}

function keyPressed() {
  background('#EFD9CE');
  dots = 0;
}
