module.exports = {
    devServer: {
      proxy: {
        '/api': {
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }