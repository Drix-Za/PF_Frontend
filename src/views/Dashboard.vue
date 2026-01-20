<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
// Lógica de Vue para el modo oscuro
const isDark = ref(true); 

function toggleDarkMode() {
  isDark.value = !isDark.value;
  // Aplica/remueve la clase 'dark' a la etiqueta <html>
  document.documentElement.classList.toggle('dark', isDark.value);
}

// Inicializa el modo oscuro en el <html> al cargar el componente
onMounted(() => {
  document.documentElement.classList.toggle('dark', isDark.value);
});
</script>

<template>
  <div :class="{ 'dark': isDark }" id="app-wrapper">
    <aside class="sidebar">
      <div>
        <div class="sidebar-header">
          <div class="logo-icon-wrapper">
            GS
          </div>
          <div>
            <h1 class="logo-title">Admin Panel</h1>
            <p class="logo-subtitle">GameStore Inc.</p>
          </div>
        </div>
        <nav class="sidebar-nav">
          <a class="nav-link nav-link-active" href="#">
            <span class="material-symbols-outlined nav-link-icon">dashboard</span>
            <span class="nav-link-text">Dashboard</span>
          </a>
          <a class="nav-link" href="#">
            <span class="material-symbols-outlined nav-link-icon">analytics</span>
            <span class="nav-link-text">Analytics</span>
          </a>
          <a class="nav-link" href="#">
            <span class="material-symbols-outlined nav-link-icon">inventory_2</span>
            <span class="nav-link-text">Products</span>
          </a>
          <a class="nav-link" href="#">
            <span class="material-symbols-outlined nav-link-icon">group</span>
            <span class="nav-link-text">Users</span>
          </a>
          <a class="nav-link" href="#">
            <span class="material-symbols-outlined nav-link-icon">campaign</span>
            <span class="nav-link-text">Marketing</span>
          </a>
        </nav>
      </div>
      <div class="sidebar-footer">
        
        <RouterLink to="/" class="nav-link">
          <span class="material-symbols-outlined nav-link-icon">storefront</span>
          <span class="nav-link-text">Volver a la Tienda</span>
        </RouterLink>
        
        <a class="nav-link" href="#">
          <span class="material-symbols-outlined nav-link-icon">settings</span>
          <span class="nav-link-text">Settings</span>
        </a>
        <a class="nav-link" href="#">
          <span class="material-symbols-outlined nav-link-icon">help</span>
          <span class="nav-link-text">Help</span>
        </a>
      </div>
    </aside>

    <main class="main-content">
      <div class="main-header">
        <div>
          <h2 class="header-title">Dashboard de Ventas y Actividad</h2>
          <p class="header-subtitle">Resumen del rendimiento de hoy y los usuarios en línea.</p>
        </div>
        <button class="dark-mode-toggle" @click="toggleDarkMode">
          <span v-if="isDark" class="material-symbols-outlined">light_mode</span>
          <span v-else class="material-symbols-outlined">dark_mode</span>
        </button>
      </div>

      <div class="filter-panel">
        <div class="filter-controls">
          <div class="filter-group-time">
            <label class="filter-label">Período de Tiempo</label>
            <div class="relative">
              <select class="filter-select">
                <option>Hoy</option>
                <option>Ayer</option>
                <option>Últimos 7 días</option>
                <option>Este Mes</option>
              </select>
            </div>
          </div>
          <div class="filter-group-product">
            <label class="filter-label">Filtrar Productos</label>
            <div class="relative">
              <select class="filter-select">
                <option>Productos Más Vendidos</option>
                <option>Nuevos Lanzamientos</option>
                <option>En Oferta</option>
              </select>
            </div>
          </div>
          <button class="apply-button">
            <span class="material-symbols-outlined apply-button-icon">tune</span>
            Aplicar Filtros
          </button>
        </div>
      </div>

      <div class="stat-grid">
        <div class="stat-card">
          <div>
            <h3 class="stat-label">Ventas Totales (Hoy)</h3>
            <div class="stat-value">$1,520.50</div>
          </div>
          <div class="stat-trend">
            <span class="material-symbols-outlined stat-trend-icon">trending_up</span>
            +5.2%
          </div>
        </div>
        <div class="stat-card">
          <div>
            <h3 class="stat-label">Usuarios en Línea</h3>
            <div class="stat-value">87</div>
          </div>
          <div class="stat-trend">
            <span class="material-symbols-outlined stat-trend-icon">trending_up</span>
            +12%
          </div>
        </div>
        <div class="stat-card stock-card">
          <h3 class="stock-title">Estado del Stock</h3>
          <div class="stock-item-list">
            <div>
              <div class="stock-info">
                <span class="stock-name">Cyber Odyssey 2077</span>
                <span class="stock-units">125 uds.</span>
              </div>
              <div class="progress-bar-bg">
                <div class="progress-bar-fill fill-primary" style="width: 85%"></div>
              </div>
            </div>
            <div>
              <div class="stock-info">
                <span class="stock-name">Starfield Explorers Pack</span>
                <span class="stock-units">78 uds.</span>
              </div>
              <div class="progress-bar-bg">
                <div class="progress-bar-fill fill-success" style="width: 60%"></div>
              </div>
            </div>
            <div>
              <div class="stock-info">
                <span class="stock-name">Age of Empires IV: Deluxe</span>
                <span class="stock-units">23 uds.</span>
              </div>
              <div class="progress-bar-bg">
                <div class="progress-bar-fill fill-orange" style="width: 25%"></div>
              </div>
            </div>
            <div>
              <div class="stock-info">
                <span class="stock-name">Forza Horizon 5: Premium</span>
                <span class="stock-units">8 uds.</span>
              </div>
              <div class="progress-bar-bg">
                <div class="progress-bar-fill fill-red" style="width: 10%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="chart-panel">
        <div class="chart-header">
          <h3 class="chart-title">Evolución de Ventas (Hoy)</h3>
          <div class="chart-period-buttons">
            <button class="period-button">0-6h</button>
            <button class="period-button period-button-active">6-12h</button>
            <button class="period-button">12-18h</button>
            <button class="period-button">18-24h</button>
          </div>
        </div>
        <div class="bar-chart-area">
          <div class="bar-wrapper" style="height: 20%;">
            <div class="bar-tooltip">$240</div>
          </div>
          <div class="bar-wrapper" style="height: 35%;">
            <div class="bar-tooltip">$420</div>
          </div>
          <div class="bar-wrapper" style="height: 55%;">
            <div class="bar-tooltip">$660</div>
          </div>
          <div class="bar-wrapper" style="height: 80%;">
            <div class="bar-tooltip">$960</div>
          </div>
          <div class="bar-wrapper" style="height: 65%;">
            <div class="bar-tooltip">$780</div>
          </div>
          <div class="bar-wrapper" style="height: 50%;">
            <div class="bar-tooltip">$600</div>
          </div>
          <div class="bar-wrapper" style="height: 45%;">
            <div class="bar-tooltip">$540</div>
          </div>
          <div class="bar-wrapper" style="height: 40%;">
            <div class="bar-tooltip">$480</div>
          </div>
        </div>
        <div class="chart-labels">
          <span>06:00</span>
          <span>07:00</span>
          <span>08:00</span>
          <span>09:00</span>
          <span>10:00</span>
          <span>11:00</span>
          <span>12:00</span>
          <span>13:00</span>
        </div>
      </div>

      <div class="table-panel">
        <div class="table-header-content">
          <h3 class="table-title">Productos Más Vendidos</h3>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead class="table-head">
              <tr>
                <th class="px-6 py-4 font-medium" scope="col">Producto</th>
                <th class="px-6 py-4 font-medium text-center" scope="col">Unidades Vendidas</th>
                <th class="px-6 py-4 font-medium text-right" scope="col">Ingresos Totales</th>
              </tr>
            </thead>
            <tbody class="table-body">
              <tr class="table-row">
                <td class="cell-product">Cyber Odyssey 2077</td>
                <td class="cell-center">152</td>
                <td class="cell-right">$9,120.00</td>
              </tr>
              <tr class="table-row">
                <td class="cell-product">Starfield Explorers Pack</td>
                <td class="cell-center">110</td>
                <td class="cell-right">$7,699.90</td>
              </tr>
              <tr class="table-row">
                <td class="cell-product">Age of Empires IV: Deluxe</td>
                <td class="cell-center">98</td>
                <td class="cell-right">$5,870.20</td>
              </tr>
              <tr class="table-row">
                <td class="cell-product">Forza Horizon 5: Premium</td>
                <td class="cell-center">85</td>
                <td class="cell-right">$8,415.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="main-footer">
        © 2024 GameStore. All rights reserved.
      </div>
    </main>
  </div>
