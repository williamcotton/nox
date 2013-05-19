/*

Nox
---

A nox is an HTML DOM element that can be moved around the screen using a finger or a pointer.
It becomes something else by loading and morphing in to other HTML Templetes and by calling their initilization function.

A Nox is a box that lives on my screen.
  (it is Draggable, and uses a TemplateLoader to load HTML)

It can become something else.
  (it has a become function that looks for
    templateId: , - which connects it to an HTML template that is loaded by the nox
    width: , - which changes the width of the nox
    height: ,  - which changes the height of the nox
    init: function () {} - which is called on this other thing by the nox)
    
In HTML, it is a <div> with a class of "nox".

It has a few other classes associated with it: "summoned", "becoming", and "unsummoned". 
all reflecting transitional states of the visual presentation...
...elements popping into view, morphing into another, or shrinking back to the void.

There are a few helper functions related changes in width and height and how it affects the center position as 
Noxes have a coordinate system based on the center of the element, reflecting the touch and pointer based interface.

It's a view that manages other views...


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
      new Draggable({ element: this.element }); // This shouldn't be a constructor!
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
      
      var width = object.width + 12; // 12 = 6 width border * 2
      var height = object.height + 12;
      
      var x = object.x;
      var y = object.y;
      
      // this.centerX = x;
      // this.centerY = y;
      
      while (this.element.hasChildNodes()) {
          this.element.removeChild(this.element.lastChild);
      }
  
      this.element.className = "nox summoned";      
      
      this.element.classList.add(templateId);
      
      TemplateLoader.loadAndAppend({
        templateId: templateId + '_template',
        appendTo: this.element
      });

      if (width && height) {
        this.resetCenterWithWidthAndHeight(width,height);
      }
      else {
        this.resetCenter();
      }
      
      this.element.classList.add("becomming");
      var nox = this;
      setTimeout(function() {
        nox.element.classList.add("became");
        nox.element.classList.remove("becomming");
        if (object.loaded)
          object.loaded(nox);
      }, 300);
      
      if (object.init)
        object.init(this);
      
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
    
    unsummon: function() {
      this.element.classList.remove("summoned");
      this.element.classList.add("unsummoned");
      var element = this.element;
      setTimeout(function noxRemoveChildTimeout() {
        element.parentNode.removeChild(element);
      }, 150);
    }
    
  };
  
  return Nox;
  
});