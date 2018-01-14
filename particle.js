function Particle() {
  this.pos = createVector(floor(random(width)), floor(random(height)));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 2;
  this.prevPos = this.pos.copy();

  this.update = function() {
    this.vel.add(this.acc.mult(0.2));
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.show = function() {
    switch (drawMode) {
      case 'White Flies': // white lines
        colorMode(RGB, 255, 255, 255, 100);
        stroke(255, 255, 255, 100);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        break;
      case 'Coloured Comets':
        colorMode(RGB, 255, 255, 255, 100);
        let blueV1 = map(this.vel.x + this.vel.y, 0, this.maxspeed * 2, 255, 0);
        let redV1 = map(this.vel.x + this.vel.y, 0, this.maxspeed * 2, 0, 255);
        stroke(redV1, 0, blueV1, 100);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        break;
      case 'Ghost Web':
        colorMode(RGB, 255, 255, 255, 100);
        stroke(255, 255, 255, 2);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        break;
      case 'Coloured Web':
        colorMode(RGB, 255, 255, 255, 100);
        let blueV2 = map(this.vel.x + this.vel.y, 0, this.maxspeed * 2, 255, 0);
        let redV2 = map(this.vel.x + this.vel.y, 0, this.maxspeed * 2, 0, 255);
        stroke(redV2, 0, blueV2, 2);
        // stroke(255, 255, 255, 5);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        break;
      default:
        colorMode(RGB, 255, 255, 255, 100);
        stroke(255, 255, 255, 100);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    }
    // stroke(redV, 255, blueV, 100);

    // If using WEBGL context for P5 canvas...
    // lines not working, see https://github.com/processing/p5.js/issues/1638
    // so we use vertex() twice, instead.
    // However, this is twice as SLOW as non-WebGL context (13/01/2018)
    // push();
    // beginShape(LINES);
    // fill(255, 255, 255, 5);
    // vertex(this.pos.x - width / 2, this.pos.y - height / 2, 1);
    // vertex(this.prevPos.x - width / 2, this.prevPos.y - height / 2, 1);
    // endShape();
    // pop();

    this.updatePrev();
  }

  this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }

  this.follow = function(vectors) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols; // taking 2D value into a 1D array
    let force = vectors[index];
    this.applyForce(force);
  }

}
