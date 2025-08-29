function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(2);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  background('#FFFCF9');
  fill('#FF6978');
  square(
    width / 2,
    height / 2,
    100,
    random(60),
    random(60),
    random(60),
    random(60)
  );
}
