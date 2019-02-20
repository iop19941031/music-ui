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
              <router-view name="main" />
            </el-main>
            <!-- <el-footer>

            </el-footer> -->
          </el-container>
        </el-container>
      </el-col>
    </el-row>
    <router-view name="bottom" class="footer"/>
    <el-button class="top" round v-show="top"  @click="toTop"><i class="el-icon-arrow-up"></i></el-button>
  </div>
</template>

<script>
export default {
  mounted () {
    // 监听滚动条
    window.addEventListener('scroll', this.handleScroll)
  },
  data () {
    return {
      top: false
    }
  },
  methods: {
    handleScroll () {
      if (scrollY === 0) {
        this.top = false
      } else {
        this.top = true
      }
    },
    toTop () {
      this.top = false
      window.scrollTo(0, 0)
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
