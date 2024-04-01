// webpack.server.js
const path = require("path");

/** @type {import('webpack').Configuration} */
module.exports = {
    target: "node",
    mode: "development",
    entry: path.resolve(__dirname, "./src/server.js"),
    resolve: {
      extensions: [".ts", ".js", ".tsx", ".jsx"],
    },
    output: {
      filename: "server.js",
      path: path.resolve(__dirname, "./build"),
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
      ],
    },
  };