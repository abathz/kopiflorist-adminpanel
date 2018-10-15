const path = require('path')
const webpack = require('webpack')
const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withTypescript = require('@zeit/next-typescript')

module.exports = withTypescript(withSass(withCss({
  webpack (config, options) {
    config.resolve.alias = {
      container: path.resolve(__dirname, 'src/container'),
      container: path.resolve(__dirname, 'src/container'),
      actions: path.resolve(__dirname, 'src/actions'),
      reducers: path.resolve(__dirname, 'src/reducers'),
      routes: path.resolve(__dirname, './routes')
    }

    config.module.rules.push({
      test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
      use: [ 'raw-loader' ]
    })

    return config
  }
})))
