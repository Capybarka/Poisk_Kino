import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import globals from "globals";
import vueEslintParser from "vue-eslint-parser";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.vue"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.browser,
        defineProps: "readonly",
        defineEmits: "readonly",
      },
      parser: vueEslintParser,
    },
    plugins: {
      vue,
    },

    rules: {
      quotes: [2, "single"],
      "no-unused-vars": "off",
      "sort-vars": "off",
      "one-var": "off",
      "no-eval": "warn",
      "vue/html-indent": 2,
      "vue/valid-v-slot": [
        "error",
        {
          allowModifiers: true,
        },
      ],
      "vue/max-attributes-per-line": [
        "error",
        {
          singleline: {
            max: 1,
          },
          multiline: {
            max: 1,
          },
        },
      ],
      "vue/first-attribute-linebreak": [
        "error",
        {
          singleline: "ignore",
          multiline: "below",
        },
      ],
      "no-empty": [
        "error",
        {
          allowEmptyCatch: true,
        },
      ],
      "no-fallthrough": "off",
      semi: ["error", "always"],
      "space-before-function-paren": [
        "error",
        {
          named: "never",
          anonymous: "always",
          asyncArrow: "always",
        },
      ],
      "space-in-parens": ["error", "never"],
      curly: "error",
      "keyword-spacing": "error",
      "vue/no-mutating-props": "warn",
      "vue/component-definition-name-casing": "off",
      "vue/no-unused-components": "warn",
      "vue/require-prop-types": "error",
    },
  },
];
