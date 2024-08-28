import * as vscode from "vscode";
import fs from "fs";
import packageJson from "../package.json";

const SUB_INCLUDE_CONFIG = "include";
const INCLUDE_CONFIG = `${packageJson.name}.${SUB_INCLUDE_CONFIG}`;
const VERSION_STATE = "version";

/* eslint sort-keys: ["error", "asc"] */
const LANGUAGES = {
  bat: "source.batchfile",
  bibtex: "text.bibtex",
  c: "source.c",
  "c#": {
    name: "csharp",
    scopeName: "source.cs",
  },
  "c\\+\\+": {
    name: "cpp",
    scopeName: "source.cpp",
  },
  clojure: "source.clojure",
  coffee: {
    name: "coffeescript",
    scopeName: "source.coffee",
  },
  cpp: "source.cpp",
  csharp: "source.cs",
  css: "source.css",
  cuda: {
    name: "cuda-cpp",
    scopeName: "source.cuda-cpp",
  },
  dart: "source.dart",
  diff: {
    scopeName: "source.diff",
    stripIndent: true,
  },
  dockercompose: "source.yaml",
  dockerfile: "source.dockerfile",
  "f#": {
    name: "fsharp",
    scopeName: "source.fsharp",
  },
  fsharp: "source.fsharp",
  go: "source.go",
  groovy: "source.groovy",
  handlebars: "text.html.handlebars",
  hlsl: "source.hlsl",
  html: "text.html.derivative",
  ini: "source.ini",
  jade: "text.pug",
  java: "source.java",
  javascript: "source.js",
  js: {
    name: "javascript",
    scopeName: "source.js",
  },
  json: "source.json",
  jsonc: "source.json.comments",
  jsonl: "source.json.lines",
  jsx: {
    name: "javascriptreact",
    scopeName: "source.js.jsx",
  },
  julia: "source.julia",
  latex: {
    scopeName: "text.tex.latex",
    stripIndent: true,
  },
  less: "source.css.less",
  log: "text.log",
  lua: "source.lua",
  make: {
    name: "makefile",
    scopeName: "source.makefile",
  },
  makefile: "source.makefile",
  markdown: {
    scopeName: "text.html.markdown",
    stripIndent: true,
  },
  math: {
    name: "markdown-math",
    scopeName: "text.html.markdown.math",
  },
  objc: {
    name: "objective-c",
    scopeName: "source.objc",
  },
  objcpp: {
    name: "objective-cpp",
    scopeName: "source.objcpp",
  },
  perl: "source.perl",
  php: "text.html.php",
  pip: {
    name: "pip-requirements",
    scopeName: "source.pip-requirements",
  },
  powerfx: {
    name: "javascript",
    scopeName: "source.js",
  },
  powershell: "source.powershell",
  properties: "source.ini",
  py: {
    name: "python",
    scopeName: "source.python",
  },
  python: "source.python",
  r: "source.r",
  raku: "source.perl.6",
  razor: "text.html.cshtml",
  regex: "source.js.regexp",
  requirements: {
    name: "pip-requirements",
    scopeName: "source.pip-requirements",
  },
  rst: {
    name: "restructuredtext",
    scopeName: "source.rst",
  },
  ruby: "source.ruby",
  rust: "source.rust",
  scss: "source.css.scss",
  shaderlab: "source.shaderlab",
  shell: {
    name: "shellscript",
    scopeName: "source.shell",
  },
  sql: "source.sql",
  swift: "source.swift",
  tex: "text.tex",
  ts: {
    name: "typescript",
    scopeName: "source.ts",
  },
  tsx: {
    name: "typescriptreact",
    scopeName: "source.tsx",
  },
  typescript: "source.ts",
  vb: "source.asp.vb.net",
  xml: "text.xml",
  xsl: "text.xml.xsl",
  yaml: "source.yaml",
};
/* eslint-disable sort-keys */

type Languages = {
  [key: string]: {
    name: string;
    scopeName: string;
    stripIndent: boolean;
  };
};

class Writable {
  path;
  #absolutePath;

  constructor(path: string) {
    this.path = path;
    this.#absolutePath = `${__dirname}/../${path}`;
  }

