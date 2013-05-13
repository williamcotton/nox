/*

Draggable
---------

Makes an element draggable.

*/

define([], function() {
  
  var Draggable = function DraggableConstructor(options) {
    this.init(options);
  };
  
  Draggable.prototype = {
    
    init: function(options) {
      this.element = options.element;
      this.createEventListeners(this.element);
    },
    
    createEventListeners: function(element) {
      
      element.addEventListener("touchstart", function(event) {
        
        event.stopPropagation();
        
        var touchId = event.touches.length - 1;
        
        var selectStartEvent = function() { return false; };
        
        document.addEventListener("selectstart", selectStartEvent);
        
        var startX = event.touches[touchId].clientX;
        var startY = event.touches[touchId].clientY;

        var currentX = element.offsetLeft;
        var currentY = element.offsetTop;
        
        element.setAttribute("dragging", true);
        
        var touchMoveEvent = function(event) {

          event.preventDefault();
          
          if (element.getAttribute("dragging")) {
            
            if (!event.touches[touchId]) {
              return;
            }
            
            var moveX = event.touches[touchId].clientX;
            var moveY = event.touches[touchId].clientY;
            
            var dX = (moveX - startX);
            var dY = (moveY - startY);
            
            var newX = currentX + dX;
            var newY = currentY + dY;
            
            element.style.left = newX + "px";
            element.style.top = newY + "px";
            
          }
          
        };
        
        document.body.addEventListener("touchmove", touchMoveEvent);
        
        var touchEndEvent = function(event) {
          document.removeEventListener("selectstart", selectStartEvent);
          element.removeAttribute("dragging");
          document.body.removeEventListener("touchend", touchEndEvent);
          document.body.removeEventListener("touchmove", touchMoveEvent);
        };
        
        document.body.addEventListener("touchend", touchEndEvent);
        
      }, false);
    }
    
  };
  
  return Draggable;
  
});