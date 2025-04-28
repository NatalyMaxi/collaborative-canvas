const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@components": path.resolve(__dirname, "src/components"),
    "@tools": path.resolve(__dirname, "src/tools"),
    // Добавь другие алиасы по мере необходимости
  })
);
