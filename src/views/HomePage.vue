<template>
  <div class="app-body">
    
    <nav class="sticky-nav">
      <div class="nav-container">
        <div class="nav-content">
          <div class="nav-left">
            <div class="logo-group">
              <div class="logo-spinner" style="animation-duration: 3s;"></div>
              <span class="logo-text">GameStore</span>
            </div>
            <div class="nav-links-desktop">
              <a class="nav-link nav-link-active" href="#">Store</a>
              
              <RouterLink to="/dashboard" class="nav-link">Dashboard</RouterLink>
              <RouterLink to="/login" class="nav-link">Login</RouterLink>
              <RouterLink to="/crudtest" class="nav-link">CrudTest</RouterLink>

              <a class="nav-link" href="#">Library</a>
              <a class="nav-link" href="#">Community</a>
              <a class="nav-link" href="#">Support</a>
            </div>
          </div>
          <div class="nav-right">
            <div class="search-desktop-wrapper">
              <span class="search-icon-wrapper">
                <span class="material-icons-outlined text-sm">search</span>
              </span>
              <input class="nav-search-input" placeholder="Search" type="text"/>
            </div>
            <button class="nav-icon-button">
              <span class="material-icons-outlined icon-20px">shopping_bag</span>
            </button>
            <button class="nav-icon-button">
              <span class="material-icons-outlined icon-20px">notifications</span>
            </button>
            <div class="avatar-gradient">
              <img alt="User Avatar" class="avatar-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK8tNXRejlw3Y1HMuww4O8VXz3ODbj2WCtCEzd4X-PusroVmL6ScTyMQO0ZjSD2S5Itok8m2CJLmHpvy6NNIHZCYNwsTFHS78QnB9BlcTRwzEOwGLzfz9Tw2x4pgpNlA9wgC7erPn4-B5vz3ODhZz-0amgq-gOOmgOLKjiMA3h0WFSmnb8dfbzg65dkt3SKuuQjh9UEPml2JzwT_28-aAS-vwIemLF7sgJ-TKEYNSyruKq4j2M0pE0irZRZsnmz0mRQ6lYZ7gpwzw"/>
            </div>
            <button @click="toggleDarkMode" class="dark-mode-button">
              <span class="material-icons-outlined">light_mode</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    
    <main class="main-content-wrapper">
      
      <section class="hero-section">
        <img alt="Cyberpunk City Background" class="hero-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlgwUHsyAr4LGxXXVJ3MVN-v_4u78467bZSObj11-ZQ6v9px0OGHR8AnE68J-ad0H9w4CrnQKAGJPu2J4DHg-cKXoCJOKr4x8PAkOn5B3uI7yey9ABZsVRQxJKR0KTvxhiJETodjx3m2xfZ-VT0U7QVLVL6K7HFwe0qM-AtPfXCAIXEpS49iPRoEo2rQNfpWmsn8k01julklabaCl8iXgD86ueZfSXaistJpSWhQFsk31NzMcghWZmeszAP1hVI0zaySO3sNh031o"/>
        <div class="hero-gradient-overlay"></div>
        <div class="hero-text-content">
          <h1 class="hero-title">
            Cyber Odyssey: <br/>The Final Frontier
          </h1>
          <p class="hero-subtitle">
            Experience the latest AAA release with stunning graphics and immersive gameplay. Available now!
          </p>
          <div class="hero-buttons-group">
            <button class="hero-button-primary">
              Buy Now - $59.99
            </button>
            <button class="hero-button-secondary">
              <span class="material-icons-outlined text-sm">favorite_border</span>
              Add to Wishlist
            </button>
          </div>
        </div>
      </section>

      <section class="filter-section">
        <div class="filter-search-wrapper">
          <span class="search-icon-wrapper-large">
            <span class="material-icons-outlined">search</span>
          </span>
          <input class="filter-search-input" placeholder="Buscar juegos, DLCs y más..." type="text"/>
        </div>
        <div class="filter-buttons-group">
          <button v-for="filter in filters" :key="filter" class="filter-button">
            {{ filter }}
            <span class="material-icons-outlined text-sm">arrow_drop_down</span>
          </button>
        </div>
      </section>

      <section>
        <div class="section-header">
          <h2 class="section-title">Juegos Destacados</h2>
          <a class="section-link" href="#">
            View All <span class="material-icons-outlined text-sm">arrow_forward</span>
          </a>
        </div>
        <div class="card-grid">
          <GameCard v-for="game in featuredGames" :key="game.title" :game="game" />
        </div>
      </section>

      <section class="section-bottom-margin">
        <div class="section-header">
          <h2 class="section-title">Nuevos Lanzamientos</h2>
          <div class="slider-nav-group">
            <button class="nav-slider-button">
              <span class="material-icons-outlined text-sm">chevron_left</span>
            </button>
            <button class="nav-slider-button">
              <span class="material-icons-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
        <div class="card-grid">
          <GameCard v-for="game in newReleases" :key="game.title" :game="game" />
        </div>
      </section>
    </main>

    <footer class="main-footer">
      <div class="nav-container footer-content">
        <div class="footer-left">
          <div class="logo-spinner" style="animation-duration: 3s;"></div>
          <p class="footer-text">© 2024 GameStore. All rights reserved.</p>
        </div>
        <div class="footer-links">
          <a class="footer-link" href="#">About Us</a>
          <a class="footer-link" href="#">Support</a>
          <a class="footer-link" href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router'; // Necesario para que funcione el RouterLink en el template
