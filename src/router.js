import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import About from './views/About.vue'
import Rooms from './views/Rooms.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'rooms',
      component: Rooms
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
