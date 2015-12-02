var ControlledDancer = function(top, left, timeBetweenSteps) {
  MovingDancer.call(this, top, left, timeBetweenSteps);
  this.moving = false;
  this.direction = 'right'; //notice this OVERRIDES the direction inherited from MovingDancer
  this.setColor(ColoredBlinkyDancer.prototype._getRandomColor(), 'right');
  this.eater = true;
};

ControlledDancer.prototype = Object.create(MovingDancer.prototype);
ControlledDancer.prototype.constructor = ControlledDancer;

ControlledDancer.prototype.setColor = function(color, direction) {
  this.color = color || '#f00';
  var styleSettings = {
    'border-top-color': this.color,
    'border-left-color': this.color,
    'border-bottom-color': this.color,
    'border-right-color': this.color  
  };

  var propertyName = 'border-' + direction + '-color';
  styleSettings[propertyName] = 'transparent';
  this.$node.css(styleSettings);
};

ControlledDancer.prototype.setPosition = function(top, left, noAnimate) {
  this.setColor(this.color, this.direction);
  MovingDancer.prototype.setPosition.call(this, top, left, noAnimate);
}