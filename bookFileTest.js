'use strict';

// takes (err, bookFile, syllables Array, and options), 
// then emits a "Word List Processed" event with a filtered list array.
// if options.haikuStructure is a valid [5,7,5]-style array, bookListFromText will write a haiku to stdout.

const h = require( './haiku.js' );
const bl = require( './bookHaiku.js' );
let bookFile = {
	source: './bookshelf/frankenstein.txt',
	title: 'Frankenstein'
}

let bookListFromText = bl.bookListFromText;

h.readDict( h.dictionary, function(err, syllablesArr) {
	return bl.bookListFromText(null, bookFile, { haiku: { structure: [5, 7, 5] } }, syllablesArr);
});

