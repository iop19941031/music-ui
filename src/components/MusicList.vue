<template>
  <div>
    <button @click="axiosList">加载音乐</button>
    <el-table
      v-loading="loading"
      :data="list"
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
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    rowClickEvent (row, event, column) {
      // console.log(`id:${row.id},name:${row.name}`)
      this.setName(`http://localhost:3000/CloudMusic/${row.name}`);
    },
    axiosList () {
      // console.log(this.musicList + '22222222222')
      this.loading = true
      axios.get('http://localhost:3000/music/list').then(response => {
        console.log(`歌曲数量：${response.data.length}`)
        this.setList([])
        for (let i = 1; i < response.data.length; i++) {
          let data = {
            id: i,
            name: response.data[i]
          }
          this.addList(data)
          this.loading = false
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    ...mapMutations ('music', ['setName', 'setList', 'addList'])
  },
  computed: {
    ...mapState ('music', ['name', 'list'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
