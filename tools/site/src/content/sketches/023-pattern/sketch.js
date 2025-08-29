function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();
}

const diameter = 200;
const ringWidth = 35;
const backgroundColor = '#741012';
const colors = ['#f7bd40', '#ed7425', '#d94527', '#b12a30'];
const reversedColors = [...colors].reverse();

function rings(x, y, colors) {
  colors.forEach((c, index) => {
    fill(c);
    circle(x, y, diameter - index * ringWidth);
  });
  fill(backgroundColor);
  circle(x, y, diameter - colors.length * ringWidth);
}

/**
 *
 * @param {*} x
 * @param {*} y
 * @param {number} side if -1 arc to the rigth if else 1 to left
 * @param {*} colors
 */
function arcs(x, y, side, colors) {
  colors.forEach((c, index) => {
    fill(c);
    arc(
      x,
      y,
      diameter - index * ringWidth,
      diameter - index * ringWidth,
      (-PI / 2) * side,
      (PI / 2) * side
    );
  });
  fill(backgroundColor);
  arc(
    x,
    y,
    diameter - colors.length * ringWidth,
    diameter - colors.length * ringWidth,
    (-PI / 2) * side,
    (PI / 2) * side
  );
}

function draw() {
  background(backgroundColor);
  const verticalDistance = diameter - 2 * ringWidth;
  const horizontalDistance = diameter + 2 * ringWidth;
  const rows = Math.ceil((height / verticalDistance + 1) / 2);
  const colums = Math.ceil((width / horizontalDistance + 1) / 2);

  const centerX = width / 2;
  const centerY = height / 2;

  for (let c = -colums; c < colums; c++) {
    for (let r = -rows; r < rows; r++) {
      rings(
        centerX + c * horizontalDistance,
        centerY + r * verticalDistance,
        r % 2 ? reversedColors : colors
      );
    }
    for (let r = -rows; r < rows; r++) {
      arcs(
        centerX + c * horizontalDistance,
        centerY + r * verticalDistance,
        r % 2 ? 1 : -1,
        r % 2 ? reversedColors : colors
      );
    }
  }
}
