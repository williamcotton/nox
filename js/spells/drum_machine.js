define([], function() {
  
  var DrumMachine = {
    
    templateId: 'drum_machine',
    
    width: 500,
    height: 400,
    
    loaded: function(nox) {
      
      nox.element.addEventListener("touchstart", function(event) {
        if (event.target.tagName == "LI") {
          event.target.classList.toggle("on");
          
          var lastE = event.target;
          
          var tm = function(event) {
            event.stopPropagation();
            event.preventDefault();
            var e = document.elementFromPoint(event.pageX, event.pageY);
            if (e.tagName == "LI") {
              if (e != lastE) {
                e.classList.toggle("on");
              }
              lastE = e;
            }
          }
          
          event.target.addEventListener("touchend", function(event) {
            event.target.removeEventListener("touchmove", tm);
          });
          
          event.target.addEventListener("touchmove", tm);
        }
      });
      
    }
    
  };
  
  return DrumMachine;
  
});