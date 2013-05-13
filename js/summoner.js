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
  
  // A single finger held down on the the "nidonox"
  // for 0.25 seconds, will summon a Nox and instruct it to become
  // a Book of Spells
  SingleFinger.heldDownOn(document.getElementById("nidonox"), {
    forTimeInSeconds: 0.25,
    whenFirstHeld: function(position) {
      // when a finger is first held down, it'll create the nox and make it a Book of Spells
      this.nox = new Nox(position);
      this.nox.become(BookOfSpells);
    },
    orWhenRemovedAndCanceled: function() {
      // but if they remove their finger, we get rid of the nox
      this.nox.unsummon();
    }
  });
  
});