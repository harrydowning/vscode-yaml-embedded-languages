const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const NAME = "yaml-embedded-languages";
const VERSION = "0.1.0";
const DISPLAY_NAME = "YAML Embedded Languages";
const INJECTION_PATH = `.${path.sep}syntaxes${path.sep}injection.json`;
const SCOPE_NAME = `${NAME}.injection`;
const SUB_INCLUDE_CONFIG = "include";
const INCLUDE_CONFIG = `${NAME}.${SUB_INCLUDE_CONFIG}`;

const LANGUAGES = {

};

const getEmbeddedLanguages = (languages) => {

};

const getPackageJson = (languages) => ({
  "name": NAME,
  "version": VERSION,
  "displayName": DISPLAY_NAME,
  "description": "Support for syntax highlighting within YAML block-scalars.",
  "icon": "https://raw.githubusercontent.com/harrydowning/yaml-embedded-languages/master/images/icon.png",
  "publisher": "harrydowning",
  "author": {
    "name": "Harry Downing",
    "email": "harry.downing17@gmail.com"
  },
  "homepage": "https://github.com/harrydowning/yaml-embedded-languages#readme",
  "repository": {
    "type": "git",
    "url": "https://github.com/harrydowning/yaml-embedded-languages.git"
  },
  "license": "MIT",
  "engines": {
    "vscode": "^1.74.0"
  },
  "categories": [
    "Programming Languages"
  ],
  "activationEvents": [
    "onStartupFinished"
  ],
  "main": `.${path.sep}extension.js`,
  "contributes": {
    "grammars": [
      {
        "path": INJECTION_PATH,
        "scopeName": SCOPE_NAME,
        "injectTo": [
          "source.yaml"
        ],
        "embeddedLanguages": getEmbeddedLanguages(languages)
      }
    ],
    "configuration": {
      "title": DISPLAY_NAME,
      "properties": {
        INCLUDE_CONFIG: {
          "type": "object",
          "patternProperties": {
            "^.*$": {
              "type": "string"
            }
          },
          "default": {},
          "description": "Use the key to define the language identifier as a regex. Use the value to specify the language textMate scopeName."
        }
      }
    }
  }
});

const getInjectionJson = (languages) => {

};

const write = (filename, data) => {
  fs.writeFile(filename, data, (err) => {
    if(err) return console.log(err);
    console.log(`File '${filename}' saved.`);
  }); 
};

function activate(context) {
  // TODO will reference contain updated config
  const settings = vscode.workspace.getConfiguration(NAME);
  
  let disposable = vscode.workspace.onDidChangeConfiguration(event => {
    if(event.affectsConfiguration(INCLUDE_CONFIG)) {
      const includeLanguages = settings[SUB_INCLUDE_CONFIG];
      const allLanguages = {...includeLanguages, ...LANGUAGES};
      
      const packageJson = JSON.stringify(getPackageJson(allLanguages), null, 2);
      const injectionJson = JSON.stringify(getInjectionJson(allLanguages), null, 2); 
      
      write(`${__dirname}${path.sep}package.json`, packageJson);
      write(`${__dirname}${path.sep}syntaxes${path.sep}injection.json`, injectionJson);
    }
  })

  context.subscriptions.push(disposable);
};

function deactivate() {}

module.exports = {
  activate,
  deactivate
}