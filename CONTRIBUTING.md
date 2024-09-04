# Contributing

Thank you for taking an interest in contributing to this project. All contributions are welcome. Please find below the suggested contribution, development, and release workflows.

## Contribution Workflow

- Raise/find an [issue](https://github.com/harrydowning/yaml-embedded-languages/issues) to fix
- Fork the repository
- Implement changes (see [development workflow](#development-workflow))
- Create pull request

## Development Workflow

- Implement changes
- Run `npm run generate` to update `package.json` and `syntaxes`
- Run `npm run build` to update `dist/extension.js`
- Use F5 within VS Code to test the extension

> [!NOTE]  
> `package.json` is partially generated and `syntaxes` is fully generated. Relevant changes to these should be made in `src`.

> [!NOTE]  
> Any features intended for pre-release should be kept behind the `PRE_RELEASE` flag. These features can be enabled by setting the environment variable `PRE_RELEASE=true` on build and generate.

## Release Workflow

- Update `version` in `package.json` and run `npm i` to update `package-lock.json`
- Update `CHANGELOG.md` (ensure version links are set)
- Merge to master with `[release]` or `[pre-release]` in the commit message
