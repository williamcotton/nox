define([], function() {
  
  var PoeDoe = {
    
    //
    templateId: "poedoe",
    
    width: 312,
    height: 212,
    
    init: function(nox) {
      
      function reqListener () {
        console.log(this.responseText);
      };

      var oReq = new XMLHttpRequest();
      oReq.onload = reqListener;
      oReq.open("get", "http://www.poedoe.com/api/KlPLR2", true);
      oReq.send();
      
    }
    
  };
  
  return PoeDoe;
  
});