const numCol = 4;
const numStripeMin = 5;
const numStripeMax = 6;

const mouseTrackerStatus = {
  moving: 'moving',
  stop: 'stop',
  resetting: 'resetting',
};
class MouseTracker {
  constructor(width, heigth) {
    this.state = mouseTrackerStatus.stop;
    this.distance = { x: 0, y: 0 };
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.heigth = heigth;
  }
  tick(x, y) {
    if (this.state === mouseTrackerStatus.moving) {
      this.distance.x = this.x - x;
      this.distance.y = this.y - y;
    }
    if (this.state === mouseTrackerStatus.resetting) {
      if (this.distance.x) {
        this.distance.x =
          this.distance.x > 0 ? this.distance.x - 1 : this.distance.x + 1;
      }
      if (this.distance.y) {
        this.distance.y =
          this.distance.y > 0 ? this.distance.y - 1 : this.distance.y + 1;
      }
    }
  }
  toggle() {
    if (this.state === mouseTrackerStatus.moving) {
      this.state = mouseTrackerStatus.resetting;
    } else if (this.state === mouseTrackerStatus.stop) {
      this.state = mouseTrackerStatus.moving;
    } else {
      this.state = mouseTrackerStatus.moving;
    }
  }
  reset() {
    this.state = mouseTrackerStatus.resetting;
  }
}
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
  const centerStripeY = {
    origin: y + (width - heigth) / 2,
    target: y + (width - heigth) / 2,
  };

  return [
    new Stripe({
      x,
      y: {
        target: centerStripeY.origin,
        origin: centerStripeY.origin - 2 * heigth,
      },
      width,
      heigth,
    }),
    new Stripe({
      x,
      y: centerStripeY,
      width,
      heigth,
    }),
    new Stripe({
      x,
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
let mouseTracker;

function setup() {
  const width = windowHeight / numCol;
  mouseTracker = new MouseTracker(windowHeight, windowWidth);

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

  mouseTracker.tick(mouseX, mouseY);

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
        rect(
          x * width + mouseTracker.distance.x / 2,
          y * width + mouseTracker.distance.y / 2,
          width,
          width
        );
      }
    }
  }

  stripes.forEach((stripe) => {
    stripe.tick();
    stripe.draw();
  });
}

function mouseClicked() {
  mouseTracker.toggle();
}

function doubleClicked() {
  mouseTracker.reset();
}