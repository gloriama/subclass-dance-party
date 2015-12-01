var ColoredBlinkyDancer = function (top, left, timeBetweenSteps) {
  BlinkyDancer.call(this, top, left, timeBetweenSteps);
  this.setColor(this._getRandomColor());
  this.changeColor = false;
};

ColoredBlinkyDancer.prototype = Object.create(BlinkyDancer.prototype);
ColoredBlinkyDancer.prototype.constructor = ColoredBlinkyDancer;
ColoredBlinkyDancer.prototype._getRandomColor = function () {
  // Generate a random hexidecimal string  
  var output = '#';
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  for (var i = 0; i < 6; i++) {
    output += chars[Math.floor(Math.random() * 16)];
  }
  return output;
}

ColoredBlinkyDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  BlinkyDancer.prototype.step.call(this);
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  if (this.changeColor) {
    this.setColor(this._getRandomColor());
  }
  this.changeColor = !this.changeColor;
};