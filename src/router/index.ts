import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Login from '../views/Login.vue'
import Crowdfund from '../views/Crowdfund.vue'
import CrowdfundDetail from '../views/CrowdfundDetail.vue';
import FavoriteCrowdfund from '../views/FavoriteCrowdfund.vue';

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
    },
    {
      path: '/crowdfund/:id',
      name: 'crowdfund-detail',
      component: CrowdfundDetail
    },
    {
      path: '/crowdfund/favorite',
      name: 'favorite-crowdfund',
      component: FavoriteCrowdfund
    }
  ]
})

export default router