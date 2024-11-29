/*

Playing with loop

*/
let pos = 0;
const spaceFromCenter = 20;
const dotRadius = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //by default draw is called 60 times per second, noLoop stops the call to draw()
  frameRate(6);
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function twin(position, angle) {
  if (cos(angle) <= 0) {
    fill(150, 2, 0);
  } else {
    fill(138, 205, 234);
  }
  circle(
    width / 2 + cos(angle) - (spaceFromCenter + position * 5),
    sin(angle) * 30 + position * 10,
    dotRadius
  );
  circle(
    width / 2 + cos(angle + 10) * 20 + (spaceFromCenter + position * 5),
    sin(angle) * 30 + position * 10,
    dotRadius
  );
}
function draw() {
  background(239, 234, 90);

  fill(255, 0, 0);
  for (let x = -50; x < 0; x = x + 5) {
    twin(pos + x, pos + x);
    console.log(x);
  }

  pos = pos * 10 > height ? 0 : pos + 1;
}