</template>

<style>
/* 1. Variables CSS */
:root {
  /* Light Mode */
  --primary: #1d4ed8; 
  --primary-hover: #1e40af; 
  --background-light: #f3f4f6; 
  --surface-light: #ffffff; 
  --text-dark: #1f2937; 
  --text-medium: #6b7280; 
  --text-light-gray: #9ca3af; 
  --border-light: #e5e7eb; 
  --accent-success: #10b981; 
  --red-500: #ef4444;
  --orange-500: #f97316;
}

html.dark {
  /* Dark Mode */
  --background-dark: #020417;
  --surface-dark: #0f172a; 
  --sidebar-dark: #050b26;
  --text-light: #f3f4f6; 
  --text-secondary-dark: #d1d5db; 
  --border-dark: #1f2937; 
  --input-dark: #1f2937; 
}

/* Base global */
* {
  box-sizing: border-box;
}

/* Contenedor principal de la App */
#app-wrapper {
  background-color: var(--background-light);
  font-family: 'Inter', sans-serif;
  color: var(--text-dark);
  min-height: 100vh;
  display: flex;
  transition: background-color 200ms, color 200ms;
  margin: 0;
  line-height: 1.5;
  width: 100%; 
}

html.dark #app-wrapper {
  background-color: var(--background-dark);
  color: var(--text-light);
}

