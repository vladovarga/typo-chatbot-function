getTypos('alebo sa ani domov vracat nemusis alebo sa ani domov vracat nemusisalebo sa ani domov vracat nemusisalebo sa ani domov vracat nemusisalebo sa ani domov vracat nemusisalebo sa ani domov vracat nemusisalebo sa ani domov vracat nemusisalebo sa ani domov vracat nemusis');

function getTypos(aString) {
    const lVelkostTextu = aString.length;
    const lPravdepodobnostChyby = 0.03;   // percentage of possible typos that will happen
    const lPocetChyb = Math.round(lVelkostTextu*lPravdepodobnostChyby);
    
    console.log("Pocet chyb bude: " + lPocetChyb);
  
    if (lPocetChyb == 0) {
      console.log("Sanca chyby je nulova - koncim.");
      return aString;
    }
    
    //http://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
    
    String.prototype.replaceAt=function(index, char) {
      return this.substr(0, index) + char + this.substr(index+char.length);
    }

    // define proximity arrays - based on a qwerty keyboard //

    var array_prox = [];
    array_prox['a'] = ['q', 'w', 'z', 'x'];
    array_prox['b'] = ['v', 'f', 'g', 'h', 'n'];
    array_prox['c'] = ['x', 's', 'd', 'f', 'v'];
    array_prox['d'] = ['x', 's', 'w', 'e', 'r', 'f', 'v', 'c'];
    array_prox['e'] = ['w', 's', 'd', 'f', 'r'];
    array_prox['f'] = ['c', 'd', 'e', 'r', 't', 'g', 'b', 'v'];
    array_prox['g'] = ['r', 'f', 'v', 't', 'b', 'y', 'h', 'n'];
    array_prox['h'] = ['b', 'g', 't', 'y', 'u', 'j', 'm', 'n'];
    array_prox['i'] = ['u', 'j', 'k', 'l', 'o'];
    array_prox['j'] = ['n', 'h', 'y', 'u', 'i', 'k', 'm'];
    array_prox['k'] = ['u', 'j', 'm', 'l', 'o'];
    array_prox['l'] = ['p', 'o', 'i', 'k', 'm'];
    array_prox['m'] = ['n', 'h', 'j', 'k', 'l'];
    array_prox['n'] = ['b', 'g', 'h', 'j', 'm'];
    array_prox['o'] = ['i', 'k', 'l', 'p'];
    array_prox['p'] = ['o', 'l'];
    array_prox['r'] = ['e', 'd', 'f', 'g', 't'];
    array_prox['s'] = ['q', 'w', 'e', 'z', 'x', 'c'];
    array_prox['t'] = ['r', 'f', 'g', 'h', 'y'];
    array_prox['u'] = ['y', 'h', 'j', 'k', 'i'];
    array_prox['v'] = ['', 'c', 'd', 'f', 'g', 'b'];    
    array_prox['w'] = ['q', 'a', 's', 'd', 'e'];
    array_prox['x'] = ['z', 'a', 's', 'd', 'c'];
    array_prox['y'] = ['t', 'g', 'h', 'j', 'u'];
    array_prox['z'] = ['x', 's', 'a'];
    array_prox['1'] = ['q', 'w'];
    array_prox['2'] = ['q', 'w', 'e'];
    array_prox['3'] = ['w', 'e', 'r'];
    array_prox['4'] = ['e', 'r', 't'];
    array_prox['5'] = ['r', 't', 'y'];
    array_prox['6'] = ['t', 'y', 'u'];
    array_prox['7'] = ['y', 'u', 'i'];
    array_prox['8'] = ['u', 'i', 'o'];
    array_prox['9'] = ['i', 'o', 'p'];
    array_prox['0'] = ['o', 'p'];

    var lResult = aString;
    var lZamenenePozicie = [];
  
    // vyrobim presny pocet chyb //
    for (var i=0; i<lPocetChyb; i++) {
      // pripravim si random index na ktorom budem zamienat //
      var lIndexZameny = Math.floor((Math.random() * lVelkostTextu) + 1);
      console.log("lIndexZameny: " + lIndexZameny);   
      
      if (lZamenenePozicie[lIndexZameny] == true) {
        console.log("Toto pismeno som uz zamienal.");
        continue;
      }
        
      // pripravim si pole moznych preklepov //
      var lMoznePreklepy = array_prox[lResult.charAt(lIndexZameny)];
      console.log("lMoznePreklepy: " + lMoznePreklepy);
      
      if (!lMoznePreklepy) {
        console.log("Preskakujem lebo nemam definovane preklepy pre: " + lResult.charAt(lIndexZameny));
        continue;
      }
      // vyberiem z toho pola random jedno pismeno //
      var lPreklep = lMoznePreklepy[Math.floor(Math.random()*lMoznePreklepy.length)];
      
      console.log("Zamienam '" + lResult.charAt(lIndexZameny) + "' za '" + lPreklep + "'");
      
      // zaemin pismeno za preklep //
      lResult = lResult.replaceAt(lIndexZameny, lPreklep);
      
      lZamenenePozicie[lIndexZameny] = true;
       
    }
    console.log("lZamenenePozicie: " + lZamenenePozicie);

    return lResult;
}  