var MovingBlinkyDancer = function(top, left, timeBetweenSteps) {
  BlinkyDancer.call(this, top, left, timeBetweenSteps);
  //this.direction = undefined;
  this.top = top;
  this.left = left;
  this.stepCount = 0;
  this.setDirection();
};

MovingBlinkyDancer.prototype = Object.create(BlinkyDancer.prototype);
MovingBlinkyDancer.prototype.constructor = MovingBlinkyDancer;

MovingBlinkyDancer.prototype.setDirection = function() {
  this.direction = Math.random() * 2 * Math.PI;
};

MovingBlinkyDancer.prototype._modPosition = function() {
  this.top %= $('body').height();
  if (this.top < 0) {
    this.top += $('body').height();
  }

  this.left %= $('body').width();
  if (this.left < 0) {
    this.left += $('body').width();
  }
};

MovingBlinkyDancer.prototype.setPosition = function (top, left) {
  this.top = top;
  this.left = left;
  Dancer.prototype.setPosition.call(this, top, left);
};

MovingBlinkyDancer.prototype.step = function() {
  //move the dancer 20 pixels in its direction
  this.top -= Math.sin(this.direction) * 20;
  this.left += Math.cos(this.direction) * 20;
  this._modPosition();
  this.setPosition(this.top, this.left);

  BlinkyDancer.prototype.step.call(this);

  this.stepCount++;
  if (this.stepCount == 20) {
    this.setDirection();
    this.stepCount = 0;
  }
};
