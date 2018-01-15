let scl = 10;
let cols;
let rows;
let inc = 0.02; // increment value for perlin noise
let fr; // frame rate for display
let zoff = 0;
let particles = [];
let flowfield;
let numParticles;
let modeSelectMenu;
let drawMode = "White Flies";
let reseedMode;
let reseedModeCurrent = true;
let displayFieldMode;
let displayFieldModeCurrent = false;
let modalButton;

function setup() {
  // createCanvas(600, 400);
  createCanvas(windowWidth, windowHeight - 40);

  ff = createGraphics(windowWidth, windowHeight - 40); // for displaying flow field

  cols = floor(width / scl);
  rows = floor(height / scl);
  numParticles = 3000;
  seedParticles(numParticles);
  flowfield = new Array(cols * rows);
  background(0);

  modalButton = createButton('Open Control Panel');
  modalButton.id('cpOpenButton');

  modeSelectMenu = createSelect();
  modeSelectMenu.parent('cp-body');
  modeSelectMenu.option('White Flies');
  modeSelectMenu.option('Ghost Web');
  modeSelectMenu.option('Coloured Comets');
  modeSelectMenu.option('Coloured Web');
  modeSelectMenu.changed(modeSelectEvent);

  reseedMode = createCheckbox('Reseed Particles on Mode Change', reseedModeCurrent);
  reseedMode.parent('cp-body');
  reseedMode.changed(reseedModeEvent);

  // displayFieldMode = createCheckbox('Display Flow Field', displayFieldModeCurrent);
  // displayFieldMode.parent('cp-body');
  // displayFieldMode.changed(displayFieldModeEvent);

  saveButton = createButton('Save Image');
  saveButton.parent('cp-body');
  saveButton.mousePressed(saveImg);

  fr = createP('FPS: waiting...');
  fr.parent('cp-body');

  // Get the Control Panel modal
  let cpModal = document.getElementById('controlPanel');
  // Get the button that opens the modal
  let cpButton = document.getElementById("cpOpenButton");
  // Get the <span> element that closes the modal
  let cpCloseSpan = document.getElementsByClassName("close")[0];
  // When the user clicks the button, open the modal
  cpButton.onclick = function() {
    cpModal.style.display = "block";
  }
  // When the user clicks on <span> (x), close the modal
  cpCloseSpan.onclick = function() {
    cpModal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  // window.onclick = function(event) {
  //   if (event.target != cpModal && event.target != cpButton) {
  //     cpModal.style.display = "none";
  //   }
  // }

}

function seedParticles(num) {
  particles = [];
  for (let i = 0; i < num; i++) {
    particles[i] = new Particle();
  }
}

function modeSelectEvent() {
  background(0);
  drawMode = modeSelectMenu.value();
  if (reseedModeCurrent) {
    seedParticles(numParticles);
  }
}

function reseedModeEvent() {
  reseedModeCurrent = reseedMode.checked();
}

function displayFieldModeEvent() {
  displayFieldModeCurrent = displayFieldMode.checked();
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
      if (displayFieldModeCurrent) {
        // push();
        // ff.stroke(200, 0, 0);
        // ff.strokeWeight(1);
        // ff.translate(x * scl, y * scl);
        // ff.rotate(v.heading());
        // ff.line(0, 0, scl, 0);
        // pop();
        // image(ff, 50, 50);
      }
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

  if (frameCount % 30 == 0) {
    fr.html("FPS: " + floor(frameRate()));
  }

}
