const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  publicPath: '',
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        { from: 'project.json', to: './' },
        { from: 'src/assets/images/preview.png', to: './' },
      ])
    ]
  },
}
