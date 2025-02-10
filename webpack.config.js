const path = require("path");

module.exports = {
  entry: "./examples/browser-example.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      fs: false,
      path: false,
    },
  },
  output: {
    filename: "browser-example.js",
    path: path.resolve(__dirname, "dist"),
    library: {
      name: "FrogiLogs",
      type: "window",
    },
  },
};
