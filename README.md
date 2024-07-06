# YAML Embedded Languages

![GitHub](https://img.shields.io/github/license/harrydowning/yaml-embedded-languages?color=forest) ![Visual Studio Marketplace Version (including pre-releases)](https://img.shields.io/visual-studio-marketplace/v/harrydowning.yaml-embedded-languages?color=red) ![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/harrydowning.yaml-embedded-languages?color=rebeccapurple)

## Features

Syntax highlighting within YAML block-scalars for [40+ built-in languages](#built-in-languages "Built-In Languages") and the ability to add highlighting for any other language with the [yaml-embedded-languages.include](#extension-settings "Extension Settings") configuration setting.

![Example yaml file showing syntax highlighting](https://raw.githubusercontent.com/harrydowning/yaml-embedded-languages/master/images/example.png)

### Built-In Languages

The following list shows all valid identifiers for the built-in languages:

- c
- clojure
- coffee
- cpp or c++
- csharp
- css
- diff
- dockerfile
- dosbatch
- fsharp
- go
- groovy
- html
- java
- javascript or js
- json
- tex or latex
- lua
- makefile
- markdown
- objc
- perl
- pip or requirements
- powerfx
- powershell
- properties
- python or py
- r
- regex
- ruby
- rust
- scss
- shaderlab
- shell
- slim
- sql
- swift
- typescript or ts
- tsx
- xml
- yaml (Yes, YAML within YAML!)

## Requirements

None

## Extension Settings

| Name                              | Description                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `yaml-embedded-languages.include` | Allows the user to include their own languages by providing an object where each key defines the language identifier with regex and the corresponding value specifies the language TextMate `scopeName`. This can be used to add any other language, which could be from another extension. This also allows the user to override any language identifiers currently used for the built-in languages. |

## Known Issues

See [Issues](https://github.com/harrydowning/yaml-embedded-languages/issues)

## Contribution Notes

See [CONTRIBUTING](CONTRIBUTING.md)

## Release Notes

See [CHANGELOG](CHANGELOG.md)
