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
    meta: { requiresAuth: true }
  },
  {
    path: '/crowdfund/:id',
    name: 'crowdfund-detail',
    component: CrowdfundDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/crowdfund/favorite',
    name: 'favorite-crowdfund',
    component: CrowdfundFavorite,
    meta: { requiresAuth: true }
  },
  {
    path: '/crowdfund/:id/success',
    name: 'crowdfund-success',
    component: CrowdfundSuccess,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

// Add a global navigation guard
router.beforeEach((to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');
    if (!token) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router