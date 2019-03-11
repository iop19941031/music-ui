<template>
     <div class="fader">
      <div class="rate" @click="adjustRate" ref="fader_rate">
        <div :style="{width: fader_visual}" class="visual"></div>
        <div class="ball" @mousedown="ballMousedownEvent" ref="adjust_ball"></div>
      </div>
    </div>
</template>
<script>
export default {
  methods: {
    adjustRate (ev) {
      // 点击的位置
      // const mouseClickSite = e.layerX
      // console.log(mouseClickSite)
      // // 音量控制条宽度
      // const volumeWidth = e.target.clientWidth

      // const bound = mouseClickSite + this.$refs.adjust_ball.clientWidth / 2
      // this.$refs.adjust_ball.style.right = `${volumeWidth - bound}px`

      // const scale = (mouseClickSite / volumeWidth).toFixed(1)
      // this.$refs.audio.volume = scale
      // this.fader_visual = `${scale * 100}%`
      // console.log(scale)

      const adjustBall = this.$refs.adjust_ball
      const faderRate = this.$refs.fader_rate
      const fader = this.$refs.fader
      const cha = faderRate.offsetWidth - adjustBall.offsetWidth
      let right = ev.clientX - adjustBall.offsetWidth
      console.log(fader)
      if (right < 0) {
        right = 0
      }
      if (right >= cha) {
        right = cha
      }
      adjustBall.style.right = (cha - right) + 'px'
      const scale = (cha - right).toFixed(1)
      // this.$refs.audio.volume = scale
      // this.fader_visual = `${scale * 100}%`
      // console.log(scale)
    },
    ballMousedownEvent (el) {
      // 可调节宽度
      const faderWidth = this.$refs.fader_rate.offsetWidth - el.target.offsetWidth
      // 球偏移
      const boxL = el.target.offsetLeft
      // 鼠标按下的位置
      const mouseX = el.clientX
      document.onmousemove = (e) => {
        // 鼠标移动的距离
        const moveL = e.clientX - mouseX
        // left值
        let right = boxL + moveL
        // 判断最大值和最小值
        if (right < 0) {
          right = 0
        }
        if (right >= faderWidth) {
          right = faderWidth
        }
        const scale = (right / this.$refs.fader_rate.offsetWidth).toFixed(1)
        this.$refs.audio.volume = scale
        this.fader_visual = `${scale * 100}%`
        // console.log
        // 改变left值
        el.target.style.right = `${faderWidth - right}px`

        e.stopPropagation()
        e.preventDefault()
        console.log(2)
      }
      // 解绑移动事件
      document.onmouseup = function () {
        console.log(1)
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }

}
</script>
<style lang="scss" scoped>
.fader {
  margin: auto;
  position: relative;
  margin: 100px auto;
  .visual {
    height: 3px;
    background: red;
  }
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
    transition: right 0.1s linear 0s;
    &:hover {
      background: red;
    }
    &:active {
      background: blue;
    }
  }
}
</style>
