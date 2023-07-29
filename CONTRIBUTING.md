# Contributing

Thank you for taking an interest in contributing to this project. All contributions are welcome. Please find below the suggested contribution and development workflows.

## Contribution Workflow [#](#contribution-workflow- 'Contribution Workflow')
- Raise/find an [issue](https://github.com/harrydowning/yaml-embedded-languages/issues) to fix
- Fork the repository
- Implement changes (see [development workflow](#development-workflow-))
- Create pull request

## Development Workflow [#](#development-workflow- 'Development Workflow')
- Implement changes, ensuring any to `package.json` or `syntaxes/injection.json` are reflected in `extension.js`
- Run `node extension.js -dev` to update `package.json` and `syntaxes/injection.json`
- Use F5 within Vs Code to test the extension


## Release Workflow [#](#release-workflow- 'Release Workflow')
- Ensure changes, updated `VERSION` in `extension.js`, and updated `CHANGELOG.md` are committed
- Run `vsce package` to build the extension
- Create a new GitHub release
  - Use `VERSION` for the tag and title
  - Use latest in `CHANGELOG.md` for the body
  - Attach `*.vsix` build of the new release
- Run `vsce publish` to publish extension to the marketplace