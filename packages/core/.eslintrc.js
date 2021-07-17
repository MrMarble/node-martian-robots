module.exports = {
  rules: {
    "dot-notation": "off",

    // Fix for `no-unused-vars` triggering with typescript
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",

    "no-dupe-class-members": "off",
  },
};
