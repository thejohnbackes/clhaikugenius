'use strict';

const readline = require('readline');
const fs = require('fs');
const emitter = require('events');
const h = require('./haiku.js');



// takes (err, bookFile, syllables Array, and options), 
// then emits a "Word List Processed" event with a filtered list array.
// if options.haikuStructure is a valid [5,7,5]-style array, WordList will emit a haiku.

class WordList extends emitter {}

const wordList = new WordList();

wordList.on( 'wordListProcessed', function( err, type, filteredSylArray, options ) {
	console.log('word List Processed.');
	if( err !== null ) throw err;
	if( options.haiku ) {
		let haikuStructure = options.haiku.structure || [ 5, 7, 5 ];
		console.log('emitting haiku... of structure ' + haikuStructure);
		let haikuCallback = options.haiku.callback || console.log;
		h.createHaiku( haikuStructure, haikuCallback, filteredSylArray )
	};
});


function bookListFromText ( err, bookFile, options, syllablesArr ) {
	if( !syllablesArr || syllablesArr === null ) throw "must provide valid syllable array";
	let wordArray = [];
	let rl = readline.createInterface({
		input: fs.createReadStream( bookFile.source )
	});
	
	rl.on( 'line' , ( line ) => {
		let cleanLineArray = line.toLowerCase().match( /\w+/g );
		wordArray = wordArray.concat(cleanLineArray);
	}).on( 'close' , () => {
		console.log('processing book file... ' + bookFile.title);
		let operations = 0;
		let wordSet = new Set( wordArray );
		let filteredSylArray = syllablesArr.reduce( function( prev, thisWordArray, index, array ) {
			console.log( (index+1)/array.length*100 + '% done...' )
			/*return !thisWordArray ? false : thisWordArray.filter( ( currentWord ) => {
					return [...wordSet].indexOf( currentWord ) > -1;
				}, []);*/
			let newArray = [];
			let compareArray = [...wordSet];
			if( !thisWordArray ) return prev;

			for(let i = 0; i<thisWordArray.length; i++ ) {
				let thisWord = thisWordArray[i].toLowerCase();
				for( let j = 0; j < compareArray.length; j++ ) {
					if (thisWord == compareArray[j]) {
						newArray.push(thisWord);
						break;
					}
				}
			}
			prev = prev.push( newArray );
			return prev;
		}, [] );
		console.log(filteredSylArray);
		wordList.emit( 'wordListProcessed', err, 'book', filteredSylArray, options );
	});
	
};

exports.bookListFromText = bookListFromText;
