/*

Template Loader
---------------

Loads Mustache templates.

*/

define(['lib/mustache'], function(Mustache) {
  
  var TemplateLoader = {
  
    loadAndAppend: function(options) {
      var templateId = options.templateId;
      var parentElement = options.appendTo;
      var template = document.getElementById(templateId).innerHTML;
      var html = Mustache.to_html(template, {title: this.title});
      var element = document.createElement("div");
      element.innerHTML = html;
      parentElement.appendChild(element);
      return element;
    }
    
  };
  
  return TemplateLoader;
  
});