/* Sidebar */
.sidebar {
  width: 16rem; 
  background-color: var(--surface-light);
  border-right: 1px solid var(--border-light);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  height: 100%;
  z-index: 10;
  display: none;
}

html.dark .sidebar {
  background-color: var(--sidebar-dark);
  border-color: var(--border-dark);
}

@media (min-width: 1024px) { 
  .sidebar {
    display: flex;
  }
}

/* Sidebar Header */
.sidebar-header {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon-wrapper {
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 9999px;
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.75rem;
}

.logo-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-dark);
}

html.dark .logo-title {
  color: white;
}

.logo-subtitle {
  font-size: 0.75rem;
  color: var(--text-medium);
}

html.dark .logo-subtitle {
  color: var(--text-light-gray);
}

/* Navigation Links */
.sidebar-nav {
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 1rem;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #4b5563; 
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 200ms;
}

html.dark .nav-link {
  color: var(--text-light-gray);
}

.nav-link:hover {
  background-color: #f3f4f6; 
}

html.dark .nav-link:hover {
  background-color: rgba(255, 255, 255, 0.05); 
}

.nav-link-active {
  background-color: var(--primary);
  color: white;
}

.nav-link-active:hover {
  background-color: var(--primary); 
}

.nav-link-icon {
  margin-right: 0.75rem;
}

.nav-link-text {
  font-size: 0.875rem;
  font-weight: 500;
}

/* Sidebar Footer Links */
.sidebar-footer {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border-top: 1px solid var(--border-light);
}

html.dark .sidebar-footer {
  border-color: var(--border-dark);
}

/* Main */
.main-content {
  flex-grow: 1;
  padding: 1.5rem; 
  overflow-y: auto;
}

@media (min-width: 1024px) { 
  .main-content {
    margin-left: 16rem; 
    padding: 2.5rem; 
  }
}

/* Header & Toggle Button */
.main-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1rem;
}

@media (min-width: 768px) {
  .main-header {
    flex-direction: row;
    align-items: center;
  }
}

.header-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827; 
}
html.dark .header-title {
  color: white;
}

.header-subtitle {
  font-size: 0.875rem;
  color: var(--text-medium);
  margin-top: 0.25rem;
}
html.dark .header-subtitle {
  color: var(--text-light-gray);
}

.dark-mode-toggle {
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: #e5e7eb; 
  color: #4b5563; 
  border: none;
  cursor: pointer;
  transition: all 200ms;
}

html.dark .dark-mode-toggle {
  background-color: #374151; 
  color: #e5e7eb; 
}

.dark-mode-toggle:hover {
  background-color: #d1d5db; 
}

html.dark .dark-mode-toggle:hover {
  background-color: #4b5563; 
}

/* Filter Panel */
.filter-panel {
  background-color: var(--surface-light);
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-light);
  margin-bottom: 2rem;
}
html.dark .filter-panel {
  background-color: var(--surface-dark);
  border-color: var(--border-dark);
}

.filter-controls {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-end;
}
@media (min-width: 768px) {
  .filter-controls {
    flex-direction: row;
  }
}

.filter-group-time {
  flex: 1 1 0%;
  width: 100%;
}
.filter-group-product {
  flex: 2 2 0%;
  width: 100%;
}
@media (min-width: 768px) {
  .filter-group-time, .filter-group-product {
    width: auto;
  }
}

.filter-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-medium);
  margin-bottom: 0.5rem;
}
html.dark .filter-label {
  color: var(--text-light-gray);
}

.filter-select {
  width: 100%;
  background-color: #f9fafb; 
  border: 1px solid var(--border-light);
  color: #111827; 
  font-size: 0.875rem;
  border-radius: 0.5rem;
  padding: 0.625rem;
  display: block;
  appearance: none; 
  outline: none;
  transition: border-color 200ms, box-shadow 200ms;
}
.filter-select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 1px var(--primary);
}
html.dark .filter-select {
  background-color: var(--border-dark); 
  border-color: #374151; 
  color: white;
}

.apply-button {
  width: 100%;
  background-color: var(--primary);
  color: white;
  font-weight: 500;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  padding: 0.625rem 1.25rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 200ms;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -4px rgba(59, 130, 246, 0.3); 
}

.apply-button:hover {
  background-color: var(--primary-hover);
}

@media (min-width: 768px) {
  .apply-button {
    width: auto;
  }
}
.apply-button-icon {
  font-size: 1.125rem;
  margin-right: 0.5rem;
}

/* Stat Cards */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}
@media (min-width: 768px) {
  .stat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (min-width: 1280px) { 
  .stat-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.stat-card {
  background-color: var(--surface-light);
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-light);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
html.dark .stat-card {
  background-color: var(--surface-dark);
  border-color: var(--border-dark);
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-medium);
  margin-bottom: 0.25rem;
}
html.dark .stat-label {
  color: var(--text-light-gray);
}

.stat-value {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}
html.dark .stat-value {
  color: white;
}

.stat-trend {
  display: flex;
  align-items: center;
  color: var(--accent-success);
  font-size: 0.875rem;
  font-weight: 500;
}

.stat-trend-icon {
  font-size: 1.125rem;
  margin-right: 0.25rem;
}

/* Stock Card */
.stock-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}
html.dark .stock-title {
  color: white;
}

.stock-item-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stock-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.stock-name {
  color: #4b5563;
}
html.dark .stock-name {
  color: #d1d5db;
}

.stock-units {
  font-weight: 500;
  color: #111827;
}
html.dark .stock-units {
  color: white;
}

.progress-bar-bg {
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 9999px;
  height: 0.375rem;
}
html.dark .progress-bar-bg {
  background-color: #374151;
}

.progress-bar-fill {
  height: 0.375rem;
  border-radius: 9999px;
}
/* Clases de color para las barras de progreso */
.fill-primary {
  background-color: var(--primary);
}
.fill-success {
  background-color: var(--accent-success);
}
.fill-orange {
  background-color: var(--orange-500);
}
.fill-red {
  background-color: var(--red-500);
}

/* Sales Chart */
.chart-panel {
  background-color: var(--surface-light);
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-light);
  margin-bottom: 2rem;
}
html.dark .chart-panel {
  background-color: var(--surface-dark);
  border-color: var(--border-dark);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.chart-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}
html.dark .chart-title {
  color: white;
}

.chart-period-buttons {
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  padding: 0.25rem;
  display: flex;
  font-size: 0.75rem;
  font-weight: 500;
}
html.dark .chart-period-buttons {
  background-color: var(--border-dark);
}

.period-button {
  padding: 0.25rem 0.75rem;
  color: var(--text-medium);
  background: none;
  border: none;
  cursor: pointer;
  transition: all 200ms;
  border-radius: 0.375rem;
}
html.dark .period-button {
  color: var(--text-light-gray);
}

.period-button:hover {
  color: #111827;
}
html.dark .period-button:hover {
  color: white;
}

