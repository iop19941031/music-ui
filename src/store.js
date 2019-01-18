import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const music = {
  namespaced: true,
  state: {
    list: []
  }
}
export default new Vuex.Store({
  strict: true,
  modules: {
    music
  }
})
