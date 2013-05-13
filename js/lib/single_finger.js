/*

Single Touch Hold
-----------------

Makes an element draggable.

*/

define([], function() {
  
  var SingleFinger = {
    
    heldDownOn: function(element, options) {
      
      // What element are we listening for a single finger being held down?
      
      // How long does a finger need to be held down?
      var forTimeInSeconds = options.forTimeInSeconds;
      
      // What do we do whenFirstHeldute after we've held down our finger long enough?
      var whenFirstHeld = options.whenFirstHeld;
      
      // What do we do whenFirstHeld?
      var whenHeldLongEnoughAtPosition = options.whenHeldLongEnoughAtPosition;
      
      // What do we do when we've removed our finger and canceled?
      var orWhenRemovedAndCanceled = options.orWhenRemovedAndCanceled;
      
      
      var touchTimeout;
      
      var onTouchTime = function onTouchTime(event) {
        
        var x = event.touches[0].clientX;
        var y = event.touches[0].clientY;
        
        var position = {x:x, y:y};
        
        whenFirstHeld(position);
        
        var onorWhenRemovedAndCanceled = function onorWhenRemovedAndCanceled(event) {
          orWhenRemovedAndCanceled();
        };
        
        var orWhenRemovedAndCanceledTimeout = setTimeout(function timeoutFunc() {
          whenHeldLongEnoughAtPosition();
          onorWhenRemovedAndCanceled = function() {};
        }, (forTimeInSeconds*1000)-50);
        
        clearTouchTimer(event);
        
        var clearorWhenRemovedAndCanceledTimer = function clearorWhenRemovedAndCanceledTimer(event) {
          onorWhenRemovedAndCanceled();
          clearTimeout(orWhenRemovedAndCanceledTimeout);
          element.removeEventListener("touchend", clearorWhenRemovedAndCanceledTimer);
          element.removeEventListener("touchmove", clearorWhenRemovedAndCanceledTimer);
        };
        
        element.addEventListener("touchend", clearorWhenRemovedAndCanceledTimer);
        element.addEventListener("touchmove", clearorWhenRemovedAndCanceledTimer);
        
      };
      
      element.addEventListener("touchstart", function touchStart(event) {
        
        if (event.target.nodeName == "INPUT") {
          return;
        }
        
        if (event.touches.length == 1) {
          touchTimeout = setTimeout(function timeoutFunc() {
            onTouchTime(event);
          }, 50);
          event.preventDefault();
        }
        
      });
      
      var clearTouchTimer = function(event) {
        element.removeEventListener("touchend", clearTouchTimer);
        element.removeEventListener("touchmove", clearTouchTimer);
        clearTimeout(touchTimeout);
        event.preventDefault();
      };
      
      element.addEventListener("touchend", clearTouchTimer);
      element.addEventListener("touchmove", clearTouchTimer);
    },
    
    liftedUpOn: function(element, options) {

      var whenLiftedUpOutside = options.whenLiftedUpOutside;
      var whenLiftedUpInside = options.whenLiftedUpInside;
      var whenMovedInsideOf = options.whenMovedInsideOf;
      var whenMovedOutsideOf = options.whenMovedOutsideOf;
      
      var x, y;
      
      function docuTouchMove(event) {
        
        x = event.pageX;
        y = event.pageY;
        
        if (x === 0) { // temp hack for bug in Chrome for Android
          x = event.touches[0].screenX;
          y = event.touches[0].screenY;
        }
        
        checkForTouchInside(x, y, whenMovedInsideOf, whenMovedOutsideOf);
        
      }
      
      document.addEventListener("touchmove", docuTouchMove);
      
      var checkForTouchInside = function(x, y, onInside, onOutside) {

        var e = document.elementFromPoint(x, y);
      
        var isDescendant = function (parent, child) {
          var node = child.parentNode;
          while (node !== null) {
            if (node == parent) {
              return true;
            }
            node = node.parentNode;
          }
          return false;
        };
      
        if (isDescendant(element, e)) {
          onInside(e, x, y);
        }
        else {
          if (onOutside) {
            onOutside(e, x, y);
          }
        }
        
      };
      
      document.addEventListener("touchend", function docuTouchEnd(event) {
        checkForTouchInside(x, y, whenLiftedUpInside, whenLiftedUpOutside);
        document.removeEventListener("touchend", docuTouchEnd);
      });
      
    }
    
  };
  
  return SingleFinger;
  
});