
module.exports = {
  context: __dirname + "/examples",
  entry: "./index.js",
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
