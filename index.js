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
		process.exit(1);
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
		"js": "javascript",
		"php": "php",
		"py": "python",
		"cs": "csharp",
		"c": "c",
		"hs": "haskell"
	};

	if (!languageMap.hasOwnProperty(file.lang_extension)) {
		console.log("Language not supported at this time. Please make a github issue.");
		process.exit(1);
	}

	const langExtension = languageMap[file.lang_extension];
	loadLang([langExtension]);

	const prismLang = Prism.languages[langExtension];
	return Prism.tokenize(file.code, prismLang);
}

const colorizeCode = function (tokens) {
	const colorMap = {
		'string': Chalk.magenta,
		'keyword': Chalk.blue,
		'operator': Chalk.yellow,
		'comment': Chalk.italic.yellowBright,
		'macro': Chalk.italic.yellowBright,
		'directive': Chalk.yellowBright,
		'#': Chalk.yellowBright,
		'key': Chalk.yellow
	};

	let colorizedCode = '';

	const colorize = function(token) {
		if (typeof token === 'object') {
			// Prism categorized it as a token of a specific type, so we may be able to color it

			if (Array.isArray(token.content)) {
				// Sometimes prism.js will give us tokens within tokens, we can use recursion to simplify this scenario
				token.content.forEach((token) => {
					colorize(token);
				});
			} else if (colorMap.hasOwnProperty(token.type)) {
				colorizedCode += colorMap[token.type](token.content);
			} else {
				colorizedCode += token.content;
			} 
		} else {
			// It's not a categorized token (a simple string), but we may still want to colorize it
			if (colorMap.hasOwnProperty(token)) {
				colorizedCode += colorMap[token](token);
			} else {
				colorizedCode += token;
			}
		}
	}

	tokens.forEach((token) => {
		colorize(token);
	});

	return colorizedCode; 
}


// Prints to STDOUT the colorized code
const printColorizedCode = function (colorizedCode) {
	console.log(colorizedCode);
}	



const userInput = parseUserInput();
const file = readFile(userInput.file_path);
const tokens = tokenize(file);
const colorizedCode = colorizeCode(tokens);
printColorizedCode(colorizedCode);
