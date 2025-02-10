const path = require("path");

module.exports = {
  entry: "./src/index.js",
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
    filename: "frogilogs.js",
    path: path.resolve(__dirname, "dist"),
    library: {
      name: "FrogiLogs",
      type: "umd",
      umdNamedDefine: true,
    },
    globalObject: "this",
  },
};
