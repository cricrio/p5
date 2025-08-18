function setup() {
  frameRate(26);
  createCanvas(windowWidth, windowHeight);
  background('#EFD9CE');
}

let previousX;
let previousY;

function draw() {
  if (previousX !== mouseX && previousY !== mouseY) {
    fill(random(0, 255), random(0, 255), random(0, 255));
    circle(mouseX, mouseY, random(30, 100));
    previousX = mouseX;
    previousY = mouseY;
  }
}

function keyPressed() {
  background('#EFD9CE');
}
