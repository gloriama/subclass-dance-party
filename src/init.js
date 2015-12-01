$(document).ready(function() {
  window.dancers = [];

  $(".addDancerButton").on("click", function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 900 + 100
    );
    dancer.$node.on("mouseover", function(event) {
      dancer.stopMoving();
    });
    /*
    dancer.$node.on("mouseout", function(event) {
      dancer.startMoving();
    });
    */
    $('body').append(dancer.$node);
    window.dancers.push(dancer);
  });

  $(".lineUpButton").on("click", function(event) {
    var separation = $("body").width() / (window.dancers.length + 1);
    for (var i = 0; i < window.dancers.length; i++) {
      window.dancers[i].lineUp($("body").height() / 2, separation * (i + 1));
    }    
  });

  //periodically check dancers' positions and run their collision behavior
  var runCollisionHandler = function () {
    for(var i = 0; i < window.dancers.length; i++) {
      for (var j = i; j < window.dancers.length; j++) {
        if (i === j) {
          continue;
        }

        var d1 = window.dancers[i];
        var d2 = window.dancers[j];
        var d1Center = { x: d1.left + d1.size,
                         y: d1.top + d1.size };
        var d2Center = { x: d2.left + d2.size,
                         y: d2.top + d2.size };
        var distance = Math.pow(Math.pow(d1Center.x - d2Center.x, 2) +
                                Math.pow(d1Center.y - d2Center.y, 2),
                                .5);
        if (distance < d1.size + d2.size) {
          console.log("collision occurred");
          d1.handleCollision();
          d2.handleCollision();
        }
      }
    }
  };
  setInterval(runCollisionHandler, 50);

});

