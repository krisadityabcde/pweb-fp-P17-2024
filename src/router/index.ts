import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import News from '../views/News.vue'
import Crowdfund from '../views/Crowdfund.vue'
import CrowdfundDetail from '../views/CrowdfundDetail.vue';
import CrowdfundFavorite from '../views/CrowdfundFavorite.vue';
import CrowdfundSuccess from '../views/CrowdfundSuccess.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/news',
    name: 'news',
    component: News
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
    component: CrowdfundFavorite
  },
  {
    path: '/crowdfund/:id/success',
    name: 'crowdfund-success',
    component: CrowdfundSuccess
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router