import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const music = {
  namespaced: true,
  state: {
    apiAddress: 'http://localhost:3000/music/list',
    musicApi: 'http://localhost:3000/CloudMusic/',
    history: [],
    historyIndex: 0,
    name: '空',
    tableList: [],
    showListIndex: 0,
    list: []
  },
  mutations: {
    addHistory (state, node) {
      state.history.unshift(node)
    },
    addHistoryIndex (state, index) {
      state.historyIndex = index
    },
    setName (state, name) {
      state.name = name
    },
    setList (state, list) {
      state.list = list
    },
    addList (state, data) {
      state.list.push(data)
    },
    setShowListIndex (state, index) {
      state.showListIndex = index
    },
    addTableList (state, data) {
      state.tableList.push(data)
    },
    setTableList (state, list) {
      state.tableList = list
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
