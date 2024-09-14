# Change Log

All notable changes to this extension will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.1.0] - 2024-09-14 (pre-release)

### Added

- Comment commands to allow highlighting complete sections

## [1.0.6] - 2024-09-12

### Fixed

- Indentation in YAML-based embedded languages
- Changelog markup

### Reverted

- Grammar fix introduced in v1.0.5

## [1.0.5] - 2024-09-09

### Fixed

- Grammar for VS Code 1.93.0 [microsoft/vscode#224978](https://github.com/microsoft/vscode/issues/224978)

## [1.0.4] - 2024-09-08

### Changed

- Repository name to `vscode-yaml-embedded-languages`

## [1.0.3] - 2024-08-30

### Fixed

- Highlighting of language identifier inside comments

## [1.0.2] - 2024-08-29

### Changed

- `scopeName` to be required
- Output to be bundled and minified
- Injection grammar to be separated into `source.yaml.injection` and `source.github-actions-workflow.injection`

## [1.0.1] - 2024-08-26

### Fixed

- `while` pattern used for `stripIndent` to allow empty lines

## [1.0.0] - 2024-08-26

### Added

- `stripIndent` language config option
- Languages `bat`, `bibtex`, `cuda-cpp`, `dart`, `dockercompose`, `handlebars`, `hlsl`, `ini`, `jade`, `jsonc`, `jsonl`, `javascriptreact`, `julia`, `less`, `log`, `markdown-math`, `objective-cpp`, `php`, `raku`, `razor`, `restructuredtext`, `vb`, and `xsl`
- Language aliases `c#`, `f#`, `make`

### Fixed

- Markdown indentation ([#13](https://github.com/harrydowning/vscode-yaml-embedded-languages/issues/13))
- Highlighting for new YAML grammar
- `csharp` highlighting

### Changed

- Fully generated `package.json` to be partially generated
- `regex` language to use scope `source.js.regexp`
- Extension logo
- Scope of language identifier comment to highlight recognized languages

### Removed

- Languages `dosbatch` and `slim` (no built-in VS Code support)

## [0.4.0] - 2024-08-18

### Added

- Option to specify language name in `yaml-embedded-languages.include` config

### Fixed

- Built-in language names ([#12](https://github.com/harrydowning/vscode-yaml-embedded-languages/issues/12))

## [0.3.3] - 2024-07-06

### Changed

- Extension to generate files on update
- Doc formatting and links

## [0.3.2] - 2024-07-06

### Fixed

- User languages reset on extension update ([#24](https://github.com/harrydowning/vscode-yaml-embedded-languages/issues/24))
- User language override precedence

## [0.3.1] - 2024-06-29

### Fixed

- Broken link in CHANGELOG

## [0.3.0] - 2024-06-28

### Added

- Support for Power Fx ([#17](https://github.com/harrydowning/vscode-yaml-embedded-languages/issues/17))

## [0.2.0] - 2023-07-29

### Added

- Support for GitHub Actions ([#9](https://github.com/harrydowning/vscode-yaml-embedded-languages/issues/9))
- `CONTRIBUTING.md` documentation
- `-dev` flag on `extension.js`

### Fixed

- Path separators on macOS ([#7](https://github.com/harrydowning/vscode-yaml-embedded-languages/issues/7))

### Changed

- All path separators to POSIX standard (`/`)
- `README.md`

## [0.1.0] - 2023-03-30

### Added

- `yaml-embedded-languages.include` config setting to allow user language extensibility

## [0.0.2] - 2023-03-29

### Fixed

- Example image on README

## [0.0.1] - 2023-03-29

### Added

- Highlighting support for 40 languages in YAML block-scalars

[unreleased]: https://github.com/harrydowning/vscode-yaml-embedded-languages/compare/v1.0.6...HEAD
[1.1.0]: https://github.com/harrydowning/vscode-yaml-embedded-languages/compare/v1.0.6...v1.1.0
[1.0.6]: https://github.com/harrydowning/vscode-yaml-embedded-languages/compare/v1.0.5...v1.0.6
[1.0.5]: https://github.com/harrydowning/vscode-yaml-embedded-languages/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/harrydowning/vscode-yaml-embedded-languages/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/harrydowning/vscode-yaml-embedded-languages/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/harrydowning/vscode-yaml-embedded-languages/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/harrydowning/vscode-yaml-embedded-languages/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/harrydowning/vscode-yaml-embedded-languages/compare/v0.4.0...v1.0.0
[0.4.0]: https://github.com/harrydowning/vscode-yaml-embedded-languages/compare/v0.3.3...v0.4.0
[0.3.3]: https://github.com/harrydowning/vscode-yaml-embedded-languages/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/harrydowning/vscode-yaml-embedded-languages/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/harrydowning/vscode-yaml-embedded-languages/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/harrydowning/vscode-yaml-embedded-languages/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/harrydowning/vscode-yaml-embedded-languages/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/harrydowning/vscode-yaml-embedded-languages/compare/v0.0.2...v0.1.0
[0.0.2]: https://github.com/harrydowning/vscode-yaml-embedded-languages/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/harrydowning/vscode-yaml-embedded-languages/releases/tag/v0.0.1
