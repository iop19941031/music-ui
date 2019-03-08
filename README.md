技术栈 vue2 + vuex + ES6 + axios + SCSS

dome：http://120.78.54.234:5000/

需要配置后端访问本地音乐文件夹，详情：https://github.com/iop19941031/music-server

## Project setup
npm install
### Compiles and hot-reloads for development
npm run serve
### Compiles and minifies for production
npm run build
### Run your tests
npm run test
### Lints and fixes files
npm run lint
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

目标功能

    首屏加载优化（开发阶段关闭）
    显示从服务器端获取到的所有歌曲信息
    播放歌曲的定位
    下一首歌功能，上一首功能，音乐播放历史
    播放器隐藏功能
    随机播放功能，其余播放功能待开发
    音乐播放历史功能（未完成，封存代码中）
    控制音乐播放、暂停组件（封存代码中）
    控制音量组件（未开发）
    控制音乐进度组件（未开发）
    音乐分类（未开发）
    项目结构

.

    |-- dist                      编译后的文件目录
    |-- node_modules              依赖包
    |-- public                    模板文件和静态资源
    |-- src                       开发目录（配置完成后基本只在该文件夹开发即可）
    |   |-- assets                      资源，如 css、image、iconfont
    |   |-- components                  组件
    |   |-- views                       路由组件，即某个路由直接指向该组件
    |   |-- element-variables.scss      Element-ui自定义主题
    |   |-- App.vue                     根组件
    |   |-- router.js                   路由 vue-router
    |   |-- store.js                    状态 vuex
    |   └── main.js                     项目入口
    |-- tests                     单元测试
    |   └── unit                        测试实例
    |-- .browserslistrc           配置支持的浏览器范围，babel会根据这个进行 Polyfill
    |-- .editorconfig             设置该项目的编辑器的配置
    |-- .eslintrc.js              eslint 配置
    |-- .gitignore                git 忽略目录
    |-- babel.config.js           babel 配置
    |-- package.json              项目依赖列表
    |-- postcss.config.js         postcss 配置
    |-- README.md                 项目描述
    └── vue.config.js             项目配置及 webpack 配置
