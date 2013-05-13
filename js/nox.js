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
      
      this.element.offsetWidth; // force reflow
      
      var templateId = object.templateId;
      
      var width = object.width;
      var height = object.height;
      
      var x = object.x;
      var y = object.y;
      
      // this.centerX = x;
      // this.centerY = y;
      
      while (this.element.hasChildNodes()) {
          this.element.removeChild(this.element.lastChild);
      }
  
      this.element.className = "nox summoned";
      this.element.classList.add("becomming");
      var nox = this;
      setTimeout(function() {
        nox.element.classList.remove("becomming");
      }, 300);
      
      
      this.element.classList.add(templateId);
      
      TemplateLoader.loadAndAppend({
        templateId: templateId + '_template',
        appendTo: this.element
      });
      
      
      this.essence = object;

      if (width && height) {
        this.resetCenterWithWidthAndHeight(width,height);
      }
      else {
        this.resetCenter();
      }
      
      this.element.offsetWidth; // force reflow
    },
    
    resetCenter: function() {
      this.resetCenterWithWidthAndHeight(this.element.offsetWidth, this.element.offsetHeight);
    },
    
    
    resetCenterWithWidthAndHeight: function(width, height) {
      this.setElementCoordinates(this.centerX - width/2, this.centerY - height/2);
    },
    
    setElementCoordinates: function(newX, newY) {
      this.element.style.left = newX + "px";
      this.element.style.top = newY + "px";
    },
    
    summoned: function() {
      if (this.essence && this.essence.afterSummonedBy) {
        this.essence.afterSummonedBy(this);
      }
    },
    
    unsummon: function() {
      this.element.classList.remove("summoned");
      this.element.classList.add("unsummoned");
      var element = this.element;
      setTimeout(function noxRemoveChildTimeout() {
        element.parentNode.removeChild(element);
      }, 150);
    },
    
    createEventListeners: function() {
      new Draggable({ element: this.element });
    }
    
  };
  
  return Nox;
  
});