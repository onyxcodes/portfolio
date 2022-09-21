const path = require("path");

module.exports = {
  "stories": [
    "../src/components/**/*.stories.mdx",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5",
    "disableTelemetry": true,
  },
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        // "style-loader","css-loader", 
        {
          loader: 'sass-loader',
          // options: {
          //   implementation: require('sass')
          // }
        }
      ]
    });

    config.resolve.alias = { ...config.resolve.alias,
      'styles': path.resolve(__dirname, "../src/styles"),
      'components': path.resolve(__dirname, "../src/components"),
      'views': path.resolve(__dirname, "../src/views"),
      'assets': path.resolve(__dirname, "../src/assets"),
      'features': path.resolve(__dirname, "../src/features"),
      'store': path.resolve(__dirname, "../src/store"),
      'utils': path.resolve(__dirname, "../src/utils"),
    }

    // Return the altered config
    return config;
  },

}