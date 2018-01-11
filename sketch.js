let scl = 10;
let cols;
let rows;
let inc = 0.02; // increment value for perlin noise
let fr; // frame rate for display
let zoff = 0;
let particles = [];
let flowfield;

function setup() {
  // createCanvas(600, 400);
  createCanvas(windowWidth, windowHeight - 50);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');
  for (let i = 0; i < 5000; i++) {
    particles[i] = new Particle();
  }
  flowfield = new Array(cols * rows);
  background(0);
}

function draw() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(0.1);
      flowfield[index] = v;
      xoff += inc;
    // stroke(155);
    // strokeWeight(1);
    // push();
    // translate(x * scl, y * scl);
    // rotate(v.heading());
    // line(0, 0, scl, 0);
    // pop();
    }
    yoff += inc;
  }
  // zoff += 0.001;

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  if (frameCount % 60 == 0) {
    fr.html("FPS: " + floor(frameRate()));
  }

}
