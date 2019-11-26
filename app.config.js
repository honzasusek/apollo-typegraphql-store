const path = require('path')

module.exports = {
  webpack: (config, isDev) => {
    config.module.rules = [
      {
        test: /class-validator/u,
        use: isDev ? 'null-loader' : 'noop-loader',
      },
      {
        test: /google-libphonenumber/u,
        use: isDev ? 'null-loader' : 'noop-loader',
      },
      ...config.module.rules,
    ]
    config.resolve.alias = {
      util: path.resolve(__dirname, './src/utils/mocks/utils.js'),
      glob: path.resolve(__dirname, './src/utils/mocks/emptyModule.js'),
      fs: path.resolve(__dirname, './src/utils/mocks/emptyModule.js'),
      path: path.resolve(__dirname, './src/utils/mocks/emptyModule.js'),
    }

    return config // return the modified config
  },
}