  write() {
    const data = JSON.stringify(this.valueOf(), null, 2);
    let fileData;

    try {
      fileData = fs.readFileSync(this.#absolutePath).toString();
    } catch {
      fileData = undefined;
    }

    if (fileData === data) {
      return false;
    }

    try {
      fs.writeFileSync(this.#absolutePath, data);
    } catch (err) {
      console.error(err);
      return false;
    }

    console.log(`File '${this.#absolutePath}' saved.`);
    return true;
  }
}

class InjectionGrammar extends Writable {
  embeddedScopeNamePrefix = "meta.embedded.inline";
  scopeName;
  injectionScopeName;
  languages;

  constructor(injectionScopeName: string, languages: Languages) {
    super(`./syntaxes/${injectionScopeName}.injection.tmLanguage.json`);
    this.scopeName = `${injectionScopeName}.injection`;
    this.injectionScopeName = injectionScopeName;
    this.languages = languages;
  }

  #getPatterns() {
    const entries = Object.entries(this.languages);
    return entries.map(([id, { scopeName, stripIndent }]) => ({
      begin: `(?i)(?:(\\|)|(>))([1-9])?([-+])?\\s+(#\\s*(?:${id})\\s*\\n)`,
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
          name: "entity.name.type.yaml",
        },
      },
      end: "^(?=\\S)|(?!\\G)",
      patterns: [
        {
          begin: "(?>^|\\G)([ ]+)(?! )",
          end: "^(?!\\1|\\s*$)",
          while: stripIndent ? "^$|\\1" : undefined,
          name: `${this.embeddedScopeNamePrefix}.${id}`,
          patterns: [{ include: scopeName }],
        },
      ],
    }));
  }

  valueOf() {
    return {
      scopeName: this.scopeName,
      injectionSelector: `L:${this.injectionScopeName}`,
      patterns: this.#getPatterns(),
    };
  }
}

class Package extends Writable {
  #injectionGrammars;
  constructor(injectionGrammars: InjectionGrammar[]) {
    super(`package.json`);
    this.#injectionGrammars = injectionGrammars;
  }

  #getEmbeddedLanguages(injectionGrammar: InjectionGrammar) {
    const languages = injectionGrammar.languages;
    const ids = Object.keys(languages);
    return Object.fromEntries(
      ids.map((id) => [
        `${injectionGrammar.embeddedScopeNamePrefix}.${id}`,
        languages[id].name,
      ]),
    );
  }

  valueOf() {
    return {
      ...packageJson,
      contributes: {
        ...packageJson.contributes,
        grammars: this.#injectionGrammars.map((injectionGrammar) => ({
          path: injectionGrammar.path,
          scopeName: injectionGrammar.scopeName,
          injectTo: [injectionGrammar.injectionScopeName],
          embeddedLanguages: this.#getEmbeddedLanguages(injectionGrammar),
        })),
      },
    };
  }
}

const normalizeLanguages = (languages: { [key: string]: unknown }) => {
  const normalizedLanguages: Languages = {};
  for (const id in languages) {
    let language = languages[id];
    if (typeof language === "string") {
      language = { scopeName: language };
    }

    if (typeof language === "object" && language !== null) {
      if (!("scopeName" in language)) {
        continue;
      }

      if (typeof language.scopeName !== "string") {
        continue;
      }

      normalizedLanguages[id] = {
        name:
          "name" in language && typeof language.name === "string"
            ? language.name
            : id,
        scopeName: language.scopeName,
        stripIndent:
          "stripIndent" in language && typeof language.stripIndent === "boolean"
            ? language.stripIndent
            : false,
      };
    }
  }
  return normalizedLanguages;
};

export const generateFiles = (languages = LANGUAGES) => {
  const parsedLanguages = normalizeLanguages(languages);
  const grammars = [
    new InjectionGrammar("source.yaml", parsedLanguages),
    new InjectionGrammar("source.github-actions-workflow", parsedLanguages),
  ];

  const writables = [new Package(grammars), ...grammars];

  return writables.map((writable) => writable.write()).some(Boolean);
};

const updateExtension = () => {
  const settings = vscode.workspace.getConfiguration(packageJson.name);
  const includeLanguages = settings[SUB_INCLUDE_CONFIG];
  const allLanguages = { ...LANGUAGES, ...includeLanguages };

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

export const activate = (context: vscode.ExtensionContext) => {
  const currentVersion = packageJson.version;
  const previousVersion = context.globalState.get(VERSION_STATE);

  if (previousVersion !== currentVersion) {
    updateExtension();
    context.globalState.update(VERSION_STATE, currentVersion);
  }

  let disposable = vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration(INCLUDE_CONFIG)) {
      updateExtension();
    }
  });

  context.subscriptions.push(disposable);
};

export const deactivate = () => {};
