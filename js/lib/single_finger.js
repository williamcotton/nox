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
      
      // What do we do whenFirstHeldute after we've held down our finger long enough?
      this.whenFirstHeld = options.whenFirstHeld;
      
      // What do we do whenFirstHeld?
      this.whenHeldLongEnoughAtPosition = options.whenHeldLongEnoughAtPosition;
      
      // What do we do when we've removed our finger and canceled?
      this.orWhenRemovedAndCanceled = options.orWhenRemovedAndCanceled;
      
      
      var touchTimeout;
      
      var that = this;
      
      var onTouchTime = function onTouchTime(event) {
        
        var x = event.touches[0].clientX;
        var y = event.touches[0].clientY;
        
        var position = {x:x, y:y};
        
        that.whenFirstHeld(position);
        
        var onorWhenRemovedAndCanceled = function onorWhenRemovedAndCanceled(event) {
          that.orWhenRemovedAndCanceled();
        };
        
        var orWhenRemovedAndCanceledTimeout = setTimeout(function timeoutFunc() {
          that.whenHeldLongEnoughAtPosition();
          onorWhenRemovedAndCanceled = function() {};
        }, (that.forTimeInSeconds*1000)-50);
        
        clearTouchTimer(event);
        
        var clearorWhenRemovedAndCanceledTimer = function(event) {
          onorWhenRemovedAndCanceled();
          clearTimeout(orWhenRemovedAndCanceledTimeout);
          that.element.removeEventListener("touchend", clearorWhenRemovedAndCanceledTimer);
          that.element.removeEventListener("touchmove", clearorWhenRemovedAndCanceledTimer);
        };
        
        that.element.addEventListener("touchend", clearorWhenRemovedAndCanceledTimer);
        that.element.addEventListener("touchmove", clearorWhenRemovedAndCanceledTimer);
        
      };
      
      that.element.addEventListener("touchstart", function(event) {
        
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
        that.element.removeEventListener("touchend", clearTouchTimer);
        that.element.removeEventListener("touchmove", clearTouchTimer);
        clearTimeout(touchTimeout);
        event.preventDefault();
      };
      
      that.element.addEventListener("touchend", clearTouchTimer);
      that.element.addEventListener("touchmove", clearTouchTimer);
    },
    
    liftedUpOn: function(element, options) {
      
      var whenLiftedUpOutside = options.whenLiftedUpOutside;
      var whenLiftedUpInside = options.whenLiftedUpInside;
      
      var pageX, pageY, screenX, screenY;
      
      function docuTouchMove(event) {
        
        pageX = event.pageX;
        pageY = event.pageY;
        
        //pageX = event.pageX || event.originalEvent.pageX || event.originalEvent.touches[0].pageX;
        //pageY = event.pageY || event.originalEvent.pageY || event.originalEvent.touches[0].pageY;
        
        if (pageX === 0) { // temp hack for bug in Chrome for Android
          console.log(event);
          screenX = event.touches[0].screenX;
          screenY = event.touches[0].screenY;
        }
        
      }
      
      document.addEventListener("touchmove", docuTouchMove);
      
      document.addEventListener("touchend", function docuTouchEnd(event) {
        // if (!pageX) {
        //   document.removeEventListener("touchend", docuTouchEnd);
        //   document.removeEventListener("touchmove", docuTouchMove);
        //   return;
        // }
      
        if (screenX) { // temp hack for bug in Chrome for Android
          e = document.elementFromPoint(screenX, screenY);
        }
        else {
          e = document.elementFromPoint(pageX, pageY);
        }
        
        function isDescendant(parent, child) {
          var node = child.parentNode;
          while (node != null) {
            if (node == parent) {
              return true;
            }
            node = node.parentNode;
          }
          return false;
        }
        
        document.removeEventListener("touchend", docuTouchEnd);
        
        if (isDescendant(element, e)) {
          whenLiftedUpInside(e)
        }
        else {
          whenLiftedUpOutside(e);
        }
        
        //document.removeEventListener("touchend", docuTouchMove);
        
        
      });
    }
    
  };
  
  return SingleFinger;
  
});