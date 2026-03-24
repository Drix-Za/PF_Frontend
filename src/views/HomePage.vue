<template>
  <div class="app-body">
    <nav class="sticky-nav">
      <div class="nav-container">
        <div class="nav-content">
          <div class="nav-left">
        <!--<div class="logo-group">
              <div class="logo-spinner" style="animation-duration: 3s;"></div>
              <span class="logo-text">NeoGaming</span>
            </div>
            
            <div class="nav-links-desktop">
              <RouterLink to="/" class="nav-link nav-link-active">Store</RouterLink>
              <RouterLink to="/dashboard" class="nav-link">Dashboard</RouterLink>

              <template v-if="!usuario">
                <RouterLink to="/RegistroUsuario" class="nav-link">Registrarse</RouterLink>
                <RouterLink to="/Login" class="nav-link">Iniciar Sesión</RouterLink>
              </template>

              <template v-else>
                <RouterLink to="/RegProducto" class="nav-link">Manejar Productos</RouterLink>
                <span class="nav-link user-tag">
                   <span class="material-icons-outlined text-sm">person</span>
                   {{ usuario.nombre }}
                </span>
              </template>
            </div>
          </div>
          
          Esta es la barra de busqueda
          <div class="nav-right">
            <div class="search-desktop-wrapper">
              <span class="search-icon-wrapper">
                <span class="material-icons-outlined text-sm">search</span>
              </span>
              <input class="nav-search-input" placeholder="Buscar producto" type="text" v-model="searchQuery"/>
            </div>

            <button v-if="usuario" @click="cerrarSesion" class="nav-icon-button logout-btn" title="Cerrar Sesión">
              <span class="material-icons-outlined icon-20px">logout</span>
            </button>

            <button class="nav-icon-button">
              <span class="material-icons-outlined icon-20px">shopping_bag</span>
            </button>

            <div class="avatar-gradient" @click="$router.push('/EditarPerfil')" style="cursor: pointer">
            <img 
                alt="User Avatar" 
                class="avatar-image" 
                :src="usuario?.avatar_url 
                    ? `http://localhost:3000${usuario.avatar_url}` 
                    : `https://ui-avatars.com/api/?name=${usuario?.nombre || 'User'}&background=2563eb&color=fff`"
            />
            </div>

            <button @click="toggleDarkMode" class="dark-mode-button">
              <span class="material-icons-outlined">light_mode</span>
            </button>-->
          </div>
        </div>
      </div>
    </nav>
    
    <main class="main-content-wrapper">
      <section class="hero-section">
        <img alt="Hero" class="hero-image" src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"/>
        <div class="hero-gradient-overlay"></div>
        <div class="hero-text-content">
          <p v-if="usuario" class="welcome-badge">Sesión iniciada como {{ usuario.email }}</p>
          <h1 class="hero-title">Cyber Odyssey: <br/>The Final Frontier</h1>
          <p class="hero-subtitle">Experimenta el futuro del gaming hoy mismo.</p>
          <div class="hero-buttons-group">
            <button class="hero-button-primary">Comprar Ahora</button>
          </div>
        </div>
      </section>

      <section>
        <div class="section-header">
          <h2 class="section-title">Catálogo de juegos</h2>
          <span class="section-link">{{ filteredGames.length }} productos encontrados</span>
        </div>

        <div v-if="loading" class="loading-state">Cargando catálogo...</div>

        <div v-else class="card-grid">
          <GameCard 
            v-for="game in filteredGames" 
            :key="game.id_producto" 
            :game="game" 
          />
        </div>
        
        <div v-if="!loading && filteredGames.length === 0" class="empty-state">
           No se encontraron productos disponibles.
        </div>
      </section>
    </main>

    <footer class="main-footer">
      <div class="nav-container footer-content">
        <p class="footer-text">© 2026 NeoGaming. Conectado a PostgreSQL.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import GameCard from './GameCard.vue';

const router = useRouter();
const usuario = ref(String);
const games = ref([]);
const loading = ref(true);
const searchQuery = ref("");

// 1. Cargar sesión
const cargarSesion = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    usuario.value = null;
    return;
  }

  // Intentamos cargar lo que haya en localStorage primero
  const sesionGuardada = localStorage.getItem('user');
  if (sesionGuardada) {
    usuario.value = JSON.parse(sesionGuardada);
  }

  // Pedimos los datos al servidor para obtener avatar_url
  try {
    const response = await fetch('http://localhost:3000/api/perfil', {
      method: 'PUT', // Tu server usa PUT para esta ruta
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) // Enviamos un cuerpo vacío para que no cambie nada, solo devuelva los datos
    });

    if (response.ok) {
      const datosServidor = await response.json();
      
      // Actualizamos el estado y el storage con la info real de la DB
      usuario.value = datosServidor;
      localStorage.setItem('user', JSON.stringify(datosServidor));
      console.log("✔ Perfil sincronizado con la base de datos");
    }
  } catch (error) {
    console.error("Error sincronizando perfil:", error);
  }
};

