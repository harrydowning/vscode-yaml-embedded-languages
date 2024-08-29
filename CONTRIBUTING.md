# Contributing

Thank you for taking an interest in contributing to this project. All contributions are welcome. Please find below the suggested contribution, development, and release workflows.

## Contribution Workflow

- Raise/find an [issue](https://github.com/harrydowning/yaml-embedded-languages/issues) to fix
- Fork the repository
- Implement changes (see [development workflow](#development-workflow))
- Create pull request

## Development Workflow

- Implement changes, noting that `package.json` is partially generated and `syntaxes/*` is fully generated so relevant changes to these should be made in `src`
- Run `npm run generate` to update `package.json` and `syntaxes/*`
- Use F5 within VS Code to test the extension

## Release Workflow

- Update `version` in `package.json` and run `npm i` to update `package-lock.json`
- Update `CHANGELOG.md`
- Merge to master with `[release]` in the commit message
