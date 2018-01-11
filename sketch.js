let scl = 5;
let cols;
let rows;
let inc = 0.01;

function setup() {
  createCanvas(600, 400);
  // createCanvas(windowWidth, windowHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);
}

function draw() {
  background(0);

  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = (x + y * width) * 4;
      let r = noise(xoff, yoff) * 255;
      xoff += inc;
      fill(r);
      stroke(150);
      strokeWeight(1);
      rect(x * scl, y * scl, scl, scl);
    }
    yoff += inc;
  }
}
