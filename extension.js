const DEV_MODE = process.argv?.[2] == "-dev";
const vscode = DEV_MODE ? null : require("vscode");
const fs = require("fs");

const NAME = "yaml-embedded-languages";
const VERSION = "0.3.2";
const DISPLAY_NAME = "YAML Embedded Languages";
const INJECTION_PATH = "./syntaxes/injection.json";
const SCOPE_NAME = `${NAME}.injection`;
const SUB_INCLUDE_CONFIG = "include";
const INCLUDE_CONFIG = `${NAME}.${SUB_INCLUDE_CONFIG}`;
const LANGUAGE_SCOPE_PREFIX = "meta.embedded.inline";
const REPOSITORY_SUFFIX = "block-scalar";

const LANGUAGES = {
  c: "source.c",
  clojure: "source.clojure",
  coffee: "source.coffee",
  "cpp|c\\+\\+": "source.cpp",
  csharp: "source.csharp",
  css: "source.css",
  diff: "source.diff",
  dockerfile: "source.dockerfile",
  dosbatch: "source.dosbatch",
  fsharp: "source.fsharp",
  go: "source.go",
  groovy: "source.groovy",
  html: "text.html.derivative",
  java: "source.java",
  "javascript|js": "source.js",
  json: "source.json",
  "tex|latex": "text.tex",
  lua: "source.lua",
  makefile: "source.makefile",
  markdown: "text.html.markdown",
  objc: "source.objc",
  perl: "source.perl",
  "pip|requirements": "source.pip-requirements",
  powerfx: "source.js",
  powershell: "source.powershell",
  properties: "source.properties",
  "python|py": "source.python",
  r: "source.r",
  regex: "source.regexp.python",
  ruby: "source.ruby",
  rust: "source.rust",
  scss: "source.css.scss",
  shaderlab: "source.shaderlab",
  shell: "source.shell",
  slim: "source.slim",
  sql: "source.sql",
  swift: "source.swift",
  "typescript|ts": "source.ts",
  tsx: "source.tsx",
  xml: "text.xml",
  yaml: "source.yaml",
};

const getEmbeddedLanguages = (languages) => {
  const names = Object.keys(languages);
  return Object.fromEntries(
    names.map((name) => [`${LANGUAGE_SCOPE_PREFIX}.${name}`, name]),
  );
};

const getPackageJson = (languages) => ({
  name: NAME,
  version: VERSION,
  displayName: DISPLAY_NAME,
  description: "Support for syntax highlighting within YAML block-scalars.",
  icon: "images/icon.png",
  publisher: "harrydowning",
  author: {
    name: "Harry Downing",
    email: "harry.downing17@gmail.com",
  },
  homepage: "https://github.com/harrydowning/yaml-embedded-languages#readme",
  repository: {
    type: "git",
    url: "https://github.com/harrydowning/yaml-embedded-languages.git",
  },
  license: "MIT",
  engines: {
    vscode: "^1.74.0",
  },
  categories: ["Programming Languages"],
  activationEvents: ["onStartupFinished"],
  main: "extension.js",
  contributes: {
    grammars: [
      {
        path: INJECTION_PATH,
        scopeName: SCOPE_NAME,
        injectTo: ["source.yaml", "source.github-actions-workflow"],
        embeddedLanguages: getEmbeddedLanguages(languages),
      },
    ],
    configuration: {
      title: DISPLAY_NAME,
      properties: {
        [INCLUDE_CONFIG]: {
          type: "object",
          patternProperties: {
            "^.*$": {
              type: "string",
            },
          },
          default: {},
          description:
            "Use the key to define the language identifier with regex. Use the value to specify the language textMate scopeName.",
        },
      },
    },
  },
  devDependencies: {
    "@vscode/vsce": "^2.29.0",
  },
});

const getPatterns = (languages) => {
  const names = Object.keys(languages);
  return names.map((name) => ({
    include: `#${name}-${REPOSITORY_SUFFIX}`,
  }));
};

const getRepository = (languages) => {
  entries = Object.entries(languages);
  return Object.fromEntries(
    entries.map(([name, scopeName]) => [
      `${name}-${REPOSITORY_SUFFIX}`,
      {
        begin: `(?i)(?:(\\|)|(>))([1-9])?([-+])?[ \t]+(#[ \t]*(?:${name})[ \t]*\\n)`,
        beginCaptures: {
          1: {
            name: "keyword.control.flow.block-scalar.literal.yaml",
          },
          2: {
            name: "keyword.control.flow.block-scalar.folded.yaml",
          },
          3: {
            name: "constant.numeric.indentation-indicator.yaml",
          },
          4: {
            name: "storage.modifier.chomping-indicator.yaml",
          },
          5: {
            patterns: [
              {
                begin: "#",
                beginCaptures: {
                  0: { name: "punctuation.definition.comment.yaml" },
                },
                end: "\\n",
              },
            ],
            name: "comment.line.number-sign.yaml",
          },
        },
        end: "^(?=\\S)|(?!\\G)",
        patterns: [
          {
            begin: "^([ ]+)(?! )",
            end: "^(?!\\1|\\s*$)",
            name: `${LANGUAGE_SCOPE_PREFIX}.${name}`,
            patterns: [{ include: scopeName }],
          },
        ],
      },
    ]),
  );
};

const getInjectionJson = (languages) => ({
  scopeName: SCOPE_NAME,
  injectionSelector: "L:source.yaml,L:source.github-actions-workflow",
  patterns: getPatterns(languages),
  repository: getRepository(languages),
});

const write = (filename, data) => {
  const fileData = fs.readFileSync(filename).toString();

  if (fileData === data) {
    return false;
  }

  try {
    fs.writeFileSync(filename, data);
  } catch (err) {
    console.error(err);
  }

  console.log(`File '${filename}' saved.`);
  return true;
};

const generateFiles = (languages = LANGUAGES) => {
  const packageJson = JSON.stringify(getPackageJson(languages), null, 2);
  const injectionJson = JSON.stringify(getInjectionJson(languages), null, 2);

  return (
    write(`${__dirname}/package.json`, packageJson) |
    write(`${__dirname}/syntaxes/injection.json`, injectionJson)
  );
};

const updateExtension = () => {
  const settings = vscode.workspace.getConfiguration(NAME);
  const includeLanguages = settings[SUB_INCLUDE_CONFIG];
  const allLanguages = { ...includeLanguages, ...LANGUAGES };

  const filesChanged = generateFiles(allLanguages);

  if (filesChanged) {
    const message = `Reload window to allow changes to take effect?`;
    const items = ["Yes", "No"];
    vscode.window.showInformationMessage(message, ...items).then((item) => {
      if (item === items[0]) {
        vscode.commands.executeCommand("workbench.action.reloadWindow");
      }
    });
  }
};

const activate = (context) => {
  updateExtension();

  let disposable = vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration(INCLUDE_CONFIG)) {
      updateExtension();
    }
  });

  context.subscriptions.push(disposable);
};

const deactivate = () => {};

if (DEV_MODE) {
  generateFiles(LANGUAGES);
}

module.exports = {
  activate,
  deactivate,
};
