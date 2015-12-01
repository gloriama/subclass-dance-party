// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps) {

  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"></span>');
  this.timeBetweenSteps = timeBetweenSteps;
  this.top = top;
  this.left = left;
  this.size = 10;
  this.color = '#f00';
  this.alive = true;
  this.step();
  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  this.setPosition(top, left, true);
};

Dancer.prototype.step = function() {
  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  //var that = this;
  //setTimeout(function () { that.step(); }, this.timeBetweenSteps);
  setTimeout(this.step.bind(this), this.timeBetweenSteps); //<--this should work? try again later
};

Dancer.prototype.setPosition = function(top, left, noAnimate) {
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  this.top = top;
  this.left = left;
  var styleSettings = {
    top: top,
    left: left
  };
  if (noAnimate) {
    this.$node.css(styleSettings);
  } else {
    this.$node.animate(styleSettings, this.timeBetweenSteps - 20);
      //minus 20ms for latency issues with animate
  }
};

Dancer.prototype.lineUp = function(top, left) {
  this.setPosition(top, left);
};

Dancer.prototype.stopMoving = function () {
  
};

Dancer.prototype.startMoving = function () {
  
};

Dancer.prototype.setColor = function (color) { //color = hexadecimal string
  this.color = color || '#f00';
  var styleSettings = {
    'border-color': this.color
  };
  this.$node.css(styleSettings);
};

Dancer.prototype.setSize = function (size) {
  this.size = Math.min(size, 50) || 10;
  var styleSettings = {
    'border-radius': '' + this.size + 'px',
    'border-width': '' + this.size + 'px'
  };
  this.$node.css(styleSettings);
}

Dancer.prototype.handleCollision = function (partner) { //partner = another Dancer instance
  // this.setColor('#000');
  if (partner.alive && this.alive) {
    if (this.size > partner.size) {
      partner.alive = false;
      this.setSize(this.size + partner.size);
      partner.size = 0;
    } else {
      this.alive = false;
      partner.setSize(this.size + partner.size);
      this.size = 0;
    }
  }
};