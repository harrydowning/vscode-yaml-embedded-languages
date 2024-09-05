// @ts-check
import fs from "fs";
import esbuild from "esbuild";
import bytes from "bytes";
import chalk from "chalk";

const envRegExp = (name) => {
  return new RegExp(String.raw`\bprocess\.env\.(${name})\b`, "g");
};

/**
 * @param {Object} options
 * @param {RegExp} [options.filter]
 * @param {string[]} [options.exclude]
 */
const env = ({ filter = /.*/, exclude = [] } = {}) => ({
  name: "env",
  setup: (build) => {
    build.onLoad({ filter }, (args) => {
      let src = fs.readFileSync(args.path, "utf8");
      for (const match of src.matchAll(envRegExp(".+?"))) {
        const name = match[1];
        if (!exclude.includes(name)) {
          const value = JSON.stringify(process.env[name]) || "undefined";
          src = src.replace(envRegExp(name), value);
        }
      }
      return { contents: src, loader: "default" };
    });
  },
});

const result = await esbuild.build({
  entryPoints: ["dist/extension.js"],
  bundle: true,
  platform: "node",
  outfile: "dist/extension.js",
  allowOverwrite: true,
  minify: true,
  metafile: true,
  alias: {
    "@package": "../package.json",
  },
  external: ["vscode", "../package.json"],
  plugins: [env({ filter: /dist/ })],
});

const stats = {};

for (const [output, value] of Object.entries(result.metafile.outputs)) {
  stats[output] = value.bytes;
  console.log(output, chalk.bold.green(bytes(value.bytes)));
}

fs.writeFileSync("stats.json", JSON.stringify(stats));
