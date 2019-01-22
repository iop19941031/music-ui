<template>
  <div>
    <button @click="axiosList">加载音乐</button>
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
      v-show="loadMusic"
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
  data () {
    return {
      loading: false,
      loadMusic: false
    }
  },
  methods: {
    load () {
      const residueMusic = this.list.length - this.showListIndex
      console.log(`剩余数量:${residueMusic}`)
      console.log(`剩余数量:${residueMusic < 100}`)
      if (residueMusic < 100) {
        for (let i = 0 + this.showListIndex; i < (residueMusic + this.showListIndex); ++i) {
          this.addTableList(this.list[i])
        }
        this.setShowListIndex(this.list.length)
        this.loadMusic = false
      } else {
        this.setShowListIndex(this.showListIndex + 100)
        for (let i = this.showListIndex - 100; i <= this.showListIndex; ++i) {
          this.addTableList(this.list[i])
        }
      }
      console.log(`当前显示音乐数量:${this.showListIndex}`)
    },
    rowClickEvent (row, event, column) {
      this.setName(this.musicApi + row.name)
      this.addHistory(row.name)
    },
    axiosList () {
      this.loading = true
      axios.get(this.apiAddress).then(response => {
        console.log(`开头：${new Date()}`)
        const musicNum = response.data.length - 1
        console.log(`歌曲数量：${musicNum}`)
        this.setList([])
        console.log(`创建list：${new Date()}`)
        for (let i = 1; i < response.data.length; i++) {
          let data = {
            id: i,
            name: response.data[i]
          }
          this.addList(data)
          this.loading = false
        }
        console.log(`创建TableList：${new Date()}`)
        this.setTableList([])
        if (musicNum < 100) {
          for (let i = 0; i <= musicNum; ++i) {
            this.addTableList(this.list[i])
          }
          this.setShowListIndex(musicNum)
        } else {
          for (let i = 0; i < 100; ++i) {
            this.addTableList(this.list[i])
          }
          this.setShowListIndex(100)
          this.loadMusic = true
        }
        console.log(`结束：${new Date()}`)
        console.log(`当前显示音乐数量:${this.showListIndex}`)
      }).catch(function (error) {
        console.log(error)
      })
      console.log(`axiosList结束：${new Date()}`)
    },
    ...mapMutations('music', [
      'setName',
      'setList',
      'addList',
      'addHistory',
      'addTableList',
      'setTableList',
      'setShowListIndex'
    ])
  },
  computed: {
    ...mapState('music', [
      'name',
      'list',
      'showListIndex',
      'tableList',
      'musicApi',
      'apiAddress'
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
