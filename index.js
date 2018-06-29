#!/usr/bin/env node

// Imports
const Prism = require('prismjs');
const fs = require('fs');

// Parses User input file and options, if any
// TODO: Determine possible options and parse them into options
const parseUserInput = function () {
	const fileName = process.argv[2];
	return {
		file_path: filePath,
		options: {}
	};
}

// Reads the file provided and returns the code in a string
const readFile = function (filePath) {
	const code = fs.readFileSync(fileName, 'utf-8'); // TODO: Deal with different file encodings
	return code;
}

// Tokenize code and determine its syntatical meaning
const tokenize = function (code) {
	const tokens = Prism.tokenize(code, Prism.languages.javascript);
	return tokens;
}

const colorizedCode = function (code, tokens) {}

const printColorizedCode = function (colorizedCode) {}



const userInput = parseUserInput();
const code = readFile(userInput.file_path);
const tokens = tokenize(code);
const colorizedCode = colorzeCode(code, tokens);
printColorizedCode(colorizedCode);
