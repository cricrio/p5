const numCol = 4;
const numStripeMin = 5;
const numStripeMax = 6;

class Stripe {
  constructor({ x, y: { origin, target }, width, heigth }) {
    this.x = x;
    this.y = { origin, target, current: origin };
    this.width = width;
    this.heigth = heigth;
    this.direction = origin > target ? -1 : 1;
    this.pause = 0;
  }
  tick() {
    if (
      (this.direction == 1 && this.y.current <= this.y.target) ||
      (this.direction == -1 && this.y.target <= this.y.current)
    ) {
      this.y.current = this.y.current + this.direction;
    } else {
      this.pause++;

      console.log(this.pause, this.direction);
      if (this.pause >= 10) {
        this.pause = 0;
        this.direction = -1 * this.direction;
        this.y.current = this.y.current + this.direction;
        const tempY = this.y.target;
        this.y.target = this.y.origin;
        this.y.origin = tempY;
      }
    }
  }
  draw() {
    fill('red');
    rect(this.x, this.y.current, this.width, this.heigth);
  }
}

function setup() {
  createCanvas(windowHeight, windowHeight);
  frameRate(10);
}

function windowResized() {
  resizeCanvas(windowHeight, windowHeight);
}

let numStripe = numStripeMin;
let direction = 1;

const stripes = [
  new Stripe({
    x: 50,
    y: { origin: 10, target: 100 },
    heigth: 10,
    width: 100,
  }),
  new Stripe({
    x: 50,
    y: { origin: 100, target: 10 },
    heigth: 10,
    width: 100,
  }),
];

function draw() {
  background('white');

  numStripe = numStripe + 2 * direction;

  if (numStripe > numStripeMax) {
    direction = -1;
  } else if (numStripe < numStripeMin) {
    direction = 1;
  }
  stripes.forEach((stripe) => {
    stripe.tick();
    stripe.draw();
  });
}
