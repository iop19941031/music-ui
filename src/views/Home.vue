<template>
  <div class="home">
    <MusicList />
  </div>
</template>

<script>
// @ is an alias to /src
import MusicList from '@/components/MusicList.vue'

export default {
  name: 'home',
  components: {
    MusicList
  }
}
</script>
