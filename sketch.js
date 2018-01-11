let scl = 15;
let cols;
let rows;
let inc = 0.05; // increment value for perlin noise
let fr; // frame rate for display
let zoff = 0;
let particles = [];

function setup() {
  createCanvas(600, 400);
  // createCanvas(windowWidth, windowHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');
  for (let i = 0; i < 100; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  background(255);
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = (x + y * width) * 4;
      let angle = noise(xoff, yoff, zoff) * TWO_PI;
      let v = p5.Vector.fromAngle(angle);
      xoff += inc;
    // stroke(200);
    // strokeWeight(1);
    // push();
    // translate(x * scl, y * scl);
    // rotate(v.heading());
    // line(0, 0, scl, 0);
    // pop();
    }
    yoff += inc;
  }
  zoff += 0.005;

  for (let i = 0; i < particles.length; i++) {
    particles[i].show();
    particles[i].update();
    particles[i].edges();
  }

  fr.html("Framerate: " + floor(frameRate()));
}
