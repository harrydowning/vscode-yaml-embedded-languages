// @ts-check

import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["dist/*"],
  },
  {
    languageOptions: {
      globals: globals.node, // TODO: not working, check github/raise issue
    },
  },
);
