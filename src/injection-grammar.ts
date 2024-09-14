import packageJson from "@package";
import { Languages, PRE_RELEASE } from "./constants";
import { Writable } from "./writable";

export class InjectionGrammar extends Writable {
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
    const patterns = [];

    if (PRE_RELEASE) {
      patterns.push(
        {
          begin: `#\\s*${packageJson.name}\\s*$`,
          beginCaptures: {
            0: { name: "entity.name.type.yaml" },
          },
          patterns: [{ include: this.injectionScopeName }],
        },
        ...entries.map(([id, { scopeName, stripIndent }]) => ({
          begin: `#\\s*${packageJson.name}\\s*:\\s*${id}\\s*$`,
          beginCaptures: {
            0: { name: "entity.name.type.yaml" },
          },
          patterns: [
            {
              begin: `(?i)(?:(\\|)|(>))([1-9])?([-+])?(.*\\n?)`,
              beginCaptures: {
                1: { name: "keyword.control.flow.block-scalar.literal.yaml" },
                2: { name: "keyword.control.flow.block-scalar.folded.yaml" },
                3: { name: "constant.numeric.indentation-indicator.yaml" },
                4: { name: "storage.modifier.chomping-indicator.yaml" },
                5: {
                  patterns: [
                    { include: `${this.injectionScopeName}#comment` },
                    {
                      match: ".+",
                      name: "invalid.illegal.expected-comment-or-newline.yaml",
                    },
                  ],
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
            },
            { include: this.injectionScopeName },
          ],
        })),
      );
    }

    patterns.push(
      ...entries.map(([id, { scopeName, stripIndent }]) => ({
        begin: `(?i)(?:(\\|)|(>))([1-9])?([-+])?\\s+(#\\s*(?:${id})\\s*\\n)`,
        beginCaptures: {
          1: { name: "keyword.control.flow.block-scalar.literal.yaml" },
          2: { name: "keyword.control.flow.block-scalar.folded.yaml" },
          3: { name: "constant.numeric.indentation-indicator.yaml" },
          4: { name: "storage.modifier.chomping-indicator.yaml" },
          5: { name: "entity.name.type.yaml" },
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
      })),
    );

    return patterns;
  }

  valueOf() {
    return {
      scopeName: this.scopeName,
      injectionSelector: `L:${this.injectionScopeName} -comment -string -meta.embedded`,
      patterns: this.#getPatterns(),
    };
  }
}
