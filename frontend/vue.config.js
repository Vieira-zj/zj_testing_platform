const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src')).set('src', resolve('src'))
    config.plugin('html').tap(args => {
      args[0].title = 'testing-platform'
      return args
    })
  },
  // dev server for cors
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_apiServer,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
}
