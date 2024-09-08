// @ts-check
import fs from "fs";
import esbuild from "esbuild";
import { autoEnv } from "esbuild-plugin-auto-env";

const result = await esbuild.build({
  entryPoints: ["src/extension.ts"],
  bundle: true,
  platform: "node",
  outfile: "dist/extension.js",
  minify: true,
  metafile: true,
  alias: {
    "@package": "../package.json",
  },
  external: ["vscode", "../package.json"],
  plugins: [autoEnv()],
});

console.log(esbuild.analyzeMetafileSync(result.metafile, { color: true }));

const stats = {};
for (const [output, value] of Object.entries(result.metafile.outputs)) {
  stats[output] = value.bytes;
}

fs.writeFileSync("stats.json", JSON.stringify(stats));
