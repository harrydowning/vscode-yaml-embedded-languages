import { packageJson } from "./constants";
import { InjectionGrammar } from "./injection-grammar";
import { Writable } from "./writable";

export class Package extends Writable {
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
