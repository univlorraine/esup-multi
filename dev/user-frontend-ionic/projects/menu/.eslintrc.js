module.exports = {
  extends: "../../.eslintrc.js",
  parserOptions: {
    project: __dirname + "/tsconfig.lib.json"
  },
  ignorePatterns: [
    "!**/*"
  ]
}
