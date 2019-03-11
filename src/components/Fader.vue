<template>
    <div class="main">
        <span :class="icon_status_class" @click="faderIconEvent"></span>
        <div class="fader" ref="fader">
            <!-- <p>当前位置{{showFaderValue}}</p> -->
            <div class="rate" ref="fader_rate" @click="rateEvent">
                <div :style="{width: fader_visual}" class="visual"></div>
                <div class="ball" ref="adjust_ball"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  mounted () {
    const adjustBall = this.$refs.adjust_ball
    const cha = this.$refs.fader_rate.offsetWidth - adjustBall.offsetWidth
    // 鼠标点击滚球事件
    adjustBall.onmousedown = (ev) => {
      // 球偏移
      let boxL = adjustBall.offsetLeft
    //   console.log(boxL)
      let mouseX = ev.clientX // 鼠标按下的位置
      // 鼠标移动事件
      document.onmousemove = (e) => {
        let moveL = e.clientX - mouseX // 鼠标移动的距离
        let newL = boxL + moveL // left值
        // 判断最大值和最小值
        if (newL < 0) {
          newL = 0
          this.icon_status_class = 'close'
        }
        if (newL >= cha) {
          newL = cha
        }
        const ringDeviation = cha - newL
        const show = newL / cha
        this.fader(ringDeviation, show)
        this.logStatus(ringDeviation, show)
        e.stopPropagation()
        e.preventDefault()
      }
      document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
      }
      this.icon_status_class = 'open'
    }
  },
  data () {
    return {
      fader_visual: '100%',
      icon_status_class: 'open',
      faderStatus: true,
      showFaderValue: 1,
      faderValue: 1,
      rightValue: 0
    }
  },
  methods: {
    logStatus (right, result) {
      this.rightValue = right
      this.faderValue = result
    },
    fader (right, result) {
      this.$refs.adjust_ball.style.right = `${right}px`
      this.showFaderValue = result

      this.fader_visual = `${result.toFixed(3) * 100}%`
      this.$emit('volumeEvent', result.toFixed(2))
    },
    faderIconEvent () {
      this.fader_visual = '80%'
      if (this.faderStatus) {
        this.icon_status_class = 'close'
        this.fader(this.$refs.fader_rate.offsetWidth - this.$refs.adjust_ball.offsetWidth, 0)
      } else {
        this.fader(this.rightValue, this.showFaderValue)
        this.icon_status_class = 'open'
        this.showFaderValue = this.faderValue

        this.fader_visual = `${this.faderValue.toFixed(3) * 100}%`
        this.$emit('volumeEvent', this.faderValue.toFixed(2))
      }
      this.faderStatus = !this.faderStatus
    },
    rateEvent (ev) {
      this.icon_status_class = 'open'
      const adjustBall = this.$refs.adjust_ball
      const cha = this.$refs.fader_rate.offsetWidth - adjustBall.offsetWidth
      let right = ev.clientX - this.$refs.fader.offsetLeft - adjustBall.offsetWidth
      if (right < 0) {
        right = 0
      }
      if (right >= cha) {
        right = cha
      }
      const ringDeviation = cha - right
      const show = right / cha
      this.fader(ringDeviation, show)
      this.logStatus(ringDeviation, show)
    }
  }

}
</script>
<style lang="scss" scoped>
.icon {
    background-size: 25px !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    height: 40px;
    width: 30px;
    &:hover {
        cursor: pointer;
    }
}
.main{
    display: flex;
    align-items: center;
    .open {
        @extend .icon;
        background: url('../assets/player/volume.png');
    }
    .close {
        @extend .icon;
        background: url('../assets/player/clone.png');
    }
    .fader {
    width: 100px;
    height: 40px;
    // margin: 100px auto;
    position: relative;
        .rate {
            height: 4px;
            border-radius: 10px;
            background: #aaa;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            cursor: pointer;
            .visual {
                background: red;
                height: 4px;
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
            }
        }
    }
}

</style>
