<template>
  <div>
    <button @click="testAxios">axios</button>
    <!-- <ol>
      <li v-for="todo in musicList">
        {{ todo.text }}--- {{todo}}
      </li>
    </ol> -->

    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="歌名">
      </el-table-column>
      <el-table-column
        prop="time"
        label="时长"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      tableData: [],
      loading: false
    }
  },
  methods: {
    testAxios () {
      console.log(this.musicList + '22222222222')
      axios.get('http://localhost:3000/music/list').then(response => {
        console.log(`歌曲数量：${response.data.length}`)
        this.tableData = []
        for (let i = 0; i < response.data.length; i++) {
          let data = {
            id: i + 1,
            name: response.data[i],
            time: 0
          }
          this.tableData.push(data)
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
