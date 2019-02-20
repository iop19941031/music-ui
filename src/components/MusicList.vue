<template>
  <div class="list">
    <el-table
      v-loading="loading"
      :data="tableList"
      style="width: 100%"
      @cell-click="columnClickEvent"
      header-row-class-name="table-header">
      <el-table-column
        prop="id"
        label=""
        width="80">
      </el-table-column>
      <el-table-column
        class-name="play"
        label=""
        width="40">
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
    columnClickEvent (row, column, cell, event) {
      // console.log(row.id)
      
      if (column.id === 'el-table_1_column_2') {
        this.setMusicID(row.id)
        const node = Object.create(null)
        node.current = row.name
        node.name = row.name
        node.src = `/CloudMusic/${row.name}`
        this.addHistory(node)
        this.changePlaying(true)
      }
    },
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
    ...mapMutations('music', [
      'addHistory',
      'loadInsufficient',
      'loadSufficient',
      'loadInit',
      'setLoading',
      'setLoadMusicEvent',
      'changePlaying',
      'setMusicID'
    ])
  },
  watch: {
    currentMusicID() {
      document.querySelectorAll(".play")[this.beforeMusicID].classList.remove('clickPlay')
      document.querySelectorAll(".play")[this.currentMusicID].classList.add('clickPlay')
    }
  },
  computed: {
    ...mapState('music', [
      'name',
      'list',
      'showListIndex',
      'tableList',
      'loading',
      'loadMusicEvent',
      'currentMusicID',
      'beforeMusicID',
      'playing'
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
  cursor:pointer;
}
</style>
