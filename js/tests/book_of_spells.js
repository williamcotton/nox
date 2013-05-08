define(['nox','book_of_spells'], function(Nox, BookOfSpells) {
  
    module("Book Of Spells Tests");
  
    test("should create a default nox", function(){
        expect(1);
        
        var nox = new Nox({x:200, y:500});
        
        BookOfSpells.incarnate(nox); 
        
        ok( true, "Test passes");
        
        nox.unsummon();
        
    });
    
});