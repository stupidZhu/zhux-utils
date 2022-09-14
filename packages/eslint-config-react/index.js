module.exports = {
  extends: ["ts", "plugin:react-hooks/recommended", "plugin:react/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["react", "react-hooks"],
  rules: { "react/prop-types": "off" },
}
