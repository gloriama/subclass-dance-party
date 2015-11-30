var ColoredBlinkyDancer = function (top, left, timeBetweenSteps) {
  BlinkyDancer.call(this, top, left, timeBetweenSteps);
  this.color = undefined; // || this.setRandomColor();
  this.setColor();
};

ColoredBlinkyDancer.prototype = Object.create(BlinkyDancer.prototype);
ColoredBlinkyDancer.prototype.constructor = ColoredBlinkyDancer;
ColoredBlinkyDancer.prototype._assignRandomColor = function () {
  // Generate a random hexidecimal string  
  this.color = '#';
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  for (var i = 0; i < 6; i++) {
    this.color += chars[Math.floor(Math.random() * 16)];
  }
  //console.log(this.color);
}
ColoredBlinkyDancer.prototype.setColor = function () {
  this._assignRandomColor();
  var styleSettings = {
    'border-color': this.color
  };
  this.$node.css(styleSettings);
}

ColoredBlinkyDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  BlinkyDancer.prototype.step.call(this);
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  this.setColor();
};