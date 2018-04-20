import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import About from './views/About.vue'
import Rooms from './views/Rooms.vue'
import HomePage from './views/HomePage.vue'
// import Rooms2 from './views/Rooms2.vue'

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
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
