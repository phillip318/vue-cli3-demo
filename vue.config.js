const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: 'dist',
  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: "static",
  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: false,
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: false,
  /* 代码保存时进行eslint检测 */
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'));
      // config
      // .plugin('webpack-bundle-analyzer')
      // .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
  configureWebpack: (config) => {
    // config.devtool = 'source-map'
    if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_TITLE === 'production') {
      // config.plugins.push(new BundleAnalyzerPlugin())
    }
  },
  
  /* webpack-dev-server 相关配置 */
  devServer: {
    /* 自动打开浏览器 */
    open: false,
    disableHostCheck: true,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: '0.0.0.0',
    port: 80,
    https: false,
    hotOnly: false,
  },
}