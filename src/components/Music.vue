<template>
  <div class="music-play" :class="{show : musicShow, music: lockStatus}">
    <el-row>
      <el-col class="lock" :offset="21" :span="2" >
        <span :class="{lock_status : lockStatus, unlock_status : !lockStatus  }" @click="lockEvent">&ensp;&ensp;</span>
      </el-col>
      <el-col :span="24">
        <div class="original-music-controls">
          <h3>{{name}}</h3>
          <el-col :span="1" :offset="4">
            <button class="music-button before" @click="beforeButton">&ensp;&ensp;</button>
          </el-col>
          <el-col :span="12">
            <audio
              autoplay
              controls="controls"
              ref="audio"
              :src="src"
              type="audio/mpeg"
              preload="meta">
            Your browser does not support the <code>audio</code> element.
            <!-- <source src="../../music/1.mp3"  type="audio/mpeg"> -->
          </audio>
          </el-col>
          <el-col :span="1">
            <button class="music-button later" @click="laterButton" circle>&ensp;&ensp;</button>
          </el-col>
          
        </div>
      </el-col>
      <!-- <div class="music-controls">
        <el-col :span="2">
          
        </el-col>
        <el-col :span="2">
          <button class="music-button" :class="{ready_play: !playing, playing: playing}" @click="onPlay" >&ensp;&ensp;</button>
        </el-col>
        <el-col :span="2">
         
        </el-col>
        <el-col :span="6">
          <h5>{{name}}</h5>
        </el-col>
        <el-col :span="6">
          <el-col :span="5">
            <button class="music-button volume" @click="laterButton" circle>&ensp;&ensp;</button>
          </el-col>
          <el-col :span="17">
            <el-progress :percentage="70" :show-text="false"  color="#8e71c7"></el-progress>
          </el-col>
          
          
        </el-col>
        <el-col :span="2">
              <el-badge :value="history.length" class="item">
              <button class="history"  circle>&ensp;&ensp;</button> 
              <el-button class="history" @click="alertQueryHistory" type="primary">&ensp;&ensp;</el-button>
          </el-badge>
        </el-col>
      </div> -->
      
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// import axios from 'axios'
export default {
  mounted () {
    // 自动播放
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
      const randomID = Math.floor(Math.random() * (this.musicMaxNum - 1)) + 1
      const currentMusicName = this.list[randomID].name
      this.setMusicID(randomID+1)

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

        this.setMusicID(beforeIndex)


        const music = Object.create(null)
        music.index = beforeIndex
        music.name = this.history[beforeIndex]
        music.src = this.path + this.history[beforeIndex]

        // console.log(music.index + '------------' + music.name)
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

          this.setMusicID(laterIndex)
          
          const music = Object.create(null)
          music.index = laterIndex
          music.name = this.history[laterIndex]
          music.src = this.path + this.history[laterIndex]

          // console.log(music.index + '------------' + music.name)
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
    ...mapMutations('music', ['addHistory', 'addHistoryIndex', 'changePlaying', 'setMusicID'])
  },
  computed: {
    ...mapState('music', ['name', 'list', 'history', 'historyIndex', 'src', 'playing', 'currentMusicID', 'beforeMusicID'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
.music-play{
  z-index: 99;
  border-color: #ff000000 !important;
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
      background-image: url('../assets/player/before.png') ;
    }
    .later {
      background-image: url('../assets/player/later.png') ;
    }
  // .music-controls{
  //   background: #303133f5;
  //   .ready_play, .playing {
  //     background-size: 24px;
  //     border-radius: 22px;
  //     height: 40px;
  //     width: 40px;
  //   }
  //   .ready_play {
  //     background-image: url('../assets/player/ready-play.png') ;
  //   }
  //   .playing {
  //     background-image: url('../assets/player/pause.png') ;
  //   }
  //   .volume {
  //     background-image: url('../assets/player/volume.png') ;
  //   }
  //   .history {
  //     background-image: url('../assets/player/history.png');
  //     border: 1px solid white;
  //     background-color: black;
  //     background-position: center;
  //     border-radius: 8px;
  //     background-repeat: no-repeat;
  //     background-size: 21px;
  //     height: 32px;
  //     width: 31px;
  //     padding: 0px;
  //   }
  //   .history:hover {
  //     box-shadow: 0px 0px 0px 1px #f2f6fc;
  //   }
  // }
  div {
    div{
      background: #303133f5;
    }
    .original-music-controls{
      height: 105px;
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
        background-image: url('../assets/lock/dark_unlock.png') ;
        cursor:pointer;
      }
      .lock_status:hover {
        background-image: url('../assets/lock/undertint_unlock.png');
      }
      .unlock_status {
        background-position: center;
        background-repeat: no-repeat;
        background-size: 11px;
        background-image: url('../assets/lock/dark_lock.png') ;
        cursor:pointer;
      }
      .unlock_status:hover {
        background-image: url('../assets/lock/undertint_lock.png') ;
      }
    }
    
  }
}
.music{
  bottom: -122px;
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
0% {bottom: -122px;}
100% { bottom: 0px;}
}

/* Safari and Chrome */
@-webkit-keyframes myfirst {
0% {bottom: -122px;}
100% { bottom: 0px;}
}
</style>
