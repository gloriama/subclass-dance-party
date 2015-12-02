var MovingDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  //this.direction = undefined;
  this.stepCount = 0;
  this.setDirection();
  this.moving = true;
  this.setColor(ColoredBlinkyDancer.prototype._getRandomColor(), 'transparent');
  this.eater = true; 
};

MovingDancer.prototype = Object.create(Dancer.prototype);
MovingDancer.prototype.constructor = MovingDancer;

MovingDancer.prototype.setDirection = function() {
  this.direction = Math.random() * 2 * Math.PI;
};

//will modify position to keep it in window
//return val = whether or not it did need to adjust position
MovingDancer.prototype._modPosition = function() {
  var oldTop = this.top;
  var oldLeft = this.left;

  this.top %= $('body').height();
  if (this.top < 0) {
    this.top += $('body').height();
  }

  this.left %= $('body').width();
  if (this.left < 0) {
    this.left += $('body').width();
  }
  //console.log(oldTop, oldLeft, '-->', this.top, this.left,
  //  (this.top !== oldTop) || (this.left !== oldLeft));
  return (this.top !== oldTop) || (this.left !== oldLeft);
};

MovingDancer.prototype.step = function() {
  //move the dancer 20 pixels in its direction
  if (this.moving) {
    this.top -= Math.sin(this.direction) * 20;
    this.left += Math.cos(this.direction) * 20;
    var changed = this._modPosition(); //may modify position
    this.setPosition(this.top, this.left, changed);
    this.stepCount++;
    if (this.stepCount == 20) {
      this.setDirection();
      this.stepCount = 0;
    }
  }
  Dancer.prototype.step.call(this);
};

MovingDancer.prototype.lineUp = function(top, left) {
  this.moving = false;
  Dancer.prototype.lineUp.call(this, top, left);
};

MovingDancer.prototype.stopMoving = function () {
  this.moving = false;
};

MovingDancer.prototype.startMoving = function () {
  this.moving = true;
};

