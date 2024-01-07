const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  resolve: {
    extensions: [".js", ".ts"],
  },
  target: "node",
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, "dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
        ],
      },
    ],
  },
};