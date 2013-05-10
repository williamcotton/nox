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
      this.element = this.createElementFromTemplate();
      this.centerX = options.x;
      this.centerY = options.y;
      this.resetCenter();
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
    
    become: function(object) {
      this.essence = object;
      this.essence.summonInto(this);
      this.resetCenter();
    },
    
    resetCenter: function() {
      this.setElementCoordinates(this.centerX - this.element.offsetWidth/2, this.centerY - this.element.offsetHeight/2);
    },
    
    setElementCoordinates: function(newX, newY) {
      this.element.style.left = newX + "px";
      this.element.style.top = newY + "px";
    },
    
    summoned: function() {
      this.essence.afterSummonedBy(this);
    },
    
    unsummon: function() {
      this.element.classList.remove("summoned");
      this.element.classList.add("unsummoned");
      var element = this.element;
      setTimeout(function() {
        element.parentNode.removeChild(element);
      }, 150);
    },
    
    createEventListeners: function() {
      new Draggable({ element: this.element });
    }
    
  };
  
  return Nox;
  
});