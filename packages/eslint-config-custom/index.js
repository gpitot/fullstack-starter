module.exports = {
  extends: ["turbo", "prettier"],
  rules: {},
  parserOptions: {
    parser: "@typescript-eslint/parser",
    babelOptions: {
      presets: [],
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
      "plugin:prettier/recommended",
      "plugin:import/typescript",
    ],
    plugins: ["import", "@typescript-eslint"],
    rules: {
      "comma-dangle": 0,
      "no-underscore-dangle": 0,
      "no-param-reassign": 0,
      "no-return-assign": 0,
      camelcase: 0,
      "import/extensions": 0,
      "@typescript-eslint/no-redeclare": 0,
      "import/order": 1,
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        typescript: {},
      },
    },
  },
};
