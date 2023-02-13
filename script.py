import json, os

SCOPE = "inline.langs"
LANGS = {
    "c": "source.c",
    "clojure": "source.clojure",
    "coffee": "source.coffee",
    "cpp": "source.cpp",
    "csharp": "source.csharp",
    "css": "source.css",
    "diff": "source.diff",
    "dockerfile": "source.dockerfile",
    "dosbatch": "source.dosbatch",
    "fsharp": "source.fsharp",
    "go": "source.go",
    "groovy": "source.groovy",
    "html": "text.html.derivative",
    "java": "source.java",
    "js": "source.js",
    "json": "source.json",
    "latex": "text.tex",
    "lua": "source.lua",
    "makefile": "source.makefile",
    "markdown": "text.html.markdown",
    "objc": "source.objc",
    "perl": "source.perl",
    "powershell": "source.powershell",
    "properties": "source.properties",
    "python": "source.python",
    "r": "source.r",
    "ruby": "source.ruby",
    "rust": "source.rust",
    "shaderlab": "source.shaderlab",
    "shell": "source.shell",
    "slim": "source.slim",
    "sql": "source.sql",
    "swift": "source.swift",
    "tex": "text.tex",
    "ts": "source.ts",
    "tsx": "source.tsx",
    "xml": "text.xml",
    "yaml": "source.yaml"
}

def get_embedded_languages(names):
    return {f"meta.embedded.inline.{name}": f"{name}" for name in names}

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
        "embeddedLanguages": get_embedded_languages(LANGS.keys())
      }
    ]
  }
}

def get_patterns(names):
    return [{
        "include": f"#{name}-block-scalar"
    } for name in names]

def get_repository(langs):
    return {
        f"{name}-block-scalar": {
            "begin": f"(?:(\\|)|(>))([1-9])?([-+])?[ \t]+(#[ \t]*{name})[ \t]*\\n",
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
                    "name": f"meta.embedded.inline.{name}",
                    "patterns": [{"include": f"{lang}"}]
                }
            ]
        }
    for name, lang in langs.items()
    }

injection = {
    "scopeName": SCOPE,
    "injectionSelector": "L:source.yaml",
    "patterns": get_patterns(LANGS.keys()),
    "repository": get_repository(LANGS)
}

def main():
    with open("package.json", 'w') as file:
        file.write(json.dumps(package, indent=2))
    with open(f"syntaxes{os.path.sep}injection.json", 'w') as file:
        file.write(json.dumps(injection, indent=2))

if __name__ == "__main__":
    main()
