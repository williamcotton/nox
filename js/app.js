require.config({
  baseUrl: 'js',
  urlArgs: "bust=" + (new Date()).getTime()
});

requirejs([], function () {
  require(["js/summoner.js"], 
  function(Summoner) {
    document.addEventListener("touchmove", function(event) {
      event.preventDefault();
    });
  });
});