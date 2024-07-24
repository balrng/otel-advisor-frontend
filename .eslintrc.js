module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential", // or vue3-strongly-recommended, vue3-recommended
    "eslint:recommended",
    "@vue/prettier",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    // Custom rules here
  },
};
