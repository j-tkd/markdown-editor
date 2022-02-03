const MODE = "development";

const enabledSourceMap = MODE === "development";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = [
  {
    // main process
    entry: {
      "main/index": "./src/main/index.js",
      //   "renderer/App": "./src/renderer/App.jsx",
    },
    output: {
      path: path.resolve(__dirname, "dist/main"),
      filename: "index.js",
    },
    target: "electron-main",
    // node: {
    //   __dirname: false,
    //   __filename: false,
    // },
    module: {
      rules: [
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
  },
  {
    // renderer process
    entry: {
      //   "main/index": "./src/main/index.js",
      "renderer/root": "./src/renderer/App.jsx",
    },
    output: {
      path: path.resolve(__dirname, "dist/renderer"),
      filename: "renderer.js",
    },
    target: "electron-renderer",
    node: {
      __dirname: false,
      __filename: false,
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.css/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { url: false, sourceMap: enabledSourceMap },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "/public/index.html"),
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
    },
  },
];

module.exports = config;
