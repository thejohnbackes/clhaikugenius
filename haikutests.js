'use strict';

const h = require('./haiku.js');


h.createHaiku( [ [5],[4, 3],[2, 3] ], console.log);
h.createHaiku( [ [5],[7],[5] ], console.log);
h.createHaiku( [ [4, 1],[1, 1, 2, 3],[1, 1, 2, 1] ], console.log);
h.createHaiku( [ [5],[1, 1, 1, 1, 1, 1, 1],[5] ], console.log);
h.createHaiku( [ [2, 1, 2],[3, 1, 3],[2, 1, 2] ], console.log);
h.createHaiku( [ [1, 4],[1, 6],[1, 4] ], console.log);
h.createHaiku( [ [3, 2],[2, 3, 2],[2, 3] ], console.log);

console.log('\nTesting Book List To Haiku: \n');
const bookListFromText = require('./bookHaiku.js');

// takes (err, bookFile, syllables Array, and options), 
// then emits a "Word List Processed" event with a filtered list array.
// if options.haikuStructure is a valid [5,7,5]-style array, bookListFromText will write a haiku to stdout.

let bookFile = 'http://www.gutenberg.org/cache/epub/84/pg84.txt';

//h.readDict( dictionary, bookListFromText )


//tests

/*let testDict =
`ADJOINS  AH0 JH OY1 N Z
ADJOURN  AH0 JH ER1 N
ADJOURNED  AH0 JH ER1 N D
ADJOURNING  AH0 JH ER1 N IH0 NG
ADJOURNMENT  AH0 JH ER1 N M AH0 N T
ADJOURNS  AH0 JH ER1 N Z
ADJUDGE  AH0 JH AH1 JH
ADJUDGED  AH0 JH AH1 JH D
ADJUDICATE  AH0 JH UW1 D IH0 K EY2 T
ADJUDICATED  AH0 JH UW1 D AH0 K EY2 T IH0 D
ADJUDICATING  AH0 JH UW1 D IH0 K EY2 T IH0 NG
ADJUDICATION  AH0 JH UW2 D AH0 K EY1 SH AH0 N`

//console.log(convertToArray(testDict)[0]);
//=> ["ADJOINS  AH0 JH OY1 N Z"]

//console.log(processDict(testDict)[5]);
//=> ["ADJOINS", "ADJOURN", "ADJOURNED", "ADJOURNS" ... "ADJUDGED"] // length === 6

let syllablesArr = processDict(testDict);

console.log('picking a random word of 2 syllables:');
console.log(pickWord(2,syllablesArr));
console.log(pickWord(2,syllablesArr));
console.log(pickWord(2,syllablesArr));

console.log('picking a random word of 3 syllables:');
console.log(pickWord(3,syllablesArr));
console.log(pickWord(3,syllablesArr));
console.log(pickWord(3,syllablesArr));

console.log('making line arrays of 1, 2, and 3 words: (first test)');
console.log( makeLine( [5], syllablesArr ) );
console.log( makeLine( [2, 3], syllablesArr ) );
console.log( makeLine( [3, 2, 3], syllablesArr ) );

console.log('making lines of 1, 2, and 3 words: (second test)');
console.log( makeLine( [5], syllablesArr ) );
console.log( makeLine( [2, 3], syllablesArr ) );
console.log( makeLine( [3, 2, 3], syllablesArr ) );

console.log('constructing haiku:')
console.log( constructHaiku( [ [5],[2, 3, 2],[5] ] ) );
console.log( constructHaiku( [ [2, 3],[3, 2, 3],[3, 2] ] ) );

//=> should yield haiku array of standard form.

*/