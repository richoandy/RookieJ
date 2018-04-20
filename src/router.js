import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Rooms from './views/Rooms.vue'
import Register from './views/Register.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'rooms',
      component: Rooms
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
