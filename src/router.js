import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Rooms from './views/Rooms.vue'
import HomePage from './views/HomePage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: HomePage
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: Rooms
    }
  ]
})
