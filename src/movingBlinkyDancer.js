var MovingBlinkyDancer = function(top, left, timeBetweenSteps) {
  BlinkyDancer.call(this, top, left, timeBetweenSteps);
  this.top = top;
  this.left = left;
  this.stepCount = 0;
  this.direction = undefined;
  this.setDirection();
};

MovingBlinkyDancer.prototype = Object.create(BlinkyDancer.prototype);
MovingBlinkyDancer.prototype.constructor = MovingBlinkyDancer;
MovingBlinkyDancer.prototype.setDirection = function() {
  this.direction = Math.random() * 2 * Math.PI;
};
MovingBlinkyDancer.prototype.step = function() {
  this.top = mod(this.top - Math.sin(this.direction) * 20, $("body").height());
  this.left = mod(this.left + Math.cos(this.direction) * 20, $("body").width());
  this.setPosition(this.top, this.left);
  BlinkyDancer.prototype.step.call(this);
  this.stepCount++;
  if (this.stepCount === 20) {
    this.setDirection();
    this.stepCount = 0;
  }
};

var mod = function(num, mod) {
  if (num < 0) {
    num = Math.abs(num);
    num = num % mod;
    return num ? mod - num : num;
  } else {
    return num % mod;
  }
}