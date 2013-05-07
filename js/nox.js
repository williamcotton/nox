/*

Nox
---

A Nox is a box that lives on my screen.

*/

define(['lib/template_loader', 'lib/draggable'], function(TemplateLoader, Draggable) {
  
  var Nox = function NoxConstructor(options) {
    this.init(options);
  };
  
  Nox.prototype = {
    
    init: function(options) {
      this.title = options.title;
      this.element = this.createElementFromTemplate();
      this.setElementCoordinates(options.x - this.element.offsetWidth/2, options.y - this.element.offsetHeight/2);
      this.element.classList.add("summoned");
      this.createEventListeners();
    },
    
    createElementFromTemplate: function() {
      var element = TemplateLoader.loadAndAppend({
        templateId: 'nox_template',
        appendTo: document.getElementById("nidonox")
      });
      var noxElement = element.getElementsByClassName("nox")[0];
      return noxElement;
    },
    
    setElementCoordinates: function(newX, newY) {
      this.element.style.left = newX + "px";
      this.element.style.top = newY + "px";
    },
    
    unsummon: function() {
      this.element.classList.remove("summoned");
      this.element.classList.add("unsummoned");
    },
    
    createEventListeners: function() {
      new Draggable({ element: this.element });
    }
    
  };
  
  return Nox;
  
});