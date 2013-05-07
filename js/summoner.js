/*

The Summoner
------------

The Summoner brings Noxes in to existance by pulling them in from the deep blue void.

*/

define(['nox'], function(Nox, TouchSim) {
  
  var Summoner = function SummonerConstructor(options) {
    this.init(options);
  };
  
  Summoner.prototype = {
    
    init: function(options) {
      this.createEventListeners();
    },
    
    createEventListeners: function() {
      
      var touchTimeout;
      
      var that = this;
      
      var onTouchTime = function onTouchTime(event) {
        var x = event.touches[0].clientX;
        var y = event.touches[0].clientY;
        var nox = that.summonNox({x:x , y:y});
        
        var onUnsummon = function onUnsummon(event) {
          nox.unsummon();
        };
        
        var unsummonTimeout = setTimeout(function timeoutFunc() {
          onUnsummon = function() {};
        }, 200);
        
        clearTouchTimer(event);
        
        var clearUnsummonTimer = function(event) {
          onUnsummon();
          document.removeEventListener("touchend", clearUnsummonTimer);
          document.removeEventListener("touchmove", clearUnsummonTimer);
        };
        
        document.addEventListener("touchend", clearUnsummonTimer);
        document.addEventListener("touchmove", clearUnsummonTimer);
        
      };
      
      document.addEventListener("touchstart", function(event) {
        
        console.log("Summoner", "touchstart", event);
        
        if (event.touches.length == 1) {
          touchTimeout = setTimeout(function timeoutFunc() {
            onTouchTime(event);
          }, 50);
          event.preventDefault();
        }
        
      });
      
      var clearTouchTimer = function(event) {
        document.removeEventListener("touchend", clearTouchTimer);
        document.removeEventListener("touchmove", clearTouchTimer);
        clearTimeout(touchTimeout);
        event.preventDefault();
      };
      
      document.addEventListener("touchend", clearTouchTimer);
      document.addEventListener("touchmove", clearTouchTimer);
      
    },
    
    summonNox: function(options) {
      return new Nox(options);
    }
    
  };
  
  var TheSummoner = new Summoner();
  
  return TheSummoner;
  
});