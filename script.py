import json, os

SCOPE = "inline.langs"
SOURCE_LANGS = [
    "dosbatch",
    "clojure",
    "coffee",
    "c",
    "cpp",
    "csharp",
    "css",
    "diff",
    "dockerfile",
    "fsharp",
    "go",
    "groovy",
    "properties",
    "java",
    "js",
    "json",
    "latex",
    "css.less",
    "lua",
    "makefile",
    "objc",
    "perl",
    "perl.6",
    "powershell",
    "python",
    "r",
    "ruby",
    "rust",
    "css.scss",
    "shaderlab",
    "shell",
    "slim",
    "sql",
    "swift",
    "ts",
    "tsx",
    "tex",
    "yaml"
]

TEXT_LANGS = [] # TODO

def get_embedded_languages(langs):
    return {f"meta.embedded.inline.{lang}": f"{lang}" for lang in langs}

package = {
  "name": "yaml-embedded-languages",
  "displayName": "YAML Embedded Languages",
  "description": "Support for syntax highlighting within YAML block-scalars.",
  "version": "0.0.1",
  "engines": {
    "vscode": "^1.74.0"
  },
  "categories": [
    "Programming Languages"
  ],
  "contributes": {
    "grammars": [
      {
        "path": "./syntaxes/injection.json",
        "scopeName": SCOPE,
        "injectTo": ["source.yaml"],
        "embeddedLanguages": get_embedded_languages(SOURCE_LANGS)
      }
    ]
  }
}

def get_patterns(langs):
    return [{
        "include": f"#{lang}-block-scalar"
    } for lang in langs]

def get_repository(langs):
    return {
        f"{lang}-block-scalar": {
            "begin": f"(?:(\\|)|(>))([1-9])?([-+])?[ \t]+(#[ \t]*{lang})[ \t]*\\n",
            "beginCaptures": {
                "1": {
                    "name": "keyword.control.flow.block-scalar.literal.yaml"
                },
                "2": {
                    "name": "keyword.control.flow.block-scalar.folded.yaml"
                },
                "3": {
                    "name": "constant.numeric.indentation-indicator.yaml"
                },
                "4": {
                    "name": "storage.modifier.chomping-indicator.yaml"
                },
                "5": {
                    "name": "comment.line.number-sign.yaml"
                }
            },
            "end": "^(?=\\S)|(?!\\G)",
            "patterns": [
                {
                    "begin": "^([ ]+)(?! )",
                    "end": "^(?!\\1|\\s*$)",
                    "name": f"meta.embedded.inline.{lang}",
                    "patterns": [{"include": f"source.{lang}"}]
                }
            ]
        }
    for lang in langs
    }

injection = {
    "scopeName": SCOPE,
    "injectionSelector": "L:source.yaml",
    "patterns": get_patterns(SOURCE_LANGS),
    "repository": get_repository(SOURCE_LANGS)
}

def main():
    with open("package.json", 'w') as file:
        file.write(json.dumps(package, indent=2))
    with open(f"syntaxes{os.path.sep}injection.json", 'w') as file:
        file.write(json.dumps(injection, indent=2))

if __name__ == "__main__":
    main()
