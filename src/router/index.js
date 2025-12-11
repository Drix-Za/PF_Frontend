import { createRouter, createWebHistory } from 'vue-router';

// 1. Componentes importados
import HomePage from '../views/HomePage.vue';
import Dashboard from '../views/Dashboard.vue';

// Configuración del router
const router = createRouter({
  // Usa la historia basada en la URL estándar (necesaria para Vite/Vue 3)
  history: createWebHistory(import.meta.env.BASE_URL),
  
  // Definición de rutas
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
  ],
});

export default router;