<div align="center">

# YAML Embedded Languages

![GitHub License](https://img.shields.io/github/license/harrydowning/yaml-embedded-languages?style=for-the-badge)
![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/harrydowning.yaml-embedded-languages?style=for-the-badge)
![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/harrydowning.yaml-embedded-languages?style=for-the-badge&color=rebeccapurple)

</div>

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

| Name                              | Description                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `yaml-embedded-languages.include` | Allows the user to include their own languages, the languages of other extensions, or aliases for existing languages. Use the key to define the language identifier with regex. Use the value to specify the language TextMate `scopeName`. By default the language identifier will be used as the language name. To change this, an object can be specified with the properties `name` and `scopeName`. |

## Known Issues

See [Issues](https://github.com/harrydowning/yaml-embedded-languages/issues)

## Contribution Notes

See [CONTRIBUTING](CONTRIBUTING.md)

## Release Notes

See [CHANGELOG](CHANGELOG.md)
