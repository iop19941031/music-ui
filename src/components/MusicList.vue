<template>
  <div class="list">
    <el-table
      v-loading="loading"
      :data="list"
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
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  created () {
    axios.get('/music/list').then(response => {
      console.log(`歌曲数量：${response.data.length - 1}`)
      this.loadInit(response.data)
      this.loading = false
    }).catch(function (error) {
      console.log(error)
    })
  },
  data () {
    return {
      loading: true
    }
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
    ...mapMutations('music', [
      'addHistory',
      'loadInit',
      'changePlaying',
      'setMusicID'
    ])
  },
  watch: {
    name () {
      document.querySelectorAll('.play')[this.beforeMusicID].classList.remove('clickPlay')
      document.querySelectorAll('.play')[this.currentMusicID].classList.add('clickPlay')
    }
  },
  computed: {
    ...mapState('music', [
      'name',
      'list',
      'currentMusicID',
      'beforeMusicID'
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
