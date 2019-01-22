<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
     <el-container style="height: 850px; border: 1px solid #eee">
      <el-container>
        <el-header>

        </el-header>
        <el-main>
          <router-view name="main" class="main" />
        </el-main>
        <el-footer class="footer">
          <router-view name="bottom" class="bottom"/>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .footer {
    border-top: 1px solid #90939945
  }
}
</style>
