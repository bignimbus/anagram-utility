//http://www.dictionaryapi.com/api/v1/references/collegiate/xml/hypocrite?key=b15ed460-7f45-4ac2-ae2f-f34adaaa6c1e&format=xml&word=hello
// field "entry"
// if it exists, it's a word.  If not, it's not.

Array.prototype.crossOut = function ( usedLetter ) {
    'use strict';
    var filtered = 0,
    adjustedArray = this.filter( function ( letter ) {
        if ( letter !== usedLetter) {
            return letter;
        } else if ( filtered > 0 ) {
            return letter;
        } else {
            filtered += 1;
            return false;
        }
    });
    return adjustedArray;
};

function Anagram () {
    'use strict';
    var el = document.getElementById( 'shuffle' ),
    out = document.getElementById( 'scratchpad' );
    return {
        letters: el.value.replace( /[^a-z]/gmi, '').toLowerCase().split(''),
        input: el,
        output: out,
        rearranged: ''
    };
}

Anagram.prototype.randomEntry = function ( maxLength ) {
    'use strict';
    var random, entry, n;
    for ( n = 0; n < 200; n++ ) {
        random= Math.floor( Math.random() * window.realWords.length );
        entry = window.realWords[random];
        if ( entry.length <= maxLength ) {
            return entry;
        }
    }
    return 'a';
};

Anagram.prototype.makeWord = function ( realWord, letters ) {
    // returns false if you can't make this word
    // out of the letters available
    // otherwise, returns array of the letters that remains
    // the rearrange() function infers the word from the
    // argument it sent
    'use strict';
    var scratch = letters;
    for ( var n in realWord ) {
        for ( var i in scratch ) {
            if ( realWord[n] === scratch[i] ) {
                scratch = scratch.crossOut( scratch[i] );
                break;
            }
        }
        if ( letters.length - scratch.length === realWord.length ) {
            return scratch;
        }
    }
    return false;
};

Anagram.prototype.solve = function () {
    'use strict';
    var dictionaryEntry, lettersLeft;
    dictionaryEntry = this.randomEntry( this.letters.length );
    lettersLeft = this.makeWord( dictionaryEntry, this.letters );
    if ( !!lettersLeft ) {
        this.letters = lettersLeft;
        this.input.value = this.letters;
        this.rearranged += dictionaryEntry.join('') + ' ';
        this.output.value = this.rearranged;
        this.count = -1;
    }
    lettersLeft = null;
    dictionaryEntry = null;
    if ( this.count > 15000 ) {
        this.rearranged += '(' + this.letters.join('') + ')';
        this.output.value = this.rearranged;
        this.letters = [];
    }
    this.count += 1;
    if ( this.letters.length === 0 ) {
        clearInterval( window.timer );
        alert( 'anagram solved! ');
    }
}

Anagram.prototype.initialize = function () {
    // TODO
    // repeat timer
    'use strict';
    var anagram = new Anagram();
    anagram.count = 0;
    anagram.input.value = anagram.letters;
    window.timer = setInterval( solve, 5);
};

function reset () {
    'use strict';
    if ( window.timer ) clearInterval( window.timer );
    var el = document.getElementById( 'shuffle' );
    el.value = "Cry, foe!  Run amok!  Fa awry!  My wand won\'t tolerate this nonsense.";
}

function clear () {
    'use strict';
    if ( window.timer ) clearInterval( window.timer );
    var el = document.getElementById( 'scratchpad' );
    el.value = ' ';
}