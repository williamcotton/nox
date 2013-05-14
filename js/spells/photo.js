define([], function() {
  
  var Photo = {
    
    templateId: 'photo',
    
    width: 300,
    height: 300,
    
    init: function(nox) {
      nox.element.style.zIndex = "-10";
      setTimeout(function() {
        nox.unsummon();
      },200);
      
    }
    
  };
  
  return Photo;
  
});