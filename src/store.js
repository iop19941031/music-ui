import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const music = {
  namespaced: true,
  state: {
    src: '',
    history: [],
    historyIndex: 0,
    currentMusicID: 0,
    beforeMusicID: 0,
    name: '无播放音乐',
    tableList: [],
    showListIndex: 0,
    list: [],
    loading: false,
    loadMusicEvent: false,
    playing: false
  },
  mutations: {
    setMusicID (state, id) {
      state.beforeMusicID = state.currentMusicID
      state.currentMusicID = id
    },
    changePlaying (state, playing) {
      state.playing = playing
    },
    setSrc (state, src) {
      state.src = src
    },
    addHistory (state, node) {
      state.history.unshift(node.current)
      state.name = node.name
      state.src = node.src
    },
    addHistoryIndex (state, music) {
      state.historyIndex = music.index
      state.name = music.name
      state.src = music.src
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
      function MusicData (id, name) {
        this.id = id
        this.name = name
      }
      const musicNum = responseData.length - 1
      for (let i = 1; i < responseData.length; i++) {
        state.list.push(new MusicData(i, responseData[i]))
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
