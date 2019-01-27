<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableList"
      style="width: 100%"
      @row-click="rowClickEvent">
      <el-table-column
        prop="id"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="歌名">
      </el-table-column>
    </el-table>
    <p class="load-music"
      v-show="loadMusicEvent"
      @click="load">
      点击加载更多音乐
    </p>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  created () {
    this.setLoading(true)
    axios.get('/music/list').then(response => {
      console.log(`歌曲数量：${response.data.length - 1}`)
      this.loadInit(response.data)
    }).catch(function (error) {
      console.log(error)
    })
  },
  methods: {
    load () {
      const residueMusic = this.list.length - this.showListIndex
      console.log(`剩余数量:${residueMusic}`)
      if (residueMusic < 100) {
        this.loadInsufficient(residueMusic)
        this.setLoadMusicEvent(false)
      } else {
        this.loadSufficient()
      }
      console.log(`当前显示音乐数量:${this.showListIndex}`)
    },
    rowClickEvent (row, event, column) {
      const node = {
        current: row.name,
        name: row.name,
        src: `/CloudMusic/${row.name}`
      }
      this.addHistory(node)
    },
    ...mapMutations('music', [
      'addHistory',
      'loadInsufficient',
      'loadSufficient',
      'loadInit',
      'setLoading',
      'setLoadMusicEvent'
    ])
  },
  computed: {
    ...mapState('music', [
      'name',
      'list',
      'showListIndex',
      'tableList',
      'loading',
      'loadMusicEvent'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.load-music {
  font-size: 14px;
  color: #303133c9;
}
.load-music:hover {
  color: red;
}
</style>