import GameCard from './GameCard.vue';

// --- Data Simulado ---
const featuredGames = ref([
  // Agregamos 'slug'
  { title: 'Neon Racers', slug: 'neon-racers', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUM8pwS2zYeR4r0a_50A4sdbxIhOHd7ROpUm6UOTXiLrvHzqvJys7lNRUIWFgb7-XNgRxOC3cIofmGzfxepU6Pwb-x9njnX034Kot0nbwR-Ol75cWya2nSDPda0SuvKedM_5o84tHFKxYkDU27cB5eFk_avglTkFo3eYHBLOhX5E14yFPhfe7YNk-a1FCTob1MOQQ59YiJuNn-3TG7tVv3F0t2ARXNLUf0R2twovfchnhvJo-rgdOblcksqUddIYART_sIjguXorM', price: '$19.99', oldPrice: '$24.99', discount: '-20%' },
  { title: 'Galaxy Warriors', slug: 'galaxy-warriors', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3xkCt9_ry5zfLtXzpTfimr3STXBm7rRdlEri0x1StgFkntJiOjnDkSMugTbqVgAniENEAEmcqIRRwl40rOkC_dYJI4nEhD5duo_fPh4E-veBTrD6B7FUavcB9Lpj_2Dhn7YAn6HN0a-UN7EvBNNZvjuEMvXVJC4h_7KtVKLSJZ18bo4CDqcFV9a1JbaJ2lQBpRjrBhB0WtNqVpKt_pvu5dD39AunWjXy0v1-ju0nFnlH5OMbP_bkKYWvZkxDFR4TNRdYm6j7exTs', price: '$39.99', oldPrice: null, discount: null },
  { title: 'Mystic Forest', slug: 'mystic-forest', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAreJU7hNM5bQCAemaoWt_xgsKV3u8pOJlSajbMvsSVjSWS9RFDWFn3I-su3T2B-uI3_36PxM_i_GHr3dYkmTAnLe0ri66khr2ooH2LSVaRCvDnr2M3jz89f2bYF2sloQdLHeGixuyW_mWSD6pzNhg_ugSurO943qxGMziIhhoLMZ6Ju3kwxldLgM8OdnFeEKf261C-EwtEda5A9BHLj6GHOSdviXfZMT80BmpGVRVG8q1QgNMxZ8-c8g6kvpZIRvKmZp3mWV1Bq6E', price: '$29.99', oldPrice: null, discount: null },
  { title: 'The Last Stand', slug: 'the-last-stand', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5fqoYa8w-pp8rSRcoQJEkj4jzsdy0HiUABXqNJ8SQ8Vqn5sYznMMLchgQDxogtYfdPkCMhLCcqoLYphSLO-dnf3ROhg7dChhSMvWT_ScGT0CsFXtfFsHDTO5rnHs3_wZUV7rlO0xjBqInmkbxmHL8J01pYUXPVWCXf_z7A6J8D3z2_Kgq5DCMqisZDAp0DwklzuumIy9bxRIi0pnS40lVOLvkDimriXSKQtS-SHrszlA6dTucVfABUWhPeBtrqho_6zl57_HK5FE', price: '$24.99', oldPrice: '$49.99', discount: '-50%' },
  { title: 'Ancient Realms', slug: 'ancient-realms', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDa_57CpVcXlgibXvw4sbb_Uarx3ImF7nVrWnFH2lWotT3EmrlqG90_XCnj4dBJ8ByKosbRSEuNiiK0MJHGs_ZlMiWUwqPN29CIdgsSK4T6e2CC1pz2pizg6NxQprLy7J-kx3i1tye_4Hyc2DJXmF7FbkRUfMLCd1aE9K6f1qHls0VM8CUhElSiObFiW1I0TU5T52-ueXzDzg6GbScTHCl5gRi-_rZgxNYiHRqX9GmruWqBMOsoKMzdGhvGi04uSl3OBf3NQYs0Vko', price: '$59.99', oldPrice: null, discount: null },
]);

const newReleases = ref([
  // Agregamos 'slug'
  { title: 'Desert Wanderer', slug: 'desert-wanderer', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7HlBIw0_V7DFqkZCpbL80acsLMFZp2EnxKnZhfxfcE5tBwHEv-s7DdArchb8aPOojQpILChnN8nQKiwwFIRclZUpNfoJcImQXHejY1a4JAPwvsm9jkF9JcoRLrRVlEpNBXPFLW0GzjdPfalGeaF9chMCbxbO-ei0hei2-_Bzhvw_5Ux54J_McHzLibm1vxxWqZU75k_E1urJrZTCyQ5A5yTQmNnDlJK99Mp2nVw3I5IJorefRogXXaidHtQyRMF-5bk09s7yuLwU', price: '$49.99', oldPrice: null, discount: null },
  { title: 'E-Sports Champions', slug: 'e-sports-champions', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDicFWOAplhgxC5Px8slNyGSemS-xrJwd6mtEYWUjMOpr8rf-bvNwpCZZxKvLIEQPsl5EV7JVWBrNgtP-bNaUqHingxNGkakARpSreGojXVwfYe-IgnH5prWh_zL47eShocEX2e12fSZoiX5LM1bQfPJrCZL8JBDv3ltTElwuhMRAfYk2fWMDf-AOkFSzFOMVSsf-InMERSzX6N46-cVzKgR0tofCoB9Ake51A_TCiug-GMPSGCqyKJiBISDSMXhqImc2vvbdhPxmg', price: '$39.99', oldPrice: null, discount: null },
  { title: 'Pixel Quest', slug: 'pixel-quest', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTOVQPLJ7xLw3_swxb4cZioUBLKPbz3kY8I--7CsyczfIv7ql9qJl_PA1oAFV2v_34tzOJAmXMZn6skId-1Wc3sxHaTH19ezQf_5PJLyBqsxkwOHEOm95EgIiGybyNx8FKQat-p09x6PpRmpm-o9-JCutF6DxOZvnX-YnMlBpuNtARdzwA23xUvBSevIpa8cwfAFvtagiLTxEHVOULPvuDRF___z7t1bfHVflgbCVELnb8XR7Wa6quQvmxczjjT7BzW_h5YtxOA4M', price: '$14.99', oldPrice: null, discount: null },
  { title: 'Stealth Ops', slug: 'stealth-ops', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIIZlbSVc2fLSFl4y0jOmJSVt5Edcs0anUmvO3nTM6Kx4dWNbU7Z_tFImDiQa-92aCfDpus4KFlA7Id5Buq2waahKl5fHjzxqU6yeY_ZAYYIRCHgJFFDNIjHh8GJ4lYe9CAibwwZQ059sEB8gfxUW_l_rInZDCWVfp6u19FdLZRVJt7i1aAnjoRQq9Vb_fydbeOxOMJGmICsbOcMbG4dfXDm3FznCnMjCjbDnv7lJ82NiAgN2rToivDv6BDQHGI_fcc6Jo2DxFp5g', price: '$59.99', oldPrice: null, discount: null },
  { title: 'Soccer Stars 24', slug: 'soccer-stars-24', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc0FgNtRWGbxjPH8sybnZsZ-GkpclkMaL9esRzxwniB2zFKQfqreYORXaq2YdZjBkay-nrcZD_6PGqTWgiOoa3tSJKQ_vv7NOpSg-yI0pwDyxfcqVz0KYzkfgZo2dW-sadDZI5PGAEDQujR0fWAXp0ehXNwccmRmJYFFGC8A4Xluk94BM1fcnatFkdzaqpfhJRZ5rplH2c8ic82IPfFxPLOhg2CfAv0zm5pg0Bx7Apq5SPcBhdsQkkks7L4a1wyxoFREZN48Sop1g', price: '$59.99', oldPrice: null, discount: null },
]);

const filters = ref([
  'Genre', 'Price Range', 'Special Offers', 'User Rating',
]);

// --- Lógica del Modo Oscuro ---
const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
};
</script>

<style>
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

/* Hero Gradient */
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

/* Base Body Style */
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
/* Global Layout & Containers */
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

/* Navbar Styles*/
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

/* Nav Icon Buttons */
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

/* Dark Mode Toggle Button */
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

/* Hero Section */
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

/* Filter Section */
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

/* Game Sections (Featured, New Releases) */
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