onMounted(async () => {
  await cargarSesion();
  obtenerProductos();
});

// FETCH de productos desde el Backend
const obtenerProductos = async () => {
  try {
    loading.value = true;
    const response = await fetch('http://localhost:3000/api/productos');
    if (!response.ok) throw new Error("Error en la petición");
    const data = await response.json();
    
    // Mapeamos los datos para asegurar que tengan lo que GameCard necesita
    games.value = data.map(item => ({
      ...item,
      // Si no tienes imagen en la DB, generamos una aleatoria por ID
      imageUrl: `https://picsum.photos/seed/${item.id_producto}/400/500`,
      price: "$59.99" // O el campo que tengas en tu DB
    }));
  } catch (error) {
    console.error("Error al cargar productos:", error);
  } finally {
    loading.value = false;
  }
};

// 3. Filtrado por búsqueda (En proceso)
const filteredGames = computed(() => {
  return games.value.filter(g => 
    g.titulo.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(() => {
  cargarSesion();
  obtenerProductos();
});

const cerrarSesion = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  usuario.value = null;
  router.push('/Login');
};

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark');
};
</script>

<style scoped>

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
  width: 100%;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #6b7280;
}

/* Estilos de sesión */
.user-tag {
  color: #60a5fa !important;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
}

.welcome-badge {
  background: rgba(37, 99, 235, 0.2);
  color: #93c5fd;
  padding: 4px 12px;
  border-radius: 20px;
  display: inline-block;
  font-size: 0.8rem;
  margin-bottom: 10px;
  border: 1px solid rgba(96, 165, 250, 0.3);
}

.logout-btn:hover {
  color: #f87171 !important;
}
/* Estilos Globales (Fuera de scope para Scrollbar y Variables)*/
/* Variables CSS */
:root {
    --primary: #2563EB;
    --primary-hover: #1D4ED8;
    --background-light: #F3F4F6;
    --background-dark: #020511;
    --surface-light: #FFFFFF;
    --surface-dark: #0B1021;
    --surface-dark-lighter: #151B33;
    --text-dark: #111827;
    --text-light: #F3F4F6;
    --text-medium: #6B7280;
    --border-light: #E5E7EB;
    --purple-600: #9333ea;
    --yellow-400: #FACC15;
    --green-600: #059669;
    --green-400: #4ADE80;
}

/* Scrollbar */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
::-webkit-scrollbar-track {
    background: var(--background-dark); 
}
::-webkit-scrollbar-thumb {
    background: var(--primary); 
    border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
    background: var(--primary-hover); 
}

.hero-gradient-overlay {
    /* absolute inset-0 hero-gradient */
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(90deg, rgba(2,5,17,0.95) 0%, rgba(2,5,17,0.7) 40%, rgba(2,5,17,0.1) 100%);
    z-index: 1;
}

/* Estilo base del body */
.app-body {
    /* bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 font-sans antialiased transition-colors duration-300 min-h-screen flex flex-col */
    background-color: var(--background-light);
    color: var(--text-dark);
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    transition: background-color 300ms, color 300ms;
    -webkit-font-smoothing: antialiased;
}

.dark .app-body {
    background-color: var(--background-dark);
    color: var(--text-light);
}

.icon-20px {
    font-size: 20px;
}
</style>

<style scoped>
/* Forma general y contenedores */
.nav-container, .main-content-wrapper, .footer-content {
    max-width: 80rem; /* max-w-7xl */
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem; /* px-4 */
    padding-right: 1rem;
}
@media (min-width: 640px) { /* sm: */
    .nav-container, .main-content-wrapper, .footer-content {
        padding-left: 1.5rem; /* sm:px-6 */
        padding-right: 1.5rem;
    }
}
@media (min-width: 1024px) { /* lg: */
    .nav-container, .main-content-wrapper, .footer-content {
        padding-left: 2rem; /* lg:px-8 */
        padding-right: 2rem;
    }
}

.main-content-wrapper {
    flex-grow: 1;
    width: 100%;
    padding-top: 2rem; /* py-8 */
    padding-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem; /* space-y-10 */
}
.section-bottom-margin {
    padding-bottom: 3rem; /* pb-12 */
}

