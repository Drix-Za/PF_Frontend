import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue'; 
import Dashboard from '../views/Dashboard.vue'; 
import Login from '../views/Login.vue';

import DetalleProducto from '../views/DetalleProducto.vue'; 
import RegistroUsuario from '../views/RegistroUsuario.vue';
import RegProducto from '../views/RegProducto.vue';

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
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/RegProducto',
      name: 'RegProducto',
      component: RegProducto
    },
    {
      path: '/RegistroUsuario',
      name: 'RegistroUsuario',
      component: RegistroUsuario
    },
    {
        path: '/producto/:id',
        name: 'DetalleProducto',
        component: DetalleProducto,
        props: true // Esto permite que el ID llegue como prop si quieres
    },
    {
      path: '/EditarPerfil',
      name: 'EditarPerfil',
      component: () => import('../views/EditarPerfil.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  
  // Si la ruta a la que va es el dashboard
  if (to.path.includes('dashboard')) {
    if (!token) {
      // Si no hay token, lo mandamos al login
      return next('/login');
    }
  }
  next(); // En cualquier otro caso, dejamos pasar
});

export default router;