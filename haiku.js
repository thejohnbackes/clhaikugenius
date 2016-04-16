'use strict';

const fs = require('fs');
const dictionary = './cmudict.txt';


exports.createHaiku = createHaiku;
exports.haikuDictionary = function(structure, callback) {
	fs.readFile(dictionary,'utf8',(err, data) => {
		if(err) throw err;
		let syllablesArr = Array.from(processDict(data));
		callback(structure, syllablesArr);
	})
}

exports.dictionary = dictionary;
exports.readDict = readDict;




//Haiku Creation functions

function createHaiku( structure, callback, syllablesArr ){
	//console.log(syllablesArr[1]);
	if( !syllablesArr ) {
		fs.readFile(arguments[2] || dictionary,'utf8',(err, data) => {
			if(err) throw err;
			let syllablesArr = Array.from( processDict(data) );
			callback( convertHaiku2( structure, syllablesArr ));
		});
	} else {
		callback( convertHaiku2( structure, syllablesArr ));
	}
}

//=> takes a structure such as [ [5],[7],[5] ] and returns a Haiku array, an array of 3 Lines of pattern: structure

function makeLine(lineStruct, syllablesArr) {
	let lineArray = lineStruct.slice();
	
	return lineArray.reduce(function(prev, curr){
		return prev.concat(pickWord(curr, syllablesArr));
	},[]);
}
//=> returns a lineArray of m words, where m=lineStruct.length

function pickWord(syls, syllablesArr) {
	if(!syllablesArr[syls]) console.error("error: no words of length " + syls + " in database.");
	let q = syllablesArr[syls].length;
	let p = Math.floor((Math.random() * q));
	return syllablesArr[syls][p].toString().toLowerCase();
}
//=> random word of (syls) syllables from the syllable Array (syllablesArr)

function convertHaiku(haikuArray){
	return	('\n' + 
			haikuArray[0].join(" ") + '\n' + 
			haikuArray[1].join(" ") + '\n' + 
			haikuArray[2].join(" ") + '.').replace(/([a-z])/,function(char){return char.toUpperCase()}) + '\n';
}
//=> takes a haikuArray and converts it to a formatted string.

function convertHaiku2( structure, syllablesArr ) {
	//console.log( structure, syllablesArr[5] );
	return	('\n' + 
			makeLine( structure[ 0 ], syllablesArr ).join( " " ) + '\n' + 
			makeLine( structure[ 1 ], syllablesArr ).join( " " ) + '\n' + 
			makeLine( structure[ 2 ], syllablesArr ).join( " " ) + '.').replace( /([a-z])/ , function( char ){ return char.toUpperCase() }) + '\n' ;
}
//=> takes a haikuArray and converts it to a formatted string.


// ==== PARSING THE PRONUNCIATION DICTIONARY FOR USE IN THE HAIKU MAKER ==== //


const syllableSearch = /\d/g;
//=> regex that returns the voiced phonemes (syllables) in each word. syllableSearch.length is the number of syllables

function readDict( dict, myCallback ) {
	fs.readFile( dict || dictionary, 'utf8' ,( err, data ) => {
		if(err) throw err;
		let syllablesArr = Array.from( processDict( data ) );
		myCallback( null, syllablesArr );
	})
}

function processDict(cmuDict){
	return cmuDict.split('\n').reduce(function(syllablesArr, currentLine){
		//console.log(currentLine.substring(0,1).match(/[A-Z]/));
		let syllableCount = currentLine.match(syllableSearch) == null ? 0 : currentLine.match(syllableSearch).length;
		return syllableCount > 0 && syllableCount <=7 ? pushWord(syllablesArr, syllableCount, currentLine.match(/\w+/)[0]) : syllablesArr;
	},[]);
}
//=> array of words by # of syllables


function pushWord(syllablesArr, sylCount, word) {
	let that = syllablesArr.slice();
	if(!that[sylCount]) that[sylCount] = [];
	that[sylCount].push(word);
	return that;
}
//=> pushes a word to the correct place in the syllable Array



//constructing Haikus, from https://repl.it/CFAL




