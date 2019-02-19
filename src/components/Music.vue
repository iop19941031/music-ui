<template>
  <div :class="{show : musicShow, music: lockStatus}">
    <el-row>
      <el-col class="lock" :offset="21" :span="2" >
        <svg class="icon" width="10px" height="10px" viewBox="0 0 1024 1024" @click="lockEvent" >
          <path fill="#bfbfbf" :d="lock" />
        </svg>
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
        <el-button type="info" @click="beforeButton" icon="el-icon-arrow-left" size="medium" circle></el-button>
        <el-button type="info" @click="onPlay" icon="el-icon-caret-right" circle></el-button>
        <el-button type="info" @click="laterButton" icon="el-icon-arrow-right" size="medium" circle></el-button>
        <el-tooltip content="播放历史" placement="right" :open-delay=500>
          <el-badge :value="history.length" class="item">
            <el-button type="info" @click="alertQueryHistory" icon="el-icon-service" circle></el-button>
          </el-badge>
        </el-tooltip>
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
      lock: 'M768.25422 0q48.810328 0 94.061569 18.303873t80.333664 50.33565 56.436941 74.740814 21.354518 91.519364l0 150.49851-123.042701 0 0-122.025819q0-64.063555-36.099305-99.654419t-97.112214-35.590864q-54.911619 0-88.468719 35.590864t-33.5571 99.654419l0 124.059583-128.12711 0 0-152.532274q0-48.810328 19.320755-91.519364t53.386296-74.740814 80.333664-50.33565 101.179742-18.303873zM766.220457 693.513406l0 87.451837 0 47.793446q0 27.455809-9.660377 51.860973t-26.438928 41.692155-39.658391 27.455809-50.33565 10.168818l-514.542205 0q-27.455809 0-49.82721-9.660377t-38.641509-26.438928-24.913605-39.14995-8.643496-47.793446l0-323.368421q0-28.472691 19.829196-47.793446t46.268123-19.320755l629.449851 0q28.472691 0 47.793446 19.320755t19.320755 47.793446l0 179.988083z',
      lockStatus: true,
      historyList: '',
      playing: false,
      path: '/CloudMusic/',
      musicMaxNum: 2585// 随机的歌曲数量
    }
  },
  methods: {
    lockEvent () {
      if (this.lockStatus) {
        this.lock = 'M385.150849 385.662338l-128.895105 0 0-150.377622q0-49.102897 19.436563-91.556444t53.706294-74.677323 80.815185-50.637363 101.786214-18.413586q49.102897 0 94.625375 18.413586t80.815185 50.637363 56.263736 74.677323 20.971029 91.556444l0 150.377622-123.78022 0 0-121.734266q0-64.447552-35.804196-99.74026t-97.182817-35.292707q-55.240759 0-88.999001 35.292707t-33.758242 99.74026l0 121.734266zM826.053946 447.040959q27.62038 0 47.568432 19.948052t19.948052 47.568432l0 317.122877q0 27.62038-9.718282 51.66034t-26.597403 41.942058-39.896104 28.131868-50.637363 10.22977l-516.603397 0q-27.62038 0-50.125874-10.22977t-38.361638-27.108891-24.551449-39.384615-8.695305-48.07992l0-324.283716q0-27.62038 19.436563-47.568432t47.056943-19.948052l61.378621 0 128.895105 0 255.744256 0 123.78022 0 61.378621 0z'
        this.lockStatus = false
        this.musicShow = true
      } else {
        this.lock = 'M768.25422 0q48.810328 0 94.061569 18.303873t80.333664 50.33565 56.436941 74.740814 21.354518 91.519364l0 150.49851-123.042701 0 0-122.025819q0-64.063555-36.099305-99.654419t-97.112214-35.590864q-54.911619 0-88.468719 35.590864t-33.5571 99.654419l0 124.059583-128.12711 0 0-152.532274q0-48.810328 19.320755-91.519364t53.386296-74.740814 80.333664-50.33565 101.179742-18.303873zM766.220457 693.513406l0 87.451837 0 47.793446q0 27.455809-9.660377 51.860973t-26.438928 41.692155-39.658391 27.455809-50.33565 10.168818l-514.542205 0q-27.455809 0-49.82721-9.660377t-38.641509-26.438928-24.913605-39.14995-8.643496-47.793446l0-323.368421q0-28.472691 19.829196-47.793446t46.268123-19.320755l629.449851 0q28.472691 0 47.793446 19.320755t19.320755 47.793446l0 179.988083z'

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
    play () {
      this.$refs.audio.play()
    },
    onPlay () {
      this.$refs.audio.pause()
    },
    ...mapMutations('music', ['addHistory', 'addHistoryIndex'])
  },
  computed: {
    ...mapState('music', ['name', 'list', 'history', 'historyIndex', 'src'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.music{
  bottom: -159px;
  border-color: #ff000000 !important;
  div {
    div{
      background: #303133;
    }
    .lock{
      height: 14px;
      border-bottom: 14px solid #303133;
      border-left: 9px solid #f4f4f4 !important;
      border-right: 9px solid #f4f4f4;
    }
  }
}
.show{
  border-color: #ff000000 !important;
  bottom: 0px!important;
  div {
    div{
      background: #303133;
    }
    .lock{
      height: 14px;
      border-bottom: 14px solid #303133;
      border-left: 9px solid #f4f4f4 !important;
      border-right: 9px solid #f4f4f4;
    }
  }
}
.music:hover{
  animation:myfirst 1s;
  -webkit-animation:myfirst 1s; /* Safari and Chrome */
  bottom: 0px;
  svg{
    cursor:pointer;
  }
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
