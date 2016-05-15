
module.exports = {
  context: __dirname + "/examples",
  entry: {
    javascript: "./index.js",
    html: "./index.html"
  },
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader"]
      },
      {
        test: /\.html$/,
        loaders: ["react-hot", "file?name=[name].[ext]"]
      }
    ]
  }
};
