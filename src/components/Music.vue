<template>
  <div class="music">
    <h3>{{getName}}</h3>
    <audio
    autoplay="autoplay"
    controls="controls"
    ref="audio"
    @pause="onPause"
    @play="onPlay"
    :src="getName"
    type="audio/mpeg"
    preload="meta">
      Your browser does not support the <code>audio</code> element.
      <!-- <source src="../../music/1.mp3"  type="audio/mpeg"> -->
    </audio>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
// import axios from 'axios'
export default {
  mounted () {
    this.$refs.audio.onended = () => {
      const random = Math.floor(Math.random() * 1580) + 1
      this.setName(`http://localhost:3000/CloudMusic/${this.getList[random].name}`)
      // alert("音频已播放完成")
    }
  },
  data () {
    return {
      playing: false
    }
  },
  methods: {
    play () {
      this.$refs.audio.play()
    },
    onPlay () {
      this.playing = true
    },
    // 当音频暂停
    onPause () {
      this.playing = false
    },
    ...mapMutations ('music', ['setName'])
  },
  computed: {
    ...mapState ('music', ['name']),
    ...mapGetters ('music', ['getName', 'getList'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
