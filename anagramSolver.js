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

function randomEntry ( maxLength ) {
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
}

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

function makeThisWord ( realWord, letters ) {
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
}

function rearrange () {
    // TODO
    // repeat timer
    'use strict';
    var dictionaryEntry, lettersLeft,
    anagram = new Anagram();
    anagram.count = 0;
    window.timer = setInterval( function () {
        dictionaryEntry = randomEntry( anagram.letters.length );
        lettersLeft = makeThisWord( dictionaryEntry, anagram.letters );
        if ( !!lettersLeft ) {
            anagram.letters = lettersLeft;
            anagram.rearranged += dictionaryEntry.join('') + ' ';
            anagram.output.value = anagram.rearranged;
            anagram.count = -1
        }
        lettersLeft = null;
        dictionaryEntry = null;
        if ( anagram.count > 15000 ) {
            anagram.rearranged += '(' + anagram.letters.join('') + ')';
            anagram.output.value = anagram.rearranged;
            anagram.letters = [];
        }
        anagram.count += 1;
        if ( anagram.letters.length === 0 ) {
            clearInterval( window.timer );
            alert( 'anagram solved! ');
        }
    }, 5);
}

function reset () {
    'use strict';
    if ( window.timer ) clearInterval( window.timer );
    var el = document.getElementById( 'shuffle' );
    el.value = 'Cry, foe!  Run amok!  Fa awry!  My wand won\'t tolerate this nonsense.';
}

function clear () {
    'use strict';
    if ( window.timer ) clearInterval( window.timer );
    var el = document.getElementById( 'scratchpad' );
    el.value = ' ';
}