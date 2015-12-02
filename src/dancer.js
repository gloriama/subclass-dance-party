// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps) {

  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"></span>');
  this.timeBetweenSteps = timeBetweenSteps;
  this.top = top;
  this.left = left;
  this.size = 20;
  this.color = '#f00';
  this.eater = false;
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
    'border-top-color': this.color,
    'border-left-color': this.color,
    'border-bottom-color': this.color,
    'border-right-color': this.color  
  };
  this.$node.css(styleSettings);
};

Dancer.prototype.setSize = function (size) {
  this.size = size === 0 ? 0 : Math.min(size, 400) || 20;
  var styleSettings = {
    'border-radius': '' + this.size + 'px',
    'border-width': '' + this.size + 'px'
  };
  this.$node.css(styleSettings);
}

Dancer.prototype.handleCollision = function (partner) { //partner = another Dancer instance
  // this.setColor('#000');

  //when colliding, the bigger one will increase slightly in size
  //the other will become size zero

  //but if both are a certain max size, then nothing happens
 
  var eat = function (eater, food) {
    eater.setSize(eater.size + food.size / 2);
    food.setSize(0);
    food.eater = false;
  }

  if (this.eater !== partner.eater) {
    this.eater ? eat(this, partner) : eat(partner, this);
  } else if (this.size === 400 && partner.size === 400) {
    return;
  } else if (this.size > partner.size) {
    eat(this, partner);
  } else {
    eat(partner, this);
  }
















/*


      if (this.size > partner.size) {
      this.setSize(this.size + partner.size / 2);
      partner.setSize(0);
    } else if (this.size !== 50 && partner.size !== 50) {
      partner.setSize(this.size / 2 + partner.size);
      this.setSize(0);
    }
    */
};