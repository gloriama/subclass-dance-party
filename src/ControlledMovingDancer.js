var ControlledMovingDancer = function(top, left, timeBetweenSteps) {
  this.maxSize = 300; // Must be defined so that the initial position gets set properly
  MovingDancer.call(this, top, left, timeBetweenSteps);
  this.direction = 'right'; //notice this OVERRIDES the direction inherited from MovingDancer
  this.setColor(this._getRandomColor(), 'right');
};

ControlledMovingDancer.prototype = Object.create(MovingDancer.prototype);
ControlledMovingDancer.prototype.constructor = ControlledMovingDancer;

ControlledMovingDancer.prototype.setColor = function(color, direction) {
  this.color = color || '#f00';
  var styleSettings = {
    'border-color': this.color
  };
  var propertyName = 'border-' + direction + '-color';
  styleSettings[propertyName] = 'transparent';
  this.$node.css(styleSettings);
};

ControlledMovingDancer.prototype.setPosition = function(top, left, noAnimate) {
  this.setColor(this.color, this.direction);
  MovingDancer.prototype.setPosition.call(this, top, left, noAnimate);
};

ControlledMovingDancer.prototype.setSize = function(size) {
  Dancer.prototype.setSize.call(this, Math.min(size, this.maxSize));
};

ControlledMovingDancer.prototype.handleCollision = function(partner) {
  this.setSize(this.size + partner.size / 2);
  partner.setSize(0);
}
