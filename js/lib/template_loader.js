/*

Template Loader
---------------

Loads Mustache templates.

*/

define(['lib/mustache'], function(Mustache) {
  
  var TemplateLoader = {
    
    load: function(options) {
      var templateId = options.templateId;
      var data = options.data;
      var _e = document.getElementById(templateId);
      if (!_e) return;
      var template = _e.innerHTML;
      var html = Mustache.to_html(template, data);
      var element = document.createElement("div");
      element.innerHTML = html;
      return element;
    },
  
    loadAndAppend: function(options) {
      var parentElement = options.appendTo;
      var element = this.load(options);
      parentElement.appendChild(element);
      return element;
    }
    
  };
  
  return TemplateLoader;
  
});