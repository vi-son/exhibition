const packageName = require("./package.json").name;
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = env => {
  console.log(`ENV: ${env.NODE_ENV} / ${env.production}`);

  return {
    mode: "development",
    devServer: {
      port: 1234,
      historyApiFallback: true
    },
    entry: {
      index: path.resolve(__dirname, "src/js/museum.js")
    },
    output: {
      path: path.resolve(__dirname, "build/"),
      publicPath: "/",
      filename: "[name].bundle.js",
      chunkFilename: "[name].bundle.js"
    },
    resolve: {
      extensions: [".js"],
      alias: {
        "artwork.logo": path.join(__dirname, "src/artworks/logo/src/"),
        "artwork.audiovisio": path.join(
          __dirname,
          "src/artworks/audiovisio/src/"
        )
      }
    },
    optimization: {
      splitChunks: {
        chunks: "all"
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.(woff(2)?|ttf|otf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/"
              }
            }
          ]
        },
        {
          test: /\.(glsl|frag|vert)$/,
          use: ["glslify-import-loader", "raw-loader", "glslify-loader"],
          exclude: /node_modules/
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "babel-loader"
            },
            {
              loader: "react-svg-loader",
              options: {
                jsx: true // true outputs JSX tags
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV)
      }),
      new HtmlWebpackPlugin({
        template: __dirname + "/src/html/index.html",
        filename: "index.html",
        inject: "body"
      }),
      new FaviconsWebpackPlugin(
        path.resolve(`${__dirname}/assets/svg/favicon.svg`)
      ),
      new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname, "assets"), to: "assets" },
          {
            from: path.resolve(__dirname, "src/artworks/logo/assets"),
            to: "assets"
          },
          {
            from: path.resolve(__dirname, "src/artworks/audiovisio/assets"),
            to: "assets"
          }
        ]
      }),
      new WorkboxPlugin.GenerateSW({
        swDest: "sw.js",
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: new RegExp("http://localhost:1234/*.js"),
            handler: "StaleWhileRevalidate"
          }
        ],
        maximumFileSizeToCacheInBytes: 15000000
      })
    ]
  };
};
