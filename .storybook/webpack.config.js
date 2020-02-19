module.exports = ({config, mode}) => {

  config.module.rules.push(
    {
      test: /\.pug$/,
      loader: 'pug-plain-loader',
    },
    {
      test: /\.scss$/,
      loader: ['style-loader', 'css-loader', 'sass-loader']
    },
    {
      test: /\.stories\.jsx?$/,
      loaders: [
        {
          loader: require.resolve('@storybook/source-loader'),
        },
      ],
      enforce: 'pre',
    },
    // {
    //   test: /\.vue$/,
    //   loader: 'storybook-addon-vue-info/loader',
    //   enforce: 'post'
    // },
  )

  return config
}

