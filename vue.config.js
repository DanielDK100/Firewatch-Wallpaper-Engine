const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(weba)$/i,
          loader: 'file-loader',
          options: {
            outputPath: 'audios'
          },
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: 'project.json', to: './' },
          { from: 'preview.png', to: './' }
        ]
      }),
    ],
  },
}
