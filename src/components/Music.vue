<template>
  <div class="music-play" :class="{show : musicShow, music: lockStatus}">
    <div style="flex:1"></div>
    <div style="flex:1"><button class="before" @click="beforeButton">&ensp;&ensp;</button></div>
    <div style="flex:1"><button :class="{ready_play: !playing, playing: playing}" @click="onPlay" >&ensp;&ensp;</button></div>
    <div style="flex:1"><button class="later" @click="laterButton" circle>&ensp;&ensp;</button></div>
    <div style="flex:5;"><h3>{{name}}</h3></div>
    <div style="flex:1;"><Fader class="player" @volumeEvent="faderMusic"/></div>
    <div style="flex:1">
      <el-badge :value="this.history.length" class="item">
        <button class="history" @click="alertQueryHistory"></button>
      </el-badge>
    </div>
    <div class="status" style="flex:1">
        <span :class="{lock_status : lockStatus, unlock_status : !lockStatus  }" @click="lockEvent">&ensp;&ensp;</span>
    </div>

    <audio
        autoplay
        ref="audio"
        :src="src"
        type="audio/mpeg"
        preload="meta">
      Your browser does not support the <code>audio</code> element.</audio>

    <!--

     <div class="music-controls">
        <el-col :span="6">
          <h5>{{name}}</h5>
        </el-col>
        <el-col :span="6">
          <el-col :span="5">
            <button class=" volume" @click="laterButton" circle>&ensp;&ensp;</button>
          </el-col>
          <el-col :span="17">
            <el-progress :percentage="70" :show-text="false"  color="#8e71c7"></el-progress>
          </el-col>

        </el-col>

      </div>

    </el-row> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Fader from './Fader.vue'
// import axios from 'axios'
export default {
  mounted () {
    // 自动播放
    this.$refs.audio.onended = () => {
      this.newMusic()
    }
    // this.$refs.audio.volume = 0.3
  },
  data () {
    return {
      fader_visual: '100%',
      musicShow: false, // 播放器显示
      lockStatus: true, // 是否锁定播放器显示
      historyList: '',
      path: '/CloudMusic/',
      musicMaxNum: 40// 随机的歌曲数量
    }
  },
  methods: {
    faderMusic (volume) {
      this.$refs.audio.volume = volume
    },
    lockEvent () {
      this.lockStatus = !this.lockStatus
      this.musicShow = !this.lockStatus
    },
    // 播放新的歌曲
    newMusic () {
      const randomID = Math.floor(Math.random() * (this.musicMaxNum - 1)) + 1
      const currentMusicName = this.list[randomID].name
      this.setMusicID(randomID + 1)

      this.changePlaying(true)

      const node = Object.create(null)
      node.current = currentMusicName
      node.name = currentMusicName
      node.src = this.path + currentMusicName

      this.addHistory(node)
    },
    // 上一首歌功能
    beforeButton () {
      if (this.historyIndex < (this.history.length - 1)) {
        const beforeIndex = this.historyIndex + 1

        this.changePlaying(true)

        this.setMusicID(this.beforeMusicID)

        const music = Object.create(null)
        music.index = beforeIndex
        music.name = this.history[beforeIndex]
        music.src = this.path + this.history[beforeIndex]

        // console.log(music.index + '------------' + music.name)
        this.changeHistoryIndex(music)
      } else {
        alert('前面没有播放记录')
      }
    },
    // 下一首歌功能
    laterButton () {
      if (this.list.length !== 0) {
        if (this.historyIndex !== 0) {
          const laterIndex = this.historyIndex - 1

          this.setMusicID(laterIndex)

          const music = Object.create(null)
          music.index = laterIndex
          music.name = this.history[laterIndex]
          music.src = this.path + this.history[laterIndex]

          // console.log(music.index + '------------' + music.name)
          this.changeHistoryIndex(music)
        } else {
          this.newMusic()
        }
      } else {
        console.log('请加载')
      }
    },
    // 查询历史
    alertQueryHistory () {
      this.$alert(this.getHistoryList(), '播放历史', {
        showConfirmButton: false,
        closeOnPressEscape: true,
        dangerouslyUseHTMLString: true,
        customClass: 'history',
        callback: () => {}
      })
    },
    getHistoryList () {
      this.historyList = ''
      this.history.forEach((item, index, array) => {
        this.historyList += `<p class="row-history">${item}</p>`
      })
      return this.historyList
    },
    onPlay () {
      if (this.playing) {
        this.$refs.audio.pause()
        this.changePlaying(false)
      } else {
        if (this.history.length !== 0) {
          this.$refs.audio.play()
        } else {
          this.laterButton()
        }
        this.changePlaying(true)
      }
    },
    ...mapMutations('music', ['addHistory', 'changeHistoryIndex', 'changePlaying', 'setMusicID'])
  },
  computed: {
    ...mapState('music', [
      'name',
      'list',
      'history',
      'historyIndex',
      'src',
      'playing',
      'beforeMusicID'])

  },
  components: {
    Fader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@mixin music-button($height: 30px, $width:30px, $radius: 19px, $background-size: 14px) {
  background-color: black;
  border: 2px solid white;
  background-size: $background-size;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: $radius;
  height: $height;
  width: $width;
  margin: 0px 8px;
  &:hover {
    box-shadow: 0px 0px 0px 1px #f2f6fc;
  }
}
.lock {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 11px;
  cursor:pointer;
}
.music-play{
  padding: 10px 0;
  z-index: 99;
  border: 0px !important;
  min-width: 1000px;
  display: flex;
  background: #38393b;
  align-items: center;
  .player {
    flex-grow: 1;
  }
  .before{
    @include music-button;
    background-image: url('../assets/player/before.png') ;
  }
  .later {
    @include music-button;
    background-image: url('../assets/player/later.png') ;
  }
  .ready_play {
    @include music-button(40px, 40px, 20px, 25px);
    background-position-x: 7px;
    background-image: url('../assets/player/ready-play.png') ;
  }
  .playing {
    @include music-button(40px, 40px, 20px, 25px);
    background-image: url('../assets/player/pause.png') ;
  }
  //   .volume {
  //     background-image: url('../assets/player/volume.png') ;
  //   }
  .history {
    @include music-button(40px, 40px, 10px, 25px);
    background-image: url('../assets/player/history.png');
  }
  .original-music-controls{
    background: #303133f5;
    height: 105px;

  }
  .status {
    width: 60px;
    height: 0;
    border-bottom: 20px solid #38393b;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    margin-top: -90px;
    .lock_status {
      @extend .lock;
      background-image: url('../assets/lock/dark_unlock.png') ;
      &:hover {
        background-image: url('../assets/lock/undertint_unlock.png');
      }
    }
    .unlock_status {
      @extend .lock;
      background-image: url('../assets/lock/dark_lock.png') ;
      &:hover {
        background-image: url('../assets/lock/undertint_lock.png') ;
      }
    }
  }
}
.music{
  bottom: -78px;
  &:hover {
    animation:myfirst 1s;
    bottom: 0px;
  }
}
.show{
  bottom: 0px;
}
@keyframes myfirst{
  0% {bottom: -78px;}
  100% { bottom: 0px;}
}
</style>
