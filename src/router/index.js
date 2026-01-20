import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue'; 
import Dashboard from '../views/Dashboard.vue'; 
import Login from '../views/Login.vue';

import ProductDetail from '../views/ProductDetail.vue'; 
import CRUDTest from '../views/CRUDTest.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage 
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard 
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/crudtest',
      name: 'crudtest',
      component: CRUDTest
    },
    {
      path: '/game/:slug', 
      name: 'product-detail',
      component: ProductDetail
    },

  ]
});

export default router;