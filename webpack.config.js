// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackFavicons = require('webpack-favicons');
const isProduction = process.env.NODE_ENV == "production";
require('dotenv').config({ path: './.env' }); 

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: '/',
    filename: '[name].[contenthash].js',
    clean: true,
  },
  devServer: {
    host: "localhost",
    open: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.EnvironmentPlugin({
      API_ENDPOINT: JSON.stringify(process.env.API_ENDPOINT),
      DISQUS_ENABLED: JSON.stringify(process.env.DISQUS_ENABLED),
      DISQUS_SHORTNAME: JSON.stringify(process.env.DISQUS_SHORTNAME),
      API_TOKEN: JSON.stringify(process.env.API_TOKEN),
      G_ANALYTICS_MEASUREMENT_ID: JSON.stringify(process.env.G_ANALYTICS_MEASUREMENT_ID),
      G_ANALYTICS_ENABLED: JSON.stringify(process.env.G_ANALYTICS_ENABLED),
      ADSENSE_ENABLED: JSON.stringify(process.env.ADSENSE_ENABLED),
      ADSENSE_CLIENT_ID: JSON.stringify(process.env.ADSENSE_CLIENT_ID),
    }),
    // TODO: Substitute with a working lib or alternative solution
  //   new WebpackFavicons({
  //     src: 'src/assets/favicon.svg',
  //     path: 'assets/',
  //     background: '#000',
  //     theme_color: '#000',
  //     icons: {
  //       favicons: true
  //     },
  //     appName: 'Portfolio',
  //     developerName: 'Onyx Ganda',
  //     developerUrl: 'https://onyxganda.com',
  //     start_url: '/'
  // }),
  ],
  module: {
    rules: [
      {
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false
      }
    },
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader","css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader","css-loader", 
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader","css-loader",
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                  javascriptEnabled: true,
              }
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      maxSize: 300000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.css', ".tsx", ".ts"
    ],
    alias: {
      'styles': path.resolve(__dirname, "src/styles"),
      'components': path.resolve(__dirname, "src/components"),
      'hooks': path.resolve(__dirname, "src/hooks"),
      'views': path.resolve(__dirname, "src/views"),
      'assets': path.resolve(__dirname, "src/assets"),
      'features': path.resolve(__dirname, "src/features"),
      'store': path.resolve(__dirname, "src/store"),
      'utils': path.resolve(__dirname, "src/utils"),
    },
  },
};

module.exports = () => {
  if (isProduction) {
    console.log('Building with production config');
  } else {
    console.log('Building with development config');
  }
  return config;
};
