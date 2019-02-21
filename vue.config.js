module.exports = {
  devServer: {
    progress: true,
    inline: true,
    hot: true,
    historyApiFallback: true,
    port: 5001,
    proxy: {
      // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，
      // 你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置。
      '/*': {
        ws: false,
        target: 'http://localhost:5000',
        // target: '',
        secure: false,
        changeOrigin: true
      }
    }
  },
  // webpack配置
  chainWebpack: () => {},
  configureWebpack: {
    // if (process.env.NODE_ENV === 'production') {
    //   // 为生产环境修改配置...
    // } else {
    // // 为开发环境修改配置...
    // }
    output: {
      libraryExport: 'default'
    },
    externals: {
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT'
    }
  },
  // 基本路径
  baseUrl: undefined, // Type: string,Default: '/',部署应用包时的基本 URL。
  // 输出文件目录
  outputDir: undefined, /// Type: string,Default: 'dist',当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
  assetsDir: undefined, // Type: string,Default: '',放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  runtimeCompiler: false, // Type: boolean,Default: false,是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true, // Type: boolean,Type: boolean,Default: true,如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  parallel: undefined, // Type: boolean,Default: require('os').cpus().length > 1,是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建
  css: {
    sourceMap: false // Type: boolean,Default: false,是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
  }
}
