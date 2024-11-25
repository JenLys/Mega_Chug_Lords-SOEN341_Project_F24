import js from "@eslint/js";
import globals from "globals";
import jest from "eslint-plugin-jest";
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      jest,
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];
