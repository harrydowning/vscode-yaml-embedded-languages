// @ts-check

import esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["dist/extension.js"],
  bundle: true,
  platform: "node",
  outfile: "dist/extension.js",
  allowOverwrite: true,
  minify: true,
  alias: {
    "@package": "../package.json",
  },
  external: ["vscode", "../package.json"],
});
