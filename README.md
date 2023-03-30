# YAML Embedded Languages

## Features [#](#features- 'Features')

Syntax highlighting within YAML block-scalars for [40 built-in languages](#built-in-languages- 'Built-In Languages') and the ability to easily add highlighting for any other language with the [yaml-embedded-languages.include](#extension-settings- 'Extension Settings') configuration setting.

![Example yaml file showing syntax highlighting](https://raw.githubusercontent.com/harrydowning/yaml-embedded-languages/master/images/example.png)

### Built-In Languages [#](#built-in-languages- 'Built-In Languages')
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
- yaml

## Requirements [#](#requirements- 'Requirements')

None

## Extension Settings [#](#extension-settings- 'Extension Settings')

| Name | Description |
| ---- | ----------- |
| `yaml-embedded-languages.include` | Allows the user to include their own languages by providing an object where each key defines the language identifier with regex and the corresponding value specifies the language TextMate `scopeName`. This can be used to add any other language, which could be from another extension. This also allows the user to override any language identifiers currently used for the built-in languages. |

## Known Issues [#](#known-issues- 'Known Issues')

- First line of C, C++, and pip do not get highlighted

## Release Notes [#](#release-notes- 'Release Notes')

See [CHANGELOG](CHANGELOG.md)
