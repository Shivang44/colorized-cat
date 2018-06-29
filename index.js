#!/usr/bin/env node

// Imports
const Prism = require('prismjs');
const fs = require('fs');
const Chalk = require('chalk');

// Parses User input file and options, if any
// TODO: Determine possible options and parse them into options
const parseUserInput = function () {
	const filePath = process.argv[2];
	return {
		file_path: filePath,
		options: {}
	};
}

// Reads the file provided and returns the code in a string
const readFile = function (filePath) {
	const code = fs.readFileSync(filePath, 'utf-8'); // TODO: Deal with different file encodings
	return code;
}

// Tokenize code and determine its syntatical meaning
const tokenize = function (code) {
	const tokens = Prism.tokenize(code, Prism.languages.javascript);
	return tokens;
}


const colorizeCode = function (code, tokens) {
	const colorMap = {
		'string': Chalk.magenta,
		'keyword': Chalk.blue,
		'operator': Chalk.yellow,
		'comment': Chalk.italic.yellowBright
	};

	let colorizedCode = '';

	tokens.forEach((token) => {
		if (token !== null && typeof token === 'object' && colorMap.hasOwnProperty(token.type)) {
			colorizedCode += colorMap[token.type](token.content);
		} else {
			colorizedCode += typeof token == 'object' ? token.content : token;
		}
	});

	return colorizedCode; 
}


// Prints to STDOUT the colorized code
const printColorizedCode = function (colorizedCode) {
	console.log(colorizedCode);
}	



const userInput = parseUserInput();
const code = readFile(userInput.file_path);
const tokens = tokenize(code);
const colorizedCode = colorizeCode(code, tokens);
printColorizedCode(colorizedCode);
