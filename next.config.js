const path = require('path')
const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withTypescript = require('@zeit/next-typescript')

module.exports = withTypescript(withSass(withCss({
  webpack (config, options) {
    config.resolve.alias = {
      container: path.resolve(__dirname, 'src/container'),
      components: path.resolve(__dirname, 'src/components'),
      actions: path.resolve(__dirname, 'src/actions'),
      reducers: path.resolve(__dirname, 'src/reducers'),
      routes: path.resolve(__dirname, './routes')
    }

    config.plugins.push(new LodashModuleReplacementPlugin())
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))

    return config
  }
})))
