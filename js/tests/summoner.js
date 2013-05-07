define(['summoner', 'tests/helpers/touchsim'], function(Summoner, TouchSim) {

    module("Summoner Tests");
    
    
    asyncTest("should not start to summon nox after 20ms touchend", function() {
      expect(1);
      
      TouchSim.start(500, 200);

      setTimeout(function() {
        TouchSim.end(500, 200);
        
        setTimeout(function() {
          ok(document.getElementsByClassName("nox").length === 0, "Nox was never created." );
          start();
        }, 10);

      }, 20);
      
    });
    
    
    asyncTest("should unsummon nox after 200ms touchend", function() {
      expect(1);
      
      TouchSim.start(500, 200);

      setTimeout(function() {
        TouchSim.end(500, 200);
        
        var nox = document.getElementsByClassName("nox")[0];

        setTimeout(function() {
          ok(nox.classList.contains("unsummoned"), "Nox has been unsummoned." );
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
          ok(nox.classList.contains("unsummoned"), "Nox has been unsummoned." );
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
        ok(nox.classList.contains("summoned"), "Nox has been summoned." );
        nox.parentNode.removeChild(nox);
        start();
      }, 800);
      
    });
    

    
});