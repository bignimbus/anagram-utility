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
    var el = document.getElementById( 'shuffle' );
    return {
        letters: el.value.replace( /[^a-z]/gmi, '').toLowerCase().split(''),
        el: el,
        rearranged: ''
    };
}

function wordLength ( maxLength ) {
    'use strict';
    var random, lengths = [1, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 7, 8, 9];
    if ( maxLength < 9 ) {
        lengths = lengths.slice( 0, lengths.indexOf( maxLength ) + 1 );
    }
    random = Math.floor( Math.random() * lengths.length );
    return lengths[random];
}

function makeAWord ( letters, wordLength ) {
    'use strict';
    var letter, n, word = [],
    scratch = letters;
    for ( n = 0; n < wordLength; n++ ) {
        letter = scratch[Math.floor( Math.random() * letters.length )];
        word[n] = letter;
        scratch = letters.crossOut( letter );
    }
    if ( thisIsAWord( word ) ) {
        return {
            word: word,
            lettersLeft: scratch
        };
    } else {
        makeAWord( letters, wordLength );
    }
    return;
}

function matchLetters ( wordOne, wordTwo ) {
    'use strict';
    if ( wordOne.length !== wordTwo.length ) {
        return false;
    } else {
        for ( var n in wordOne ) {
            if ( wordOne[n] !== wordTwo[n] ) {
                return false;
            } else {
                continue;
            }
        }
        return true;
    }
}

function dictionaryEntry () {
    'use strict';
    var random = Math.floor( Math.random() * DictionaryEntry.length );
    return window.realWords[random];
}

function thisIsAWord ( word ) {
    'use strict';
    if ( matchLetters( word, new DictionaryEntry() ) ) {
        return true;
    } else {
        return false;
    }
}

function rearrange () {
    'use strict';
    var madeWord, anagram = new Anagram(), word = '';
    while ( anagram.letters.length > 0 ) {
        madeWord = makeAWord( anagram.letters, wordLength( anagram.letters.length ) );
        anagram.letters = madeWord.lettersLeft;
        anagram.rearranged += madeWord.word + ' ';
    }
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