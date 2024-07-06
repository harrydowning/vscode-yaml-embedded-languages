# Contributing

Thank you for taking an interest in contributing to this project. All contributions are welcome. Please find below the suggested contribution, development, and release workflows.

## Contribution Workflow

- Raise/find an [issue](https://github.com/harrydowning/yaml-embedded-languages/issues) to fix
- Fork the repository
- Implement changes (see [development workflow](#development-workflow))
- Create pull request

## Development Workflow

- Implement changes, ensuring any to `package.json` or `syntaxes/injection.json` are reflected in `extension.js`
- Run `node extension.js -dev` to update `package.json` and `syntaxes/injection.json`
- Use F5 within Vs Code to test the extension

## Release Workflow

- Update `VERSION` in `extension.js` and run `node extension.js -dev`
- Update `CHANGELOG.md`
- Merge to master with `[release]` in the commit message
