import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import News from '../views/News.vue';
import Crowdfund from '../views/Crowdfund.vue';
import CrowdfundDetail from '../views/CrowdfundDetail.vue';
import CrowdfundFavorite from '../views/CrowdfundFavorite.vue';
import CrowdfundSuccess from '../views/CrowdfundSuccess.vue';
import AdminLandingPage from '../views/admin/AdminLandingPage.vue';
import AdminCrowdfundDetail from '../views/admin/AdminCrowdfundDetail.vue';
import AdminCrowdfundEdit from '../views/admin/AdminCrowdfundEdit.vue';
import AdminCreateCrowdfund from '../views/admin/AdminCreateCrowdfund.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/news',
    name: 'news',
    component: News,
  },
  {
    path: '/crowdfund',
    name: 'Crowdfund',
    component: Crowdfund,
    meta: { requiresAuth: true },
  },
  {
    path: '/crowdfund/:id',
    name: 'crowdfund-detail',
    component: CrowdfundDetail,
    meta: { requiresAuth: true },
  },
  {
    path: '/crowdfund/favorite',
    name: 'favorite-crowdfund',
    component: CrowdfundFavorite,
    meta: { requiresAuth: true },
  },
  {
    path: '/crowdfund/:id/success',
    name: 'crowdfund-success',
    component: CrowdfundSuccess,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin',
    name: 'admin-landing',
    component: AdminLandingPage,
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/:id',
    name: 'admin-crowdfund-detail',
    component: AdminCrowdfundDetail,
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/:id/edit',
    name: 'admin-crowdfund-edit',
    component: AdminCrowdfundEdit,
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/create',
    name: 'admin-create-crowdfund',
    component: AdminCreateCrowdfund,
    meta: { requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

// Add a global navigation guard
router.beforeEach((to, _, next) => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the user is logged in
    if (!token) {
      alert('You must be logged in to access this page');
      next({ name: 'login' });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresAdmin)) {
    // Check if the user is an admin
    if (!token || !isAdmin) {
      alert('You must be an admin to access this page');
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
