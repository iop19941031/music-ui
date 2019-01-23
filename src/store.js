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
    list: [],
    loading: false,
    loadMusicEvent: false
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
    setShowListIndex (state, index) {
      state.showListIndex = index
    },
    setTableList (state, list) {
      state.tableList = list
    },
    loadInsufficient (state, residue) {
      for (let i = 0 + state.showListIndex; i < (residue + state.showListIndex); ++i) {
        state.tableList.push(state.list[i])
      }
      state.showListIndex = state.list.length
    },
    loadSufficient (state) {
      state.showListIndex = state.showListIndex + 100
      for (let i = state.showListIndex - 100; i <= state.showListIndex; ++i) {
        state.tableList.push(state.list[i])
      }
    },
    loadInit (state, responseData) {
      state.list = []
      const musicNum = responseData.length - 1
      for (let i = 1; i < responseData.length; i++) {
        let data = {
          id: i,
          name: responseData[i]
        }
        state.list.push(data)
        state.loading = false
      }
      state.tableList = []
      if (musicNum < 100) {
        for (let i = 0; i <= musicNum; ++i) {
          state.tableList.push(state.list[i])
        }
        state.showListIndex = musicNum
      } else {
        for (let i = 0; i < 100; ++i) {
          state.tableList.push(state.list[i])
        }
        state.showListIndex = 100
        state.loadMusicEvent = true
      }
      console.log(`当前显示音乐数量:${state.showListIndex}`)
    },
    setLoading (state, value) {
      state.loading = value
    },
    setLoadMusicEvent (state, value) {
      state.loadMusicEvent = value
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
