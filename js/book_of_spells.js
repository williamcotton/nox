/*

Book Of Spells
--------------

An incarnation spell breathes new life in to a nox.

*/

define(['lib/template_loader','lib/single_finger'], function(TemplateLoader, SingleFinger) {
  
  var getStyle = function (className) {
    var style;
      var classes = document.styleSheets[0].rules || document.styleSheets[0].cssRules
      for(var x=0;x<classes.length;x++) {
          if(classes[x].selectorText==className) {
              style = (classes[x].cssText) ? classes[x].cssText : classes[x].style.cssText;
          }
      }
      return style;
  }
  
  var BookOfSpells = {
    
    summonInto: function(nox) {
      this.hostElement = nox.element;
      this.hostElement.classList.add("book_of_spells");
      this.createElementFromTemplate("book_of_spells");
    },
    
    afterSummonedBy: function(nox) {
      
      var that = this;
      SingleFinger.liftedUpOn(nox.element, {
        whenLiftedUpInside: function(element, x, y) {
          
          nox.element.offsetWidth; // force reflow
          
          if (element.className == "book_of_spells") {
            nox.unsummon();
          }
          
          nox.element.classList.remove("book_of_spells");
          nox.element.classList.add(element.className);
          nox.element.classList.add("becomming");
          setTimeout(function() {
            nox.element.classList.remove("becomming");
          }, 300);
          
        
          // nox.centerX = x;
          // nox.centerY = y;
          nox.resetCenterWithWidthAndHeight(312,212);
          
          while (nox.element.hasChildNodes()) {
              nox.element.removeChild(nox.element.lastChild);
          }
          
          if (element.className == "photo") {
            nox.element.style.zIndex = "-10";
          }
                  
          TemplateLoader.loadAndAppend({
            templateId: element.className + '_template',
            appendTo: nox.element
          });
          
          nox.element.offsetWidth; // force reflow
          
        },
        whenLiftedUpOutside: function(element) {
          nox.unsummon();
        }
      });
      
    },
    
    createElementFromTemplate: function(templateName) {
      TemplateLoader.loadAndAppend({
        templateId: templateName + '_template',
        appendTo: this.hostElement
      });
    }
    
  };
  
  return BookOfSpells;
  
});