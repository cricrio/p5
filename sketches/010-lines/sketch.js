const numCol = 4;
const numStripe = 5;

function setup() {
  createCanvas(windowHeight, windowHeight);
}

function windowResized() {
  resizeCanvas(windowHeight, windowHeight);
}

function stripes(posX, posY, w, h) {
  for (let x = 0; x <= numStripe; x++) {
    fill(x % 2 ? 'black' : 'white');
    rect(posX, posY + x * (h / numStripe), w, h / numStripe);
  }
}

function draw() {
  rect(0, 10, 10);
  const width = windowHeight / numCol;

  for (let y = 0; y <= numCol; y++) {
    for (let x = 0; x <= numCol; x++) {
      const offset = x % 2;
      if ((offset + y) % 2) {
        fill('black');
        rect(x * width, y * width, width, width);
      } else {
        stripes(x * width, y * width, width, width);
      }
    }
  }
}
