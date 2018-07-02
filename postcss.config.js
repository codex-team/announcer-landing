const path = require("path")

module.exports = {
  parser: 'postcss',
  plugins: [
    require('postcss-import')(),
    require('postcss-nested')(),
    require('postcss-cssnext')(),
    require('postcss-url')({
      url: 'copy',
      basePath: path.resolve('src/assets'),
      assetsPath: './assets'
    }),
    require('postcss-minimize')(),
  ],
  map: false
}
