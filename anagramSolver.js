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
    var el = document.getElementById( 'shuffle' );
    return {
        letters: el.value.replace( /[^a-z]/gmi, '').toLowerCase().split(''),
        el: el,
        rearranged: ''
    };
}

function makeThisWord ( realWord, letters ) {
    'use strict';
    var scratch = letters;
    for ( var n in realWord ) {
        for ( var i in scratch ) {
            if ( realWord[n] === scratch[i] ) {
                scratch = scratch.crossOut( scratch[i] );
                break;
            } else {
                return false;
            }
        }
    }
    return scratch;
}

function rearrange () {
    // TODO
    // repeat timer
    'use strict';
    var dictionaryEntry, lettersLeft,
    anagram = new Anagram(),
    timer = setTimeout( function () {
        dictionaryEntry = randomEntry( anagram.letters.length );
        console.log('found a word');
        lettersLeft = makeThisWord( dictionaryEntry, anagram.letters );
        console.log('checking the word');
        if ( !!lettersLeft ) {
            anagram.letters = lettersLeft;
            anagram.rearranged += dictionaryEntry.join('') + ' ';
            console.log('********found a word: ' + anagram.rearranged);
        }
        lettersLeft = null;
        dictionaryEntry = null;
        if ( anagram.letters.length === 0 ) {
            clearTimeout( timer );
        }
        console.log('starting over');
    }, 500);
    anagram.el.value = anagram.rearranged;
}

function reset () {
    'use strict';
    var el = document.getElementById( 'shuffle' );
    el.value = 'Cry, foe!  Run amok!  Fa awry!  My wand won\'t tolerate this nonsense.';
}

function clear () {
    'use strict';
    var el = document.getElementById( 'scratchpad' );
    el.value = ' ';
}