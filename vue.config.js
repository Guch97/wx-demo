module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://38m89829d7.zicp.fun',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }