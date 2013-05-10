/*

Book Of Spells
--------------

An incarnation spell breathes new life in to a nox.

*/

define(['lib/template_loader','lib/single_finger'], function(TemplateLoader, SingleFinger) {
  
  var BookOfSpells = {
    
    summonInto: function(nox) {
      this.hostElement = nox.element;
      this.hostElement.classList.add("book_of_spells");
      this.createElementFromTemplate("book_of_spells");
    },
    
    afterSummonedBy: function(nox) {
      console.log("Book loaded");
      
      var that = this;
      SingleFinger.liftedUpOn(nox.element, {
        whenLiftedUpInside: function(element) {
          
          nox.element.classList.remove("book_of_spells");
          
          nox.element.classList.add(element.className);
          nox.element.innerHTML = "";
          
          if (element.className == "photo") {
            nox.element.style.zIndex = "-10";
          }
                  
          TemplateLoader.loadAndAppend({
            templateId: element.className + '_template',
            appendTo: nox.element
          });
          
        },
        whenLiftedUpOutside: function(element) {
          console.log(nox, "unsummon");
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