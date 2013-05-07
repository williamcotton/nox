define([], function() {
  
  var TouchSim = {
    
    start: function(x, y) {
      console.log("simulating touchstart");      
      this.fire(document, "touchstart", 0, x, y);
    }, 
    
    move: function(x, y) {
      console.log("simulating touchmove");      
      this.fire(document, "touchmove", 0, x, y);
    },
    
    end: function(x, y) {
      console.log("simulating touchend");      
      this.fire(document, "touchend", 0, x, y);
    },
    
    fire: function (element, type, identifier, x, y) {
      var touch = document.createTouch(window, element, identifier, x, y, x, y, x, y);

      var touches = document.createTouchList(touch);
      var targetTouches = document.createTouchList(touch);
      var changedTouches = document.createTouchList(touch);

      var event = document.createEvent("TouchEvent");
      event.initTouchEvent(type, true, true, window, null, x, y, x, y, false, false, false, false,
      touches, targetTouches, changedTouches, 1, 0);
      element.dispatchEvent(event);
    }
    
  };
  
  return TouchSim;
  
});