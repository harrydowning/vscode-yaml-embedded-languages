// @ts-check
import fs from "fs";
import esbuild from "esbuild";
import bytes from "bytes";
import chalk from "chalk";

const env = () => ({
  name: "env",
  setup: (build) => {
    build.onLoad({ filter: /.*/ }, (args) => {
      let src = fs.readFileSync(args.path, "utf8");
      for (const match of src.matchAll(/\bprocess\.env\.(.+?)\b/g)) {
        const name = match[1];
        src = src.replace(
          new RegExp(`\\bprocess\\.env\\.${name}\\b`, "g"),
          JSON.stringify(process.env[name]) || "undefined",
        );
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
  plugins: [env()],
});

const stats = {};

for (const [output, value] of Object.entries(result.metafile.outputs)) {
  stats[output] = value.bytes;
  console.log(output, chalk.bold.green(bytes(value.bytes)));
}

fs.writeFileSync("stats.json", JSON.stringify(stats));
