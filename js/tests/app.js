/*

Tests
-----

*/
require.config({
  baseUrl: 'js',
  urlArgs: "bust=" + (new Date()).getTime()
});

QUnit.config.autostart = false;
 
require([
  'tests/nox',
  'tests/summoner',
  'tests/book_of_spells'
  ], function() {
    QUnit.start();
});