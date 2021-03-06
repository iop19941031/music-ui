import Vuex from 'vuex'
import Vue from 'vue'
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
    list: [],
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
    addHistory (state, node) {
      state.history.unshift(node.current)
      state.name = node.name
      state.src = node.src
    },
    changeHistoryIndex (state, music) {
      state.historyIndex = music.index
      state.name = music.name
      state.src = music.src
    },
    loadInit (state, responseData) {
      state.list = []
      function MusicData (id, name) {
        this.id = id
        this.name = name
      }
      for (let i = 1; i < responseData.length; i++) {
        state.list.push(new MusicData(i, responseData[i]))
      }
    }
  }
}
export default new Vuex.Store({
  strict: true,
  modules: {
    music
  }
})