.period-button-active {
  background-color: var(--primary);
  color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.period-button-active:hover {
  color: white; 
}

/* Bar Chart Area */
.bar-chart-area {
  height: 16rem; 
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

.bar-wrapper {
  flex: 1 1 0%;
  border-top-left-radius: 0.125rem;
  border-top-right-radius: 0.125rem;
  position: relative;
  cursor: default;
}

/* Estilos de las barras */
.bar-chart-area > .bar-wrapper:nth-child(1) {
  background-color: rgba(29, 78, 216, 0.2); 
}
html.dark .bar-chart-area > .bar-wrapper:nth-child(1) {
  background-color: rgba(29, 78, 216, 0.3); 
}
.bar-chart-area > .bar-wrapper:nth-child(2) {
  background-color: rgba(29, 78, 216, 0.4); 
}
html.dark .bar-chart-area > .bar-wrapper:nth-child(2) {
  background-color: rgba(29, 78, 216, 0.5); 
}
.bar-chart-area > .bar-wrapper:nth-child(3) {
  background-color: rgba(29, 78, 216, 0.6); 
}
html.dark .bar-chart-area > .bar-wrapper:nth-child(3) {
  background-color: rgba(29, 78, 216, 0.7); 
}
.bar-chart-area > .bar-wrapper:nth-child(4) {
  background-color: var(--primary); 
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2), 0 2px 4px -2px rgba(59, 130, 246, 0.2); 
}
.bar-chart-area > .bar-wrapper:nth-child(5) {
  background-color: rgba(29, 78, 216, 0.4); 
}
html.dark .bar-chart-area > .bar-wrapper:nth-child(5) {
  background-color: rgba(29, 78, 216, 0.5); 
}
.bar-chart-area > .bar-wrapper:nth-child(6) {
  background-color: rgba(29, 78, 216, 0.2); 
}
html.dark .bar-chart-area > .bar-wrapper:nth-child(6) {
  background-color: rgba(29, 78, 216, 0.3); 
}
.bar-chart-area > .bar-wrapper:nth-child(7) {
  background-color: rgba(29, 78, 216, 0.2); 
}
html.dark .bar-chart-area > .bar-wrapper:nth-child(7) {
  background-color: rgba(29, 78, 216, 0.3); 
}
.bar-chart-area > .bar-wrapper:nth-child(8) {
  background-color: rgba(29, 78, 216, 0.2); 
}
html.dark .bar-chart-area > .bar-wrapper:nth-child(8) {
  background-color: rgba(29, 78, 216, 0.3); 
}

/* Tooltip */
.bar-tooltip {
  position: absolute;
  top: -2rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #111827; 
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  opacity: 0;
  transition: opacity 200ms;
  pointer-events: none; 
}

.bar-wrapper:hover .bar-tooltip {
  opacity: 1;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-medium);
}
html.dark .chart-labels {
  color: var(--text-light-gray);
}

/* Table (Best Sellers) */
.table-panel {
  background-color: var(--surface-light);
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-light);
  overflow: hidden;
}
html.dark .table-panel {
  background-color: var(--surface-dark);
  border-color: var(--border-dark);
}

.table-header-content {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-light);
}
html.dark .table-header-content {
  border-color: var(--border-dark);
}

.table-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}
html.dark .table-title {
  color: white;
}

.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  font-size: 0.875rem;
  text-align: left;
  border-collapse: collapse;
}

.table-head {
  font-size: 0.75rem;
  color: var(--text-medium);
  text-transform: uppercase;
  background-color: #f9fafb; 
}
html.dark .table-head {
  color: var(--text-light-gray);
  background-color: rgba(29, 36, 49, 0.5); 
}

.table-head th {
  padding: 1rem 1.5rem;
  font-weight: 500;
}
.table-head .text-center {
  text-align: center;
}
.table-head .text-right {
  text-align: right;
}

.table-body {
  border-top: 1px solid var(--border-light);
}
html.dark .table-body {
  border-color: var(--border-dark);
}

.table-row {
  background-color: var(--surface-light);
  transition: background-color 200ms;
}
html.dark .table-row {
  background-color: var(--surface-dark);
}

.table-row:hover {
  background-color: #f9fafb;
}
html.dark .table-row:hover {
  background-color: rgba(29, 36, 49, 0.5);
}

.table-row td {
  padding: 1rem 1.5rem;
}

.cell-product {
  font-weight: 500;
  color: #111827;
  white-space: nowrap;
}
html.dark .cell-product {
  color: white;
}

.cell-center {
  text-align: center;
  color: #4b5563;
}
html.dark .cell-center {
  color: #d1d5db;
}

.cell-right {
  text-align: right;
  font-weight: 500;
  color: #111827;
}
html.dark .cell-right {
  color: white;
}

/* Footer */
.main-footer {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-medium);
  padding-bottom: 1rem;
}
html.dark .main-footer {
  color: var(--text-light-gray);
}
</style>