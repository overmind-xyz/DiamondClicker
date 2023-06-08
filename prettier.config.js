module.exports = {
  tailwindConfig: "./web/tailwind.config.js",
  plugins: [require("prettier-plugin-tailwindcss")],
  importOrderSeparation: true,
  pluginSearchDirs: false,
  bracketSpacing: true,
  bracketSameLine: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "es5",
  semi: true,
  printWidth: 110,
  arrowParens: "always",
};
