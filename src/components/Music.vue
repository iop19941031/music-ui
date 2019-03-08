<template>
  <div class="music-play" :class="{show : musicShow, music: lockStatus}">
    <audio
        autoplay
        ref="audio"
        :src="src"
        type="audio/mpeg"
        preload="meta">
      Your browser does not support the <code>audio</code> element.</audio>
    <button class="before" @click="beforeButton">&ensp;&ensp;</button>
    <button :class="{ready_play: !playing, playing: playing}" @click="onPlay" >&ensp;&ensp;</button>
    <button class="later" @click="laterButton" circle>&ensp;&ensp;</button>
    <h3>{{name}}</h3>
    <div class="fader">
      <div class="rate" @click="adjustRate" ref="fader_rate">
        <div class="ball" @mousedown="ballMousedownEvent" ref="adjust_ball"></div>
      </div>
      <!-- <div class="box" @mousedown="start" @mouseup="stop" @mousemove="move" ref="asss"></div> -->
    </div>
    <el-badge :value="this.history.length" class="item">
      <button class="history" @click="alertQueryHistory"></button>
    </el-badge>
    <div class="status">
      <span :class="{lock_status : lockStatus, unlock_status : !lockStatus  }" @click="lockEvent">&ensp;&ensp;</span>
    </div>
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
      musicShow: true, // 播放器显示
      lockStatus: false, // 是否锁定播放器显示
      historyList: '',
      path: '/CloudMusic/',
      musicMaxNum: 40// 随机的歌曲数量
    }
  },
  methods: {
    adjustRate (e) {
      // 点击的位置
      const mouseClickSite = e.layerX
      // 音量控制条宽度
      const volumeWidth = e.target.clientWidth

      const bound = mouseClickSite - this.$refs.adjust_ball.clientWidth / 2
      const scale = (mouseClickSite / volumeWidth).toFixed(1)
      this.$refs.adjust_ball.style.left = `${bound}px`
      this.$refs.audio.volume = scale
      console.log(scale)
    },
    ballMousedownEvent(el) {
      //可调节宽度
      const faderWidth = this.$refs.fader_rate.offsetWidth - el.target.offsetWidth
      //球偏移
      const boxL = el.target.offsetLeft
      //鼠标按下的位置
      const mouseX = el.clientX
      document.onmousemove = (e) => {
        //鼠标移动的距离
        const moveL = e.clientX - mouseX
        //left值
        let left = boxL + moveL
        // 判断最大值和最小值
        if (left < 0) {
          left = 0
        }
        if (left >= faderWidth) {
          left = faderWidth
        }
        // 改变left值
		    el.target.style.left = `${left}px`
      }
      //解绑移动事件
      document.onmouseup = function () {
        document.onmousemove = null 
        document.onmouseup = null
      }
    },
    // ballMousedownEvent (e) {
    //   const el = e.target
    //   const ballX = e.clientX - el.offsetLeft
    //   document.onmousemove = (e) => {
        
    //     // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
    //     let left = e.clientX - ballX

    //     const volumeWidth = this.$refs.fader_rate.clientWidth
    //     // console.log(volumeWidth + '------------')
    //     if (left >= volumeWidth) {
    //       left = volumeWidth - this.$refs.adjust_ball.clientWidth / 2
    //     }
    //     if (left < 0) {
    //       left = 0
    //     }
    //     // 移动当前元素
    //     el.style.left = `${left}px`
    //   }

    //   document.onmouseup = () => {
    //     document.onmousemove = null
    //     document.onmouseup = null
    //   }
    //   // el.style.left = `${e.clientX}px`
    //   // console.log(e.clientX)
    // },
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

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
.fader {
  margin: auto;
  position: relative;
  .rate {
    width: 500px;
    height: 3px;
    border-radius: 10px;
    background: #aaa;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    cursor: pointer;
  } 
  .ball {
    width: 20px;
    height: 20px;
    background: #000;
    position: absolute;
    bottom: 0;
    top: 0;
    right: 0;
    margin: auto 0;
    border-radius: 50%;
    cursor: pointer;
    transition: left 0.1s linear 0s;
    &:hover {
      background: red;
    }
    &:active {
      background: blue;
    }
  }
}
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
@mixin lock() {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 11px;
  cursor:pointer;
}
.music-play{
  z-index: 99;
  border: 0px !important;
  min-width: 1000px;
  display: flex;
  background: #38393b;
  align-items: center;
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
    margin-top: -70px;
    .lock_status {
      @include lock();
      background-image: url('../assets/lock/dark_unlock.png') ;
      &:hover {
        background-image: url('../assets/lock/undertint_unlock.png');
      }
    }
    .unlock_status {
      @include lock();
      background-image: url('../assets/lock/dark_lock.png') ;
      &:hover {
        background-image: url('../assets/lock/undertint_lock.png') ;
      }
    }
  }
}
.music{
  bottom: -50px;
  &:hover {
    animation:myfirst 1s;
    bottom: 0px;
  }
}
.show{
  bottom: 0px;
}
@keyframes myfirst{
  0% {bottom: -50px;}
  100% { bottom: 0px;}
}
</style>
