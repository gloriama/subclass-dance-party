var ColoredBlinkyDancer = function (top, left, timeBetweenSteps, color) {
  BlinkyDancer.call(this, top, left, timeBetweenSteps);
  this.color = color; // || this.setRandomColor();
  if (!this.color) {
    this.assignRandomColor();
  }
  this.setColor();
};

ColoredBlinkyDancer.prototype = Object.create(BlinkyDancer.prototype);
ColoredBlinkyDancer.prototype.constructor = ColoredBlinkyDancer;
ColoredBlinkyDancer.prototype.assignRandomColor = function () {
  // Generate a random hexidecimal string  
  this.color = '#';
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  for (var i = 0; i < 6; i++) {
    this.color += chars[Math.floor(Math.random() * 16)];
  }
  console.log(this.color);
}
ColoredBlinkyDancer.prototype.setColor = function () {
  var styleSettings = {
    'border-color': this.color
  };
  this.$node.css(styleSettings);
}