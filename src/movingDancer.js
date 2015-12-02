var MovingDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.setColor(this._getRandomColor()); 
};

MovingDancer.prototype = Object.create(Dancer.prototype);
MovingDancer.prototype.constructor = MovingDancer;

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

MovingDancer.prototype.setPosition = function (top, left, noAnimate) {
  this.top = top;
  this.left = left;
  var changed = this._modPosition(); //may modify position
  Dancer.prototype.setPosition.call(this, this.top, this.left, changed || noAnimate);
}