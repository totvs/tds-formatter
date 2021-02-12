const path = require("path");

const TerserPlugin = require("terser-webpack-plugin");

const CONFIG_FORMATTER_PATH = path.join(__dirname, "./src/config/");

module.exports = {
  target: "node",
  optimization: {
    minimize: false,
    minimizer: [new TerserPlugin()],
  },
  //O webpack, pega todos os fontes tsx e os compacta em um unico arquivo .js. Isso é feito para contornar algumas limitações e alguns browsers que não aceitam a instrução import.
  //O entry pode ser definido com um objeto. A chave, ou no nome da propriedade, nesse caso sera o nome de saida do arquivo.
  entry: {
    configPanel: path.join(CONFIG_FORMATTER_PATH, "app/index.tsx")
  },
  output: {
    //Todos os arquivos tsx serão compilados e gerados seus equivalentes js na mesma pasta
    path: path.resolve(__dirname, "./out/webpack"),
    //O [name] abaixo é o que foi definido no "entry" acima, ou seja, o arquivo gerado tera  o nome timeLineView.js
    filename: "[name].js",
  },
  devtool: "eval-source-map",
  externals: {
    // the vscode-module is created on-the-fly and must be excluded.
    //Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
    vscode: "commonjs vscode",
  },
  resolve: {
    extensions: [
      ".js",
      ".ts",
      ".tsx",
      ".json",
      ".bundle.json",
      ".bundle.*.json",
    ],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: CONFIG_FORMATTER_PATH,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.join(CONFIG_FORMATTER_PATH, "./app/tsconfig.json"),
            },
          },
        ],
      },
      {
        test: /\.(bundle\.json|bundle\.*\.json)$/,
        loader: "i18n-loader",
      },
    ],
  },
  performance: {
    hints: "warning",
  },
};
