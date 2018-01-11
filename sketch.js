let scl = 15;
let cols;
let rows;
let inc = 0.05; // increment value for perlin noise
let fr; // frame rate for display
let zoff = 0;

function setup() {
  createCanvas(600, 400);
  // createCanvas(windowWidth, windowHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');
}

function draw() {
  background(0);
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = (x + y * width) * 4;
      let angle = noise(xoff, yoff, zoff) * TWO_PI;
      let v = p5.Vector.fromAngle(angle);
      xoff += inc;
      stroke(200);
      strokeWeight(1);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      line(0, 0, scl, 0);
      pop();
    }
    yoff += inc;
  }
  zoff += 0.005;
  fr.html("Framerate: " + floor(frameRate()));
}
