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
    
  var nox;
  
  SingleFinger.heldDownOn(document, {
    forTimeInSeconds: 0.25,
    whenHeldLongEnoughAtPosition: function(position) {
      nox = new Nox(position);
      BookOfSpells.incarnate(nox);
    },
    orWhenRemovedAndCanceled: function() {
      nox.unsummon();
    }
  });
  
});