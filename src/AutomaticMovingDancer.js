var AutomaticMovingDancer = function(top, left, timeBetweenSteps) {
  MovingDancer.call(this, top, left, timeBetweenSteps);
  
  this.direction;
  this.stepCount = 0;
  this.moving = true;

  this.setDirection();
};

AutomaticMovingDancer.prototype = Object.create(MovingDancer.prototype);
AutomaticMovingDancer.prototype.constructor = AutomaticMovingDancer;

AutomaticMovingDancer.prototype.setDirection = function() {
  this.direction = Math.random() * 2 * Math.PI;
};

AutomaticMovingDancer.prototype.step = function() {
  //move the dancer 20 pixels in its direction
  if (this.moving) {
    this.top -= Math.sin(this.direction) * 20;
    this.left += Math.cos(this.direction) * 20;
    this.setPosition(this.top, this.left);
    this.stepCount++;
    if (this.stepCount == 20) {
      this.setDirection();
      this.stepCount = 0;
    }
  }
  MovingDancer.prototype.step.call(this);
};

AutomaticMovingDancer.prototype.lineUp = function(top, left) {
  this.moving = false;
  Dancer.prototype.lineUp.call(this, top, left);
};

MovingDancer.prototype.stopMoving = function () {
  this.moving = false;
};

/*
MovingDancer.prototype.startMoving = function () {
  this.moving = true;
};
*/
