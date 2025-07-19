/*

Playing with complementary colors with rgb

*/

function setup() {
  createCanvas(windowWidth, windowHeight);
  //by default draw is called 60 times per second, noLoop stops the call to draw()
  noLoop();
  //setting the color mode to be between 0-1 and follow the RGB mode
  colorMode(RGB, 1);
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  const primaryColor = color(Math.random(), Math.random(), Math.random());
  const secondaryColor = color(
    1 - red(primaryColor),
    1 - green(primaryColor),
    1 - blue(primaryColor)
  );

  const midX = Math.ceil(width / 2);
  const midY = Math.ceil(height / 2);
  const circleWidth = height / 4;

  fill(secondaryColor);
  rect(0, midY, midX, midY);
  rect(midX, 0, midX, midY);

  fill(primaryColor);
  rect(midX, midY, midX, midY);
  rect(0, 0, midX, midY);

  fill(secondaryColor);
  circle(midX / 2, midY / 2, circleWidth);
  circle(1.5 * midX, 1.5 * midY, circleWidth);

  fill(primaryColor);
  circle(1.5 * midX, midY / 2, circleWidth);
  circle(midX / 2, 1.5 * midY, circleWidth);
}
