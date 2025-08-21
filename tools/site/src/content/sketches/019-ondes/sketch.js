function setup() {
  frameRate(26);
  noStroke();
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background('#6761A8');
  fill(color(0, 180, 216, 255 / 2));

  const radius = 100;
  for (let x = 0; x < 2; x++) {
    for (let y = 0; y < 2; y++) {
      //cos(frameCount) varie de -1 à 1
      //Math.abs() permet de récupérer la valeur absolue (enlevé le signe) on a donc une variation de 0 à 1
      //pour avoir un cercle qui grandi on doit ajouter un.
      push();
      translate((width - radius) / 2, (height - radius) / 2);
      circle(
        1.2 * x * radius,
        1.2 * y * radius,
        radius * (1 + 0.7 * Math.abs(sin(frameCount)))
      );
      pop();
    }
  }
}
