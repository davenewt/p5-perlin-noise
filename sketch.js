let scl = 10;
let cols;
let rows;
let inc = 0.02; // increment value for perlin noise
let fr; // frame rate for display
let zoff = 0;
let particles = [];
let flowfield;
let modeSelectMenu;
let drawMode = "White Flies";

function setup() {
  // createCanvas(600, 400);
  createCanvas(windowWidth, windowHeight - 50);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');
  for (let i = 0; i < 3000; i++) {
    particles[i] = new Particle();
  }
  flowfield = new Array(cols * rows);
  background(0);
  // button = createButton('Save Image');
  // button.mousePressed(saveImg);
  modeSelectMenu = createSelect();
  modeSelectMenu.position(10, windowHeight - 40);
  modeSelectMenu.option('White Flies');
  modeSelectMenu.option('Ghost Web');
  modeSelectMenu.option('Coloured Comets');
  modeSelectMenu.option('Coloured Web');
  modeSelectMenu.changed(modeSelectEvent);
}

function modeSelectEvent() {
  background(0);
  drawMode = modeSelectMenu.value();
}

function saveImg() {
  save('perlin.png');
}

function draw() {
  if (drawMode == "White Flies") {
    background(0); // draw solid background
  } else if (drawMode == "Coloured Comets") {
    background(0, 0, 0, 7); // draw slightly translucent background
  } else if (drawMode == "Ghost Web" || drawMode == "Coloured Web") {
    // no need to re-draw background
  }
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

  // if (frameCount % 60 == 0) {
  //   fr.html("FPS: " + floor(frameRate()));
  // }

}
