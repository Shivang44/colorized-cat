# Colorized Cat
Turn those boring cat outputs:

![uncolorized cat output](https://i.imgur.com/KxVeSKd.png)

...into colorized (syntax-highlighted) outputs!

![colorized cat output](https://i.imgur.com/8OkhNlK.png)

ccat supports over 150 languages due to the fact that it uses [PrismJS](https://github.com/PrismJS/prism) to tokenize and calculate the syntax highlighting for each token!


# Installation
You can clone and install it locally, but to make it easy, this utility is published as an [npm module.](https://www.npmjs.com/package/colorized-cat)

`npm install -g colorized-cat`

# Usage
`ccat YOUR_FILE`

Note: At this time, file extensions (like file.py or file.js) are required to detect the language. In the future, hopefully this requirement can be removed.

# Contributing 

This project will require lots of additional work to support more languages, have configurable options, and have strong testing. All contributions are welcome. At this time there is no contributing guide, but please feel free to make bug reports or PR's as you see fit!
