<template>
  <div class="music">
    <h3>{{name}}</h3>
    <audio
    autoplay="autoplay"
    controls="controls"
    ref="audio"
    :src="name"
    type="audio/mpeg"
    preload="meta">
      Your browser does not support the <code>audio</code> element.
      <!-- <source src="../../music/1.mp3"  type="audio/mpeg"> -->
    </audio>
    <br />
    <el-button type="info" @click="before" icon="el-icon-arrow-left" size="medium" circle></el-button>
    <el-button type="info" @click="onPlay" icon="el-icon-caret-right" circle></el-button>
    <el-button type="info" @click="later" icon="el-icon-arrow-right" size="medium" circle></el-button>
    <el-button type="info" @click="queryHistory" icon="el-icon-service" circle></el-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// import axios from 'axios'
export default {
  mounted () {
    // 音乐播放结束
    this.$refs.audio.onended = () => {
      this.newMusic()
    }
  },
  data () {
    return {
      playing: false
    }
  },
  methods: {
    newMusic () {
      const currentMusicName = this.list[Math.floor(Math.random() * (2585 - 1)) + 1].name
      this.addHistory(currentMusicName)
      this.setName(this.musicApi + currentMusicName)
    },
    // 上一首歌功能
    before () {
      if (this.historyIndex < (this.history.length - 1)) {
        this.addHistoryIndex(this.historyIndex + 1)
        this.setName(this.musicApi + this.history[this.historyIndex])
      } else {
        console.log('前面没有播放记录')
      }
    },
    // 下一首歌功能
    later () {
      if (this.history.length !== 0) {
        if (this.historyIndex !== 0) {
          this.addHistoryIndex(this.historyIndex - 1)
          this.setName(this.musicApi + this.history[this.historyIndex])
        } else {
          this.newMusic()
        }
      } else {
        console.log('请加载')
      }
    },
    queryHistory () {
      console.log(`现在播放的音乐是：${this.history[this.historyIndex]}，第${this.historyIndex}首歌`)
      console.log(this.history)
    },
    play () {
      this.$refs.audio.play()
    },
    onPlay () {
      this.$refs.audio.pause()
    },
    // 当音频暂停
    onPause () {
      this.playing = false
    },
    ...mapMutations('music', ['setName', 'addHistory', 'addHistoryIndex'])
  },
  computed: {
    ...mapState('music', ['name', 'list', 'history', 'historyIndex', 'musicApi'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
