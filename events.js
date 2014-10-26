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