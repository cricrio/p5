function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(20);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  background('#FFFCF9');
  fill('#FF6978');

  const noiseScale = 0.0025 * frameCount;

  const positionLevel = 1000;
  const sizeLevel = 500;

  const x = positionLevel * noise(noiseScale + 100);
  const y = positionLevel * noise(noiseScale + 500);
  const h = sizeLevel * noise(noiseScale + 5000);
  const w = sizeLevel * noise(noiseScale + 8000);

  rect(x, y, w, h);
}
