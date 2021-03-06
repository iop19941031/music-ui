import VueRouter from 'vue-router'
// import Vue from 'vue'
// Vue.use(VueRouter)

export default new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        main: () => import(/* webpackChunkName: "login" */ './components/MusicList.vue'),
        bottom: () => import(/* webpackChunkName: "login" */ './components/Music.vue')
      }
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: function () {
    //     return import(/* webpackChunkName: "about" */ './views/About.vue')
    //   }
    // }
  ]
})