/* Estilos de navbar*/
.sticky-nav {
    /* sticky top-0 z-50 bg-surface-light dark:bg-[#05081a] border-b border-gray-200 dark:border-white/5 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90 */
    position: sticky;
    top: 0;
    z-index: 50;
    background-color: var(--surface-light);
    border-bottom: 1px solid var(--border-light);
    backdrop-filter: blur(8px);
    background-color: rgba(255, 255, 255, 0.9); /* bg-opacity-90 */
}

.dark .sticky-nav {
    background-color: rgba(5, 8, 26, 0.9); /* dark:bg-[#05081a] with opacity */
    border-color: rgba(255, 255, 255, 0.05); /* dark:border-white/5 */
}

.nav-content {
    /* flex items-center justify-between h-16 */
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem; /* h-16 */
}

.nav-left {
    /* flex items-center gap-8 */
    display: flex;
    align-items: center;
    gap: 2rem;
}

.logo-group {
    /* flex items-center gap-2 */
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.logo-spinner {
    /* w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin-slow */
    width: 2rem;
    height: 2rem;
    border-radius: 9999px;
    border: 4px solid var(--primary);
    border-top-color: transparent;
    animation: spin 3s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.logo-text {
    /* text-xl font-bold tracking-tight text-gray-900 dark:text-white */
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 700;
    letter-spacing: -0.025em; /* tracking-tight */
    color: var(--text-dark);
}

.dark .logo-text {
    color: white;
}

.nav-links-desktop {
    /* hidden md:flex items-baseline space-x-6 */
    display: none;
    align-items: baseline;
    gap: 1.5rem;
}

@media (min-width: 768px) { /* md: */
    .nav-links-desktop {
        display: flex;
    }
}

.nav-link {
    /* text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors */
    color: #6B7280; /* gray-500 */
    font-weight: 500;
    transition: color 300ms;
    text-decoration: none;
}
.dark .nav-link {
    color: #9CA3AF; /* gray-400 */
}
.nav-link:hover {
    color: var(--primary);
}
.dark .nav-link:hover {
    color: white;
}

.nav-link-active {
    /* text-gray-900 dark:text-white font-medium hover:text-primary */
    color: var(--text-dark);
}
.dark .nav-link-active {
    color: white;
}

.nav-right {
    /* flex items-center gap-4 */
    display: flex;
    align-items: center;
    gap: 1rem;
}

/* Nav Search Input (Desktop) */
.search-desktop-wrapper {
    /* hidden lg:block relative */
    display: none;
    position: relative;
}
@media (min-width: 1024px) {
    .search-desktop-wrapper {
        display: block;
    }
}
.search-icon-wrapper {
    /* absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none */
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    padding-left: 0.75rem;
    display: flex;
    align-items: center;
    pointer-events: none;
}
.search-icon-wrapper .material-icons-outlined {
    color: #9CA3AF; /* text-gray-400 */
    font-size: 0.875rem;
}

.nav-search-input {
    /* block w-64 pl-10 pr-3 py-1.5 border border-gray-300 dark:border-white/10 rounded-md leading-5 bg-gray-100 dark:bg-surface-dark-lighter text-gray-900 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors */
    display: block;
    width: 16rem; /* w-64 */
    padding-left: 2.5rem;
    padding-right: 0.75rem;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    border: 1px solid #D1D5DB; /* gray-300 */
    border-radius: 0.375rem;
    line-height: 1.25;
    background-color: #F3F4F6; /* gray-100 */
    color: var(--text-dark);
    font-size: 0.875rem;
    outline: none;
    transition: all 300ms;
}
.nav-search-input::placeholder {
    color: #6B7280; /* placeholder-gray-500 */
}

.dark .nav-search-input {
    border-color: rgba(255, 255, 255, 0.1);
    background-color: var(--surface-dark-lighter);
    color: #E5E7EB; /* gray-200 */
}

.nav-search-input:focus {
    outline: 1px solid var(--primary);
    border-color: var(--primary);
}

/* Botones de iconos del nav */
.nav-icon-button {
    /* p-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white bg-gray-100 dark:bg-surface-dark-lighter rounded-md transition-colors */
    padding: 0.5rem;
    color: #6B7280;
    background-color: #F3F4F6;
    border-radius: 0.375rem;
    transition: all 300ms;
    border: none;
    cursor: pointer;
}
.nav-icon-button:hover {
    color: var(--primary);
}
.dark .nav-icon-button {
    color: #9CA3AF;
    background-color: var(--surface-dark-lighter);
}
.dark .nav-icon-button:hover {
    color: white;
}

/* Avatar */
.avatar-gradient {
    /* w-9 h-9 rounded-full bg-gradient-to-br from-primary to-purple-600 p-[2px] cursor-pointer */
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 9999px;
    background: linear-gradient(to bottom right, var(--primary), var(--purple-600));
    padding: 2px;
    cursor: pointer;
}
.avatar-image {
    /* h-full w-full rounded-full object-cover border-2 border-surface-light dark:border-surface-dark */
    height: 100%;
    width: 100%;
    border-radius: 9999px;
    object-fit: cover;
    border: 2px solid var(--surface-light);
}
.dark .avatar-image {
    border-color: var(--surface-dark);
}

/* Boton de activar modo oscuro */
.dark-mode-button {
    /* ml-2 p-2 text-gray-500 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors */
    margin-left: 0.5rem;
    padding: 0.5rem;
    color: #6B7280;
    border: none;
    background: none;
    border-radius: 9999px;
    transition: all 300ms;
    cursor: pointer;
}
.dark .dark-mode-button {
    color: var(--yellow-400);
}
.dark-mode-button:hover {
    background-color: #F3F4F6;
}
.dark .dark-mode-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

/* Sección del Hero */
.hero-section {
    /* relative rounded-2xl overflow-hidden h-[500px] shadow-2xl group */
    position: relative;
    border-radius: 1rem; /* rounded-2xl */
    overflow: hidden;
    height: 500px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* shadow-2xl */
}

.hero-image {
    /* absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 700ms ease-in-out;
    z-index: 0;
}

.hero-section:hover .hero-image {
    transform: scale(1.05);
}

.hero-text-content {
    /* relative h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl */
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 2rem; /* px-8 */
    padding-right: 2rem;
    max-width: 48rem; /* max-w-3xl */
    z-index: 2;
}
@media (min-width: 768px) {
    .hero-text-content {
        padding-left: 4rem; /* md:px-16 */
        padding-right: 4rem;
    }
}

.hero-title {
    /* text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight */
    font-size: 2.25rem; /* text-4xl */
    line-height: 1.2;
    font-weight: 800; /* font-extrabold */
    color: white;
    margin-bottom: 1rem;
}
@media (min-width: 768px) {
    .hero-title {
        font-size: 3.75rem; /* md:text-6xl */
    }
}

.hero-subtitle {
    /* text-gray-200 text-lg md:text-xl mb-8 max-w-xl */
    color: #E5E7EB; /* gray-200 */
    font-size: 1.125rem; /* text-lg */
    margin-bottom: 2rem;
    max-width: 36rem; /* max-w-xl */
}
@media (min-width: 768px) {
    .hero-subtitle {
        font-size: 1.25rem; /* md:text-xl */
    }
}

.hero-buttons-group {
    /* flex flex-wrap gap-4 */
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.hero-button-base {
    color: white;
    font-weight: 600;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-button-primary {
    /* bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-primary/50 transition-all transform hover:-translate-y-0.5 */
    background-color: var(--primary);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1); /* shadow-lg */
    font-weight: 600;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-button-primary:hover {
    background-color: var(--primary-hover);
    box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.5), 0 4px 6px -4px rgba(37, 99, 235, 0.2); /* hover:shadow-primary/50 */
    transform: translateY(-2px);
}

.hero-button-secondary {
    /* bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-medium py-3 px-8 rounded-lg transition-all flex items-center gap-2 */
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    font-weight: 500;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    transition: all 200ms;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
}
.hero-button-secondary:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

/* Sección de filtro */
.filter-section {
    /* bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-gray-200 dark:border-white/5 flex flex-col lg:flex-row gap-4 items-center justify-between */
    background-color: var(--surface-light);
    border-radius: 0.75rem;
    padding: 1rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
    border: 1px solid var(--border-light);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
}
.dark .filter-section {
    background-color: var(--surface-dark);
    border-color: rgba(255, 255, 255, 0.05);
}
@media (min-width: 1024px) {
    .filter-section {
        flex-direction: row;
    }
}

.filter-search-wrapper {
    /* relative w-full lg:w-1/3 */
    position: relative;
    width: 100%;
}
@media (min-width: 1024px) {
    .filter-search-wrapper {
        width: 33.3333%;
    }
}
.search-icon-wrapper-large {
    /* absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none */
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    padding-left: 0.75rem;
    display: flex;
    align-items: center;
    pointer-events: none;
}
.search-icon-wrapper-large .material-icons-outlined {
    color: #9CA3AF; /* text-gray-400 */
}

.filter-search-input {
    /* block w-full pl-10 pr-3 py-2.5 bg-gray-50 dark:bg-surface-dark-lighter border-none rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary */
    display: block;
    width: 100%;
    padding-left: 2.5rem;
    padding-right: 0.75rem;
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
    background-color: #F9FAFB; /* gray-50 */
    border: none;
    border-radius: 0.5rem;
    color: var(--text-dark);
    font-size: 1rem;
    outline: none;
}
.dark .filter-search-input {
    background-color: var(--surface-dark-lighter);
    color: white;
}
.filter-search-input::placeholder {
    color: #6B7280; /* placeholder-gray-500 */
}
.filter-search-input:focus {
    box-shadow: 0 0 0 2px var(--primary);
}

.filter-buttons-group {
    /* flex flex-wrap gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 */
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    width: 100%;
    overflow-x: auto;
    padding-bottom: 0.5rem;
}
@media (min-width: 1024px) {
    .filter-buttons-group {
        width: auto;
        padding-bottom: 0;
        flex-wrap: nowrap;
    }
}

.filter-button {
    /* flex items-center justify-between gap-2 px-4 py-2.5 bg-gray-50 dark:bg-surface-dark-lighter text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-sm font-medium whitespace-nowrap */
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.625rem 1rem;
    background-color: #F9FAFB;
    color: #4B5563; /* gray-700 */
    border-radius: 0.5rem;
    transition: all 300ms;
    font-size: 0.875rem;
    font-weight: 500;
    border: none;
    white-space: nowrap;
    cursor: pointer;
}
.filter-button:hover {
    background-color: #E5E7EB;
}

.dark .filter-button {
    background-color: var(--surface-dark-lighter);
    color: #D1D5DB; /* gray-300 */
}
.dark .filter-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

/* Sección de productos */
.section-header {
    /* flex justify-between items-end mb-6 */
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1.5rem;
}

.section-title {
    /* text-2xl font-bold text-gray-900 dark:text-white */
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
    color: var(--text-dark);
}
.dark .section-title {
    color: white;
}

.section-link {
    /* text-primary hover:text-primary-hover text-sm font-medium flex items-center gap-1 */
    color: var(--primary);
    font-size: 0.875rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    text-decoration: none;
    transition: color 300ms;
}
.section-link:hover {
    color: var(--primary-hover);
}

.slider-nav-group {
    /* flex gap-2 */
    display: flex;
    gap: 0.5rem;
}

.nav-slider-button {
    /* w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-white/5 hover:bg-gray-300 dark:hover:bg-white/10 text-gray-600 dark:text-white transition-colors */
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    background-color: #E5E7EB;
    color: #4B5563; /* gray-600 */
    transition: all 300ms;
    border: none;
    cursor: pointer;
}
.nav-slider-button:hover {
    background-color: #D1D5DB;
}

.dark .nav-slider-button {
    background-color: rgba(255, 255, 255, 0.05);
    color: white;
}
.dark .nav-slider-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.card-grid {
    /* grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 */
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1.5rem;
}

@media (min-width: 640px) { /* sm: */
    .card-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
@media (min-width: 1024px) { /* lg: */
    .card-grid {
        grid-template-columns: repeat(5, minmax(0, 1fr));
    }
}

/* Footer */
.main-footer {
    /* bg-surface-light dark:bg-[#05081a] border-t border-gray-200 dark:border-white/5 py-12 mt-auto */
    background-color: var(--surface-light);
    border-top: 1px solid var(--border-light);
    padding-top: 3rem;
    padding-bottom: 3rem;
    margin-top: auto;
}
.dark .main-footer {
    background-color: rgba(5, 8, 26, 1);
    border-color: rgba(255, 255, 255, 0.05);
}

.footer-content {
    /* flex flex-col md:flex-row justify-between items-center gap-6 */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
}
@media (min-width: 768px) {
    .footer-content {
        flex-direction: row;
    }
}

.footer-left {
    /* flex items-center gap-4 */
    display: flex;
    align-items: center;
    gap: 1rem;
}

.footer-text {
    /* text-gray-500 dark:text-gray-400 text-sm */
    color: #6B7280;
    font-size: 0.875rem;
}
.dark .footer-text {
    color: #9CA3AF;
}

.footer-links {
    /* flex gap-8 text-sm text-gray-500 dark:text-gray-400 */
    display: flex;
    gap: 2rem;
    font-size: 0.875rem;
    color: #6B7280;
}
.dark .footer-links {
    color: #9CA3AF;
}

.footer-link {
    /* hover:text-primary dark:hover:text-white transition-colors */
    text-decoration: none;
    transition: color 300ms;
}
.footer-link:hover {
    color: var(--primary);
}
.dark .footer-link:hover {
    color: white;
}
</style>