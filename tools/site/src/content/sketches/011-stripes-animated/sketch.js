const numCol = 4;
const numStripeMin = 23;
const numStripeMax = 90;

function setup() {
  createCanvas(windowHeight, windowHeight);
  frameRate(10);
}

function windowResized() {
  resizeCanvas(windowHeight, windowHeight);
}

function stripes(posX, posY, width, numStripe) {
  for (let x = 0; x <= numStripe; x++) {
    fill(x % 2 ? 'black' : 'white');
    rect(posX, posY + x * (width / numStripe), width, width / numStripe);
  }
}

let numStripe = numStripeMin;
let direction = 1;

function draw() {
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
        fill('black');
        rect(x * width, y * width, width, width);
      } else {
        stripes(x * width, y * width, width, numStripe);
      }
    }
  }
}
