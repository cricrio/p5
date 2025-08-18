function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#EFD9CE');
  noStroke();
  angleMode(DEGREES);
}

function draw() {
  push();
  translate(width / 2, height / 2);
  rotate(frameCount % 360);
  fill('#1446A0');
  circle(width / 5, 0, 50);
  fill('#DB3069');
  circle(-width / 5, 0, 50);
  pop();
}

function keyPressed() {
  background('#EFD9CE');
}
