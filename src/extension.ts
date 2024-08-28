import vscode from "vscode";
import fs from "fs";
import {
  INCLUDE_CONFIG,
  LANGUAGES,
  packageJson,
  SUB_INCLUDE_CONFIG,
  VERSION_STATE,
} from "./constants";

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

  const disposable = vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration(INCLUDE_CONFIG)) {
      updateExtension();
    }
  });

  context.subscriptions.push(disposable);
};

export const deactivate = () => {};
