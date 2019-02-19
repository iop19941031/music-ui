<template>
  <div class="music-play" :class="{show : musicShow, music: lockStatus}">
    <el-row>
      <el-col class="lock" :offset="21" :span="2" >
        <span :class="{lock_status : lockStatus, unlock_status : !lockStatus  }" @click="lockEvent">&ensp;&ensp;</span>
      </el-col>
      <el-col :span="24">
        <h3>{{name}}</h3>
        <audio
        autoplay="autoplay"
        controls="controls"
        ref="audio"
        :src="src"
        type="audio/mpeg"
        preload="meta">
          Your browser does not support the <code>audio</code> element.
          <!-- <source src="../../music/1.mp3"  type="audio/mpeg"> -->
        </audio>
        <br />
        <button class="music-button before" @click="beforeButton">&ensp;&ensp;</button>
        <button class="music-button" :class="{ready_play: !playing, playing: playing}" @click="onPlay" >&ensp;&ensp;</button>
        <button class="music-button later" @click="laterButton" circle>&ensp;&ensp;</button>
        <!-- <el-tooltip content="播放历史" placement="right" :open-delay=500>
          <el-badge :value="history.length" class="item">
            <el-button type="info" @click="alertQueryHistory" icon="el-icon-service" circle></el-button>
          </el-badge>
        </el-tooltip> -->
        <el-badge :value="history.length" class="item">
            <!-- <button class="history"  circle>&ensp;&ensp;</button> -->
            <el-button class="history" @click="alertQueryHistory" type="primary">&ensp;&ensp;</el-button>
        </el-badge>
      </el-col>

    </el-row>
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
    this.$refs.audio.volume = 0.3
  },
  data () {
    return {
      musicShow: false,
      lockStatus: true,
      historyList: '',
      path: '/CloudMusic/',
      musicMaxNum: 99// 随机的歌曲数量
    }
  },
  methods: {
    lockEvent () {
      if (this.lockStatus) {
        this.lockStatus = false
        this.musicShow = true
      } else {
        this.lockStatus = true
        this.musicShow = false
      }
    },
    // 播放新的歌曲
    newMusic () {
      const currentMusicName = this.list[Math.floor(Math.random() * (this.musicMaxNum - 1)) + 1].name

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

        const music = Object.create(null)
        music.index = beforeIndex
        music.name = this.history[beforeIndex]
        music.src = this.path + this.history[beforeIndex]

        console.log(music.index + '------------' + music.name)
        this.addHistoryIndex(music)
      } else {
        console.log('前面没有播放记录')
      }
    },
    // 下一首歌功能
    laterButton () {
      if (this.list.length !== 0) {
        if (this.historyIndex !== 0) {
          const laterIndex = this.historyIndex - 1

          const music = Object.create(null)
          music.index = laterIndex
          music.name = this.history[laterIndex]
          music.src = this.path + this.history[laterIndex]

          console.log(music.index + '------------' + music.name)
          this.addHistoryIndex(music)
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
        this.$refs.audio.play()
        this.changePlaying(true)
      }
    },
    ...mapMutations('music', ['addHistory', 'addHistoryIndex', 'changePlaying'])
  },
  computed: {
    ...mapState('music', ['name', 'list', 'history', 'historyIndex', 'src', 'playing'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
// box-shadow: 0px 0px 0px 1px #f2f6fc;
.music-play{
  border-color: #ff000000 !important;
  div {
    div{
      background: #303133f5;
    }
    .lock{
      height: 14px;
      border-bottom: 14px solid #303133;
      border-left: 9px solid #f4f4f4 !important;
      border-right: 9px solid #f4f4f4;
      .lock_status {
        background-position: center;
        background-repeat: no-repeat;
        background-size: 11px;
        background-image: url('../assets/dark_unlock.png') ;
        cursor:pointer;
      }
      .lock_status:hover {
        background-image: url('../assets/undertint_unlock.png');
      }
      .unlock_status {
        background-position: center;
        background-repeat: no-repeat;
        background-size: 11px;
        background-image: url('../assets/dark_lock.png') ;
        cursor:pointer;
      }
      .unlock_status:hover {
        background-image: url('../assets/undertint_lock.png') ;
      }
    }
    .music-button {
      background-color: black;
      border: 2px solid white;
      background-size: 14px;
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 19px;
      height: 30px;
      width: 30px;
      margin: 0px 8px;
    }
    .music-button:hover {
      box-shadow: 0px 0px 0px 1px #f2f6fc;
    }
    .before{
      background-image: url('../assets/before.png') ;
    }
    .later {
      background-image: url('../assets/later.png') ;
    }
    .ready_play, .playing {
      background-size: 24px;
      border-radius: 22px;
      height: 40px;
      width: 40px;
    }
    .ready_play {
      background-image: url('../assets/ready-play.png') ;
    }
    .playing {
      background-image: url('../assets/pause.png') ;
    }
    .history {
      background-image: url(/img/history.2900a25e.png);
      border: 1px solid white;
      background-color: black;
      background-position: center;
      border-radius: 8px;
      background-repeat: no-repeat;
      background-size: 21px;
      height: 32px;
      width: 31px;
      padding: 0px;
    }
    .history:hover {
      box-shadow: 0px 0px 0px 1px #f2f6fc;
    }
  }
}
.music{
  bottom: -159px;
}
.show{
  bottom: 0px ;
}
.music:hover{
  animation:myfirst 1s;
  -webkit-animation:myfirst 1s; /* Safari and Chrome */
  bottom: 0px;
}
@keyframes myfirst{
0% {bottom: -60px;}
100% { bottom: 0px;}
}

/* Safari and Chrome */
@-webkit-keyframes myfirst {
0% {bottom: -60px;}
100% { bottom: 0px;}
}
</style>
