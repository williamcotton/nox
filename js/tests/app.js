require.config({
  baseUrl: 'js',
  urlArgs: "bust=" + (new Date()).getTime()
});

QUnit.config.autostart = false;
QUnit.config.reorder = false;

var __start = start;

var start = function() {
  console.log("start()");
  __start();
}
 
require([
  'tests/nox',
  'tests/summoner',
  'tests/draggable',
  'tests/template_loader'
  ], function(){
    QUnit.start(); //Tests loaded, run tests
});