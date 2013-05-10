define(['summoner', 'tests/helpers/touchsim'], function(Summoner, TouchSim) {

    module("Summoner Tests", { 
      setup: function() {
        // var noxes = document.getElementsByClassName("nox");
        // for (var i = 0; i < noxes.length; i++) {
        //   var nox = noxes[i];
        //   nox.parentNode.removeChild(nox);
        // }
      },
      teardown: function() {
        // var noxes = document.getElementsByClassName("nox");
        // for (var i = 0; i < noxes.length; i++) {
        //   var nox = noxes[i];
        //   nox.parentNode.removeChild(nox);
        // }
      }
    });
    
    
    asyncTest("should not start to summon nox after 45ms touchend", function() {
      expect(1);
      
      TouchSim.start(500, 200);

      setTimeout(function() {
        TouchSim.end(500, 200);
        
        setTimeout(function() {
          ok(document.getElementsByClassName("nox").length === 0, "Nox was never created." );
          start();
        }, 100);

      }, 45);
      
    });
    
    
    asyncTest("should unsummon nox after 200ms touchend", function() {
      expect(1);
      
      TouchSim.start(500, 200);

      setTimeout(function() {
        TouchSim.end(500, 200);
        
        var nox = document.getElementsByClassName("nox")[0];

        setTimeout(function() {
          
          passes = false;
          if (nox && nox.classList && nox.classList.contains("unsummoned")) {
            passes = true;
          }
          
          ok(passes, "Nox has been unsummoned." );
          start();
        }, 100);

      }, 200);
      
    });
    
    
    asyncTest("should unsummon nox after 200ms touchmove", function() {
      expect(1);
      
      TouchSim.start(500, 200);

      setTimeout(function() {
        TouchSim.move(500, 200);
        
        var nox = document.getElementsByClassName("nox")[0];

        setTimeout(function() {
          passes = false;
          if (nox && nox.classList && nox.classList.contains("unsummoned")) {
            passes = true;
          }
          
          ok(passes, "Nox has been unsummoned." );
          start();
        }, 100);

      }, 200);
      
    });
    
    
    asyncTest("should remove nox DOM element if not created", function() {
      expect(1);
      
      TouchSim.start(500, 200);

      setTimeout(function() {
        TouchSim.end(500, 200);
        
        setTimeout(function() {
          ok(document.getElementsByClassName("nox").length === 0, "Nox DOM element has been removed." );
          start();
        }, 200);

      }, 200);
      
    });
    
    
    asyncTest("should create nox after 800ms touchend", function() {
      expect(1);
      
      TouchSim.start(500, 200);

      setTimeout(function() {
        TouchSim.end(500, 200);
        var nox = document.getElementsByClassName("nox")[0];
        passes = false;
        if (nox && nox.classList && nox.classList.contains("summoned")) {
          passes = true;
        }
        ok(passes, "Nox has been summoned." );
        if (nox) {
          nox.parentNode.removeChild(nox);
        }
        
        start();
      }, 800);
      
    });
    

    
});