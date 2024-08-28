import { LANGUAGES, Languages } from "./constants";
import { InjectionGrammar } from "./injection-grammar";
import { Package } from "./package";

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

if (require.main === module) {
  generateFiles();
}
