require.config({
  baseUrl: 'js',
  urlArgs: "bust=" + (new Date()).getTime()
});

QUnit.config.autostart = false;
 
require([
  'tests/nox',
  'tests/summoner',
  'tests/draggable',
  'tests/template_loader'
  ], function(){
    QUnit.start(); //Tests loaded, run tests
});