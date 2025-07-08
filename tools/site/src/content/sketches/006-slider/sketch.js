let dotColor;
let dots;

class Dot {
  constructor(limit) {
    this.position = 0;
    this.limit = limit;
    this.direction = 1;
    this.pause = 0;
  }
  move() {
    if (
      (this.direction == 1 && this.position < this.limit) ||
      (this.direction == -1 && 0 < this.position)
    ) {
      this.position = this.position + this.direction;
    } else {
      this.pause++;
      if (this.pause > 650) {
        this.pause = 0;
        this.direction = -1 * this.direction;
        this.position = this.position + this.direction;
      }
    }
  }
  draw() {
    push();
    translate(this.position, 0);
    fill(dotColor);
    circle(0, 0, 30);
    fill(255, 255, 255, 255);
    circle(0, 20, 30);
    pop();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //by default draw is called 60 times per second, noLoop stops the call to draw()
  noStroke();
  frameRate(56);
  angleMode(DEGREES);
  dots = [
    new Dot(200),
    new Dot(200),
    new Dot(200),
    new Dot(200),
    new Dot(200),
    new Dot(200),
  ];
  dotColor = color(255, 255, 255, 255 / dots.length + 70);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

const dotRadius = 30;
const space = 5;

function draw() {
  background(0, 0, 0);

  push();
  translate(width / 2, height / 2);
  dots.forEach((element) => {
    element.draw();
  });
  pop();

  dots.forEach((element, index) => {
    if (frameCount > index * 100) {
      element.move();
    }
  });
}
