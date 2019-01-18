<template>
  <div class="music">
    <h3>{{a}}</h3>
    <audio
    controls="controls"
    ref="audio"
    @pause="onPause"
    @play="onPlay"
    :src="a"
    type="audio/mpeg"
    preload="meta">
      Your browser does not support the <code>audio</code> element.
      <!-- <source src="../../music/1.mp3"  type="audio/mpeg"> -->
    </audio>
    <br>
    <button @click="ab" :id=a>????</button>
    <br>
    <button @click="cheak" :id=a>cheakcheakcheak</button>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
// import axios from 'axios'
export default {
  data () {
    return {
      playing: false,
      a: 'http://localhost:3000/CloudMusic/渕上舞 - 薄荷.mp3',
      musicList: []
    }
  },
  methods: {
    cheak () {
      this.playing = false
      this.a = 'http://localhost:3000/CloudMusic/雨宮天 - 奏(かなで) -TV size ver.-.mp3'
    },
    ab () {
      return this.playing ? this.$refs.audio.pause() : this.$refs.audio.play()
    },
    onPlay () {
      this.playing = true
    },
    // 当音频暂停
    onPause () {
      this.playing = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
