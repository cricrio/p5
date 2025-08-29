function setup() {
  createCanvas(windowHeight, windowHeight);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  background('#5B1865');
  fill('#5688C7');
  const nbCol = 4;
  const size = (height - 20) / (nbCol - 1);
  const radius = 60;
  for (let x = 0; x < nbCol - 1; x++) {
    for (let y = 0; y < nbCol - 1; y++) {
      square(
        10 + size / 2 + x * size,
        10 + size / 2 + y * size,
        size - 20,
        (x == 0 && y == 0) || (y != 0 && x != 0) ? radius : 0,
        (x == 2 && y == 0) || (x != 2 && y != 0) ? radius : 0,
        (x == 2 && y == 2) || (x != 2 && y != 2) ? radius : 0,
        (x == 0 && y == 2) || (x != 0 && y != 2) ? radius : 0
      );
    }
  }
}
