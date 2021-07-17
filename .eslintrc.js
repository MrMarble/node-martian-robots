module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["standard", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "dot-notation": "off",

    // Fix for `no-unused-vars` triggering with typescript
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
  },
};
