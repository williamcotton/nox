/*

Book Of Spells
--------------

An incarnation spell breathes new life in to a nox.

*/

define(['lib/template_loader','lib/single_finger', 'spells/poedoe', 'spells/photo'], function(TemplateLoader, SingleFinger, PoeDoe, Photo) {
  
  var Spells = {
    poedoe: PoeDoe,
    photo: Photo
  };
  
  var simpleSpell = function(element) {
    return {
      templateId: element.className,
      width: 312,
      height: 212
    };
  };
  
  var currentMenu;
  
  var hasCurrentMenuAsParent = function(element) {
    while (element.parentElement) {
      if (element == currentMenu) {
        return true;
      }
      element = element.parentElement;
    }
    return false;
  }
  
  var checkForMenu = function(element) {
    if (!hasCurrentMenuAsParent(element)) {
      var submenus = document.querySelectorAll(".book_of_spells ul li ul");
      for (var i = 0; i < submenus.length; i++) {
        submenus[i].classList.remove("selected");
      }
      if (!element.classList.contains("book_of_spells")) {
        currentMenu = element;
        var submenu = element.querySelectorAll("ul")[0];
        if (submenu) {
          submenu.classList.add("selected");
        } 
      } 
    }
  };
  
  var BookOfSpells = {
    
    templateId: "book_of_spells",
    
    init: function(nox) {
      SingleFinger.liftedUpOn(nox.element, {
        whenLiftedUpInside: function(element, x, y) {
          if (element.className == "book_of_spells") {
            nox.unsummon();
          }
          else {
            nox.become(Spells[element.className] || simpleSpell(element));
          }
        },
        whenMovedInsideOf: function(element) {
          checkForMenu(element);
        },
        whenLiftedUpOutside: function(element) {
          nox.unsummon();
        }
      });
    }
    
  };
  
  return BookOfSpells;
  
});