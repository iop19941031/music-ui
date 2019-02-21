import Vuex from 'vuex'

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
    loading: false,
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
    loadInit (state, responseData) {
      state.list = []
      function MusicData (id, name) {
        this.id = id
        this.name = name
      }
      for (let i = 1; i < responseData.length; i++) {
        state.list.push(new MusicData(i, responseData[i]))
        state.loading = false
      }
    },
    setLoading (state, value) {
      state.loading = value
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
