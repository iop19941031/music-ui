import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const music = {
  namespaced: true,
  state: {
    history: {},
    name: '空',
    list: []
  },
  mutations: {
    setName (state, name) {
      state.name = name
    },
    setList (state, list) {
      state.list = list
    },
    addList (state, data) {
      state.list.push(data)
    }
  },
  getters: {
    getName (state) {
      return state.name
    },
    getList (state) {
      return state.list
    }
  }
}
export default new Vuex.Store({
  strict: true,
  modules: {
    music
  }
})
