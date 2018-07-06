#!/usr/bin/env node

// Imports
const Prism = require('prismjs');
const fs = require('fs');
const Chalk = require('chalk');
const loadLang = require('prismjs/components/index.js');

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
	let fileExtension = filePath.match(/(?:.*\/)*(?:.*\.)(.*)/);

	if (fileExtension == null) {
		console.log("File must have an extension (e.g. 'file.js' at this time)");
		return false;
	}

	// User extensions will vary (yml vs yaml) so this maps them to prism-recognized extensions
	const extensionMap = {
		'yml': 'yaml'
	};

	fileExtension = fileExtension[1].toLowerCase();

	if (extensionMap.hasOwnProperty(fileExtension)) {
		fileExtension = extensionMap[fileExtension];
	}

	const code = fs.readFileSync(filePath, 'utf-8'); // TODO: Deal with different file encodings

	return {
		code: code,
		lang_extension: fileExtension 
	}
}

// Tokenize code and determine its syntatical meaning
const tokenize = function (file) {
	const languageMap = {
		"yaml": "yaml",
		"js": "javascript"
	};

	const langExtension = file.lang_extension;
	loadLang([langExtension]);

	const prismLang = Prism.languages[languageMap[langExtension]];
	return Prism.tokenize(file.code, prismLang);
}

const colorizeCode = function (tokens) {
	const colorMap = {
		'string': Chalk.magenta,
		'keyword': Chalk.blue,
		'operator': Chalk.yellow,
		'comment': Chalk.italic.yellowBright,
		'key': Chalk.yellow
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
const file = readFile(userInput.file_path);
if (!file) {
	process.exit(1);
}
const tokens = tokenize(file);
const colorizedCode = colorizeCode(tokens);
printColorizedCode(colorizedCode);
