const path = require('path')
const webpack = require('webpack')
const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withTypescript = require('@zeit/next-typescript')
const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config')

module.exports = withTypescript(withCss(withSass({
  webpack (config, options) {
    if (!options.isServer) {
      config = commonsChunkConfig(config, /\.(scss|css)$/)
    }
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: 'file-loader?name=static/fonts/[name].[ext]'
    })
    config.resolve.alias = {
      container: path.resolve(__dirname, 'src/container'),
      components: path.resolve(__dirname, 'src/components'),
      actions: path.resolve(__dirname, 'src/actions'),
      reducers: path.resolve(__dirname, 'src/reducers'),
      routes: path.resolve(__dirname, './routes')
    }
    config.plugins.push(
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    )

    return config
  }
})))
