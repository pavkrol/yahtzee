const HtmlWebPackPlugin = require("html-webpack-plugin");
const CreateFileWebpack = require("create-file-webpack");
const path = require("path");

module.exports = {
  entry: ["@babel/polyfill", "./src/App.js"],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist")
  },
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      favicon: "./src/img/dice.png"
    }),
    new CreateFileWebpack({
      path: "./dist",
      fileName: "_redirects",
      content: "/* /index.html 200"
    })
  ]
};
