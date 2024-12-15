import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Login from '../views/Login.vue'
import Crowdfund from '../views/Crowdfund.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/crowdfund',
      name: 'Crowdfund',
      component: Crowdfund,
    }
  ]
})

export default router