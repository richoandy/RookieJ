import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Rooms from './views/Rooms.vue'
<<<<<<< HEAD
<<<<<<< 37194fe037cc0ca01353fd0b17b1ea7c07c7f9a1
import Register from './views/Register.vue'
=======
import HomePage from './views/HomePage.vue'
// import Rooms2 from './views/Rooms2.vue'
>>>>>>> checkpoint
=======
import HomePage from './views/HomePage.vue'
// import Rooms2 from './views/Rooms2.vue'
>>>>>>> homepage

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
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
