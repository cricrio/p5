const bodyWidth = 250;
const limpRatio = 1 / 7;

function setup() {
  createCanvas(windowHeight, windowHeight);
  frameRate(26);
  // noStroke();
  sea = generateSea(width, height);
}

function draw() {
  background('#219ebc');
  fill('#ffb703');

  const bodyPosition = {
    x: (width - bodyWidth) / 2,
    y: (height - 1.5 * bodyWidth) / 2,
  };

  const limpY = bodyPosition.y + bodyWidth;

  drawSea(sea, height);
  octopus(bodyPosition, frameCount);
}

function octopus(bodyPosition, frameCount) {
  fill('#ffb703');

  const limpY = bodyPosition.y + bodyWidth;

  square(bodyPosition.x, bodyPosition.y, bodyWidth);
  rect(
    bodyPosition.x + limpRatio * bodyWidth,
    limpY,
    limpRatio * bodyWidth,
    bodyWidth - limpRatio * bodyWidth * cos(frameCount / 3)
  );
  rect(
    bodyPosition.x + 3 * limpRatio * bodyWidth,
    limpY,
    limpRatio * bodyWidth,
    bodyWidth + limpRatio * bodyWidth * cos(frameCount / 3)
  );
  rect(
    bodyPosition.x + 5 * limpRatio * bodyWidth,
    limpY,
    limpRatio * bodyWidth,
    bodyWidth - limpRatio * bodyWidth * cos(frameCount / 3)
  );
}

let sea = [];

function generateSea(width, height) {
  let seaPoints = [];
  for (let i = 0; i < 50; i++) {
    seaPoints.push({
      x: random(width),
      y: random(-50, height),
      width: random(50, 100),
    });
  }
  return seaPoints;
}

function drawSea(sea, height) {
  sea.forEach((p) => {
    fill('#0077b6');
    square(p.x, (p.y + frameCount) % height, p.width);
  });
}
