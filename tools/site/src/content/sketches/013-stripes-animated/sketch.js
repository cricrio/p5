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
      (this.direction == 1 && this.y.current < this.y.target) ||
      (this.direction == -1 && this.y.target < this.y.current)
    ) {
      this.y.current = this.y.current + this.direction;
    } else {
      this.pause++;

      if (this.pause >= 10) {
        this.pause = 0;
        this.direction = -1 * this.direction;

        const tempY = this.y.target;
        this.y.target = this.y.origin;
        this.y.origin = tempY;
      }
    }
  }
  draw() {
    rect(this.x, this.y.current, this.width, this.heigth);
  }
}

function generateStripes(x, y, width) {
  const heigth = width / 7;

  //position de la stripe du centre
  const centerStripeY = {
    origin: y + width / 2,
    target: y + width / 2,
  };

  //la position des stripes est relative à leur centre
  const centeredX = x + width / 2;

  return [
    new Stripe({
      x: centeredX,
      y: {
        target: centerStripeY.origin,
        origin: centerStripeY.origin - 2 * heigth,
      },
      width,
      heigth,
    }),
    new Stripe({
      x: centeredX,
      y: centerStripeY,
      width,
      heigth,
    }),
    new Stripe({
      x: centeredX,
      y: {
        target: centerStripeY.origin,
        origin: centerStripeY.origin + 2 * heigth,
      },
      width,
      heigth,
    }),
  ];
}

let stripes = [];

function setup() {
  const width = windowHeight / numCol;
  rectMode(CENTER);
  createCanvas(windowHeight, windowHeight);
  frameRate(52);
  noStroke();

  for (let y = 0; y <= numCol; y++) {
    for (let x = 0; x <= numCol; x++) {
      const offset = x % 2;
      if ((offset + y - 1) % 2) {
        console.log(!((offset + y) % 2));
        stripes = [...stripes, ...generateStripes(x * width, y * width, width)];
      }
    }
  }
}

let numStripe = numStripeMin;
let direction = 1;

function draw() {
  background('white');
  fill('black');

  const width = windowHeight / numCol;

  numStripe = numStripe + 2 * direction;

  if (numStripe > numStripeMax) {
    direction = -1;
  } else if (numStripe < numStripeMin) {
    direction = 1;
  }

  for (let y = 0; y <= numCol; y++) {
    for (let x = 0; x <= numCol; x++) {
      const offset = x % 2;
      if ((offset + y) % 2) {
        //les position sont relatives aux centre des rectangles. Il faut les décaler de la moitié de la largeur (width)
        //rect(x * width + 0.5 * width, y * width + 0.5 * width, width, width);

        rect((x + 0.5) * width, (y + 0.5) * width, width, width);
      }
    }
  }

  stripes.forEach((stripe) => {
    stripe.tick();
    stripe.draw();
  });
}
