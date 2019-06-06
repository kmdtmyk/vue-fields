module.exports = (storybookBaseConfig, configType, defaultConfig) => {

  defaultConfig.module.rules.push(
    {
      test: /\.pug$/,
      loader: 'pug-plain-loader',
    },
    {
      test: /\.scss$/,
      loader: ['style-loader', 'css-loader', 'sass-loader']
    },
    // {
    //   test: /\.vue$/,
    //   loader: 'storybook-addon-vue-info/loader',
    //   enforce: 'post'
    // }
  )

  return defaultConfig
}

