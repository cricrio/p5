function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  const largeSquareWidth = 100;
  const smallSquareWidth = largeSquareWidth / 4;

  const margin = 10;

  const center = {
    x: (width - largeSquareWidth) / 2,
    y: (height - largeSquareWidth) / 2,
  };

  strokeWeight(5);

  //center square
  square(center.x, center.y, largeSquareWidth);

  //top squares
  square(center.x, center.y - smallSquareWidth - margin, smallSquareWidth);
  square(
    center.x - smallSquareWidth - margin,
    center.y - smallSquareWidth - margin,
    smallSquareWidth
  );
  square(center.x - smallSquareWidth - margin, center.y, smallSquareWidth);

  //bottom squares
  square(
    center.x + largeSquareWidth + margin,
    center.y + largeSquareWidth - smallSquareWidth,
    smallSquareWidth
  );
  square(
    center.x + largeSquareWidth + margin,
    center.y + largeSquareWidth + margin,
    smallSquareWidth
  );
  square(
    center.x + largeSquareWidth - smallSquareWidth,
    center.y + largeSquareWidth + margin,
    smallSquareWidth
  );
}
