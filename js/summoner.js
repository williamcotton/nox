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
  
  SingleFinger.heldDownOn(document.getElementById("nidonox"), {
    forTimeInSeconds: 0.25,
    whenFirstHeld: function(position) {
      nox = new Nox(position);
      nox.become(BookOfSpells);
    },
    whenHeldLongEnoughAtPosition: function() {
      nox.summoned();
    },
    orWhenRemovedAndCanceled: function() {
      nox.unsummon();
    }
  });
  
});