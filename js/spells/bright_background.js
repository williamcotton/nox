define([], function() {
  
  var BrightBackground = {
    
    incarnate: function(nox) {
      var hue = parseInt(Math.random()*360, 10);
      nox.element.style.backgroundColor = "hsla(" + hue + ", 100%, 50%, 0.9)";
    }
    
  };
  
  return BrightBackground;
  
});