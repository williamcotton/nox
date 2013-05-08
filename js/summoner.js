/*

The Summoner
------------

The Summoner brings Noxes in to existance by pulling them in from the deep blue void.

*/

define([
  'lib/single_finger',
  'nox',
  'book_of_spells'
  ], function(SingleFinger, Nox, BookOfSpells) {
  
  var Summoner = function SummonerConstructor(options) {
    this.init(options);
  };
  
  Summoner.prototype = {
    
    init: function(options) {
      this.createEventListeners();
    },
    
    createEventListeners: function() {
      var that = this;
      var nox;
      SingleFinger.heldDownOn(document, {
        forTimeInSeconds: 0.25,
        whenHeldLongEnough: function(event) {
          var x = event.touches[0].clientX;
          var y = event.touches[0].clientY;
          nox = that.summonNox({x:x, y:y});
        },
        orWhenRemovedAndCanceled: function() {
          that.unsummonNox(nox);
        }
      });
    },
    
    summonNox: function(options) {
      var nox = new Nox(options);
      BookOfSpells.incarnate(nox);
      return nox;
    },
    
    unsummonNox: function(nox) {
      nox.unsummon();
    }
    
  };
  
  var TheSummoner = new Summoner();
  
  return TheSummoner;
  
});