import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ELEMENT from 'element-ui'
import './element-variables.scss'

Vue.config.productionTip = false

Vue.use(ELEMENT)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
