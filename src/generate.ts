import { LANGUAGES, Languages } from "./constants";
import { InjectionGrammar } from "./injection-grammar";
import { Package } from "./package";
import { hasBoolKey, hasStringKey } from "./utils";

const parseLanguages = (languages: { [key: string]: unknown }): Languages => {
  const parsedLanguages: Languages = {};
  for (const id in languages) {
    let language = languages[id];
    if (typeof language === "string") {
      language = { scopeName: language };
    }

    if (typeof language === "object" && language !== null) {
      if (!hasStringKey(language, "scopeName")) {
        continue;
      }

      parsedLanguages[id] = {
        name: hasStringKey(language, "name") ? language.name : id,
        scopeName: language.scopeName,
        stripIndent: hasBoolKey(language, "stripIndent")
          ? language.stripIndent
          : false,
      };
    }
  }
  return parsedLanguages;
};

export const generateFiles = (languages = LANGUAGES) => {
  const parsedLanguages = parseLanguages(languages);
  const grammars = [
    new InjectionGrammar("source.yaml", parsedLanguages),
    new InjectionGrammar("source.github-actions-workflow", parsedLanguages),
  ];

  const writables = [new Package(grammars), ...grammars];

  return writables.map((writable) => writable.write()).some(Boolean);
};

if (require.main === module) {
  generateFiles();
}
