/*

Single Touch Hold
-----------------

Makes an element draggable.

*/

define([], function() {
  
  var SingleFinger = {
    
    heldDownOn: function(element, options) {
      
      // What element are we listening for a single finger being held down?
      this.element = element;
      
      // How long does a finger need to be held down?
      this.forTimeInSeconds = options.forTimeInSeconds;
      
      // What command do we whenHeldLongEnoughAtPositionute after we've held down our finger long enough?
      this.whenHeldLongEnoughAtPosition = options.whenHeldLongEnoughAtPosition;
      
      // What command do we call when we've removed our finger and canceled 
      this.orWhenRemovedAndCanceled = options.orWhenRemovedAndCanceled;
      
      
      var touchTimeout;
      
      var that = this;
      
      var onTouchTime = function onTouchTime(event) {
        
        var x = event.touches[0].clientX;
        var y = event.touches[0].clientY;
        
        var position = {x:x, y:y};
        
        that.whenHeldLongEnoughAtPosition(position);
        
        var onorWhenRemovedAndCanceled = function onorWhenRemovedAndCanceled(event) {
          that.orWhenRemovedAndCanceled();
        };
        
        var orWhenRemovedAndCanceledTimeout = setTimeout(function timeoutFunc() {
          onorWhenRemovedAndCanceled = function() {};
        }, (that.forTimeInSeconds*1000)-50);
        
        clearTouchTimer(event);
        
        var clearorWhenRemovedAndCanceledTimer = function(event) {
          onorWhenRemovedAndCanceled();
          that.element.removeEventListener("touchend", clearorWhenRemovedAndCanceledTimer);
          that.element.removeEventListener("touchmove", clearorWhenRemovedAndCanceledTimer);
        };
        
        that.element.addEventListener("touchend", clearorWhenRemovedAndCanceledTimer);
        that.element.addEventListener("touchmove", clearorWhenRemovedAndCanceledTimer);
        
      };
      
      that.element.addEventListener("touchstart", function(event) {
        
        if (event.touches.length == 1) {
          touchTimeout = setTimeout(function timeoutFunc() {
            onTouchTime(event);
          }, 50);
          event.preventDefault();
        }
        
      });
      
      var clearTouchTimer = function(event) {
        that.element.removeEventListener("touchend", clearTouchTimer);
        that.element.removeEventListener("touchmove", clearTouchTimer);
        clearTimeout(touchTimeout);
        event.preventDefault();
      };
      
      that.element.addEventListener("touchend", clearTouchTimer);
      that.element.addEventListener("touchmove", clearTouchTimer);
    }
    
  };
  
  return SingleFinger;
  
});