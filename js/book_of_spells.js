/*

Book Of Spells
--------------

An incarnation spell breathes new life in to a nox.

*/

define(['lib/single_finger'], function(SingleFinger) {
  
  var BookOfSpells = {
    
    templateId: "book_of_spells",
    
    init: function(nox) {
      
      SingleFinger.liftedUpOn(nox.element, {
        whenLiftedUpInside: function(element, x, y) {
          if (element.className == "book_of_spells") {
            nox.unsummon();
          }
          if (element.className == "photo") {
            nox.element.style.zIndex = "-10";
            setTimeout(function() {
              nox.unsummon();
            },200);
          }
          nox.become({
            templateId:element.className,
            width: 312,
            height: 212,
            x: x,
            y: y
          });
        },
        whenLiftedUpOutside: function(element) {
          nox.unsummon();
        }
      });
      
    }
    
  };
  
  return BookOfSpells;
  
});