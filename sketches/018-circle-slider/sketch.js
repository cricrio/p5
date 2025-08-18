function setup() {
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
  background('#EFD9CE');
  noStroke();
  angleMode(DEGREES);
}

function draw() {
  push();
  translate(width / 2, height / 2);
  rotate((frameCount * 2) % 360);
  fill('#1446A0');
  circle(100, 0, 50);
  fill('#DB3069');
  circle(-100, 0, 50);
  pop();
}

function keyPressed() {
  background('#EFD9CE');
}
