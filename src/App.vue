<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <div class="father">
        <div class="son"></div>
    </div>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-container class="overall">
          <el-container>
            <!-- <el-header class="header">

            </el-header> -->
            <el-main class="main">
              <MusicList />
            </el-main>
            <!-- <el-footer>

            </el-footer> -->
          </el-container>
        </el-container>
      </el-col>
    </el-row>
    <Music class="footer" />
    <el-button class="top" round v-show="topShow" @click="toTop" icon="el-icon-arrow-up" circle></el-button>
  </div>
</template>

<script>
import './rem.js'
import Vue from 'vue'
import Music from './components/Music.vue'
import MusicList from './components/MusicList.vue'
Vue.prototype.myWindow = window
export default {
  mounted () {
    // 监听滚动条
    this.myWindow.addEventListener('scroll', this.handleScroll)
  },
  components: {
    Music,
    MusicList
  },
  data () {
    return {
      topShow: false
    }
  },
  methods: {
    handleScroll () {
      if (this.myWindow.scrollY === 0) {
        this.topShow = false
      } else {
        this.topShow = true
      }
    },
    toTop () {
      // console.log(this.myWindow.scrollY)
      this.topShow = false
      this.myWindow.scrollTo(0, 0)
    }
  }
}
</script>

<style scoped lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f2f6fc;
  background: #60626612;
  .top {
    border-radius: 64px !important;
    padding: 13px !important;
    position: fixed;
    bottom: 200px;
    right: 70px;
  }
  .footer {
    border-top: 1px solid #90939945;
    position: fixed;
    width: 100%;
    // .history {
    //     overflow-y: scroll;
    //     max-height: 800px;
    //     max-width: 800px;
    //     .row-history:hover {
    //         background: #90939947;
    //     }
    // }
  }
}

</style>
