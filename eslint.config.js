import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: { js },
        extends: ["js/recommended"],
    },
    {
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: { globals: globals.node },
    },
    {
        files: ["**/*.{js,mjs,cjs}"],
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn",
        },
    },
]);
