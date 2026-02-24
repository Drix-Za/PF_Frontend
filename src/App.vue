<template>
  <div :class="['app-wrapper', { 'dark': isDarkMode }]">
    <nav class="sticky-nav">
      <div class="nav-container">
        <div class="nav-content">
          <div class="nav-left">
            <div class="logo-group" @click="$router.push('/')" style="cursor:pointer">
              <div class="logo-spinner"></div>
              <span class="logo-text">NeoGaming</span>
            </div>
            <div class="nav-links-desktop">
              <RouterLink to="/" class="nav-link">Store</RouterLink>
              <RouterLink to="/dashboard" class="nav-link">Dashboard</RouterLink>
              <template v-if="usuario">
                <RouterLink to="/RegProducto" class="nav-link">Manejar Productos</RouterLink>
              </template>
            </div>
          </div>

          <div class="nav-right">
            <button @click="toggleDarkMode" class="dark-mode-button">
              <span class="material-icons-outlined">
                {{ isDarkMode ? 'light_mode' : 'dark_mode' }}
              </span>
            </button>

            <button v-if="usuario" @click="cerrarSesion" class="nav-icon-button logout-btn" title="Cerrar Sesión">
              <span class="material-icons-outlined">logout</span>
            </button>

            <div class="avatar-gradient" @click="$router.push('/EditarPerfil')" style="cursor: pointer">
              <img alt="User Avatar" class="avatar-image" 
                :src="usuario?.avatar_url ? `http://localhost:3000${usuario.avatar_url}` : `https://ui-avatars.com/api/?name=${usuario?.nombre || 'User'}&background=2563eb&color=fff`" />
            </div>
          </div>
        </div>
      </div>
    </nav>

    <RouterView :usuario="usuario" :isDarkMode="isDarkMode" />

    <footer class="main-footer">
      <div class="nav-container footer-content">
        <p class="footer-text">© 2026 NeoGaming. Conectado a PostgreSQL.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const usuario = ref(null);
const isDarkMode = ref(true); // Por defecto oscuro para estética NeoGaming

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  // Guardamos preferencia
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
};

const cargarSesion = async () => {
  const token = localStorage.getItem('token');
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) isDarkMode.value = savedTheme === 'dark';
  if (!token) return;

  try {
    const res = await fetch('http://localhost:3000/api/perfil', {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    if (res.ok) usuario.value = await res.json();
  } catch (error) { console.error("Error sesión:", error); }
};

const cerrarSesion = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  usuario.value = null;
  router.push('/Login');
};

onMounted(cargarSesion);
</script>

<style>
/* Variables Globales */
:root {
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --bg-light: #f3f4f6;
  --bg-dark: #020511;
  --surface-light: #ffffff;
  --surface-dark: #0b1021;
  --text-dark: #111827;
  --text-light: #f3f4f6;
}

/* Reset y base */
* { margin: 0; padding: 0; box-box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; transition: background 0.3s; }

.app-wrapper { min-height: 100vh; display: flex; flex-direction: column; background: var(--bg-light); color: var(--text-dark); }
.app-wrapper.dark { background: var(--bg-dark); color: var(--text-light); }

/* Estilos nav */
.sticky-nav { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-bottom: 1px solid #e5e7eb; height: 64px; }
.dark .sticky-nav { background: rgba(5, 8, 26, 0.9); border-bottom-color: rgba(255,255,255,0.05); }

.nav-container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
.nav-content { display: flex; align-items: center; justify-content: space-between; height: 64px; }
.nav-left, .nav-links-desktop { display: flex; align-items: center; gap: 1.5rem; }

.logo-spinner { width: 30px; height: 30px; border: 3px solid var(--primary); border-top-color: transparent; border-radius: 50%; animation: spin 2s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.nav-link { text-decoration: none; color: #6b7280; font-weight: 500; transition: 0.2s; }
.nav-link:hover, .router-link-active { color: var(--primary); }
.dark .nav-link:hover, .dark .router-link-active { color: white; }

.dark-mode-button { background: none; border: none; cursor: pointer; color: #6b7280; margin-right: 10px; }
.dark .dark-mode-button { color: #facc15; }

.avatar-gradient { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(45deg, var(--primary), #9333ea); padding: 2px; }
.avatar-image { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }

.main-footer { padding: 2rem 0; border-top: 1px solid #e5e7eb; margin-top: auto; }
.dark .main-footer { border-top-color: rgba(255,255,255,0.05); }
</style>