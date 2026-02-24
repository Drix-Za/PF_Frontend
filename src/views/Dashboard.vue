<template>
  <div class="dashboard">
    <!-- Header -->
    <header class="dashboard-header">
      <h1>Dashboard</h1>
      <p>Información en tiempo real del sistema</p>
    </header>

    <!-- Cargando -->
    <div v-if="loading" class="loading">
      Cargando datos...
    </div>

    <!-- Error -->
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <!-- Estadísticas -->
    <section v-if="!loading && !error" class="stats">
      <div class="stat-card">
        <h3>Usuarios</h3>
        <span>{{ usuarios.length }}</span>
      </div>

      <div class="stat-card">
        <h3>Productos</h3>
        <span>{{ productos.length }}</span>
      </div>

      <div class="stat-card">
        <h3>Pedidos</h3>
        <span>{{ pedidos.length }}</span>
      </div>

      <div class="stat-card highlight">
        <h3>Total vendido</h3>
        <span>${{ totalVentas.toFixed(2) }}</span>
      </div>
    </section>

    <!-- Pedidos recientes -->
    <section v-if="!loading && !error" class="table-section">
      <h2>Pedidos recientes</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Total</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pedido in pedidosRecientes" :key="pedido.id">
            <td>#{{ pedido.id }}</td>
            <td>{{ pedido.usuario || '—' }}</td>
            <td>${{ pedido.total }}</td>
            <td>{{ formatDate(pedido.fecha) }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const usuarios = ref([])
const productos = ref([])
const pedidos = ref([])

const loading = ref(true)
const error = ref(null)

// URLs API
const API_USUARIOS = 'http://localhost:3000/api/usuarios'
const API_PRODUCTOS = 'http://localhost:3000/api/productos'
const API_PEDIDOS = 'http://localhost:3000/api/pedidos'

const fetchData = async () => {
  try {
    loading.value = true
    error.value = null

    // Se recupera el token del almacenamiento local
    const token = localStorage.getItem('token')

    // Se preparan los headers
    const authHeaders = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }

    // Realizamos las peticiones pasando el objeto de configuración
    const [uRes, pRes, peRes] = await Promise.all([
      fetch(API_USUARIOS, { headers: authHeaders }),
      fetch(API_PRODUCTOS, { headers: authHeaders }),
      fetch(API_PEDIDOS, { headers: authHeaders })
    ])

    // Manejo de errores de autorización específicos
    if (uRes.status === 401) throw new Error('Sesión expirada. Por favor, inicia sesión de nuevo.')
    if (uRes.status === 403) throw new Error('No tienes permisos para ver esta sección.')

    if (!uRes.ok || !pRes.ok || !peRes.ok) {
      throw new Error('Error al obtener datos del servidor')
    }

    usuarios.value = await uRes.json()
    productos.value = await pRes.json()
    pedidos.value = await peRes.json()
  } catch (err) {
    error.value = err.message
    console.error("Error en fetchData:", err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)

// Total vendido (asume pedido.total. En proceso)
const totalVentas = computed(() =>
  pedidos.value.reduce((acc, p) => acc + Number(p.total || 0), 0)
)

// Últimos 5 pedidos
const pedidosRecientes = computed(() =>
  [...pedidos.value]
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, 5)
)

// Formato fecha
const formatDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString()
}
</script>

<style scoped>
.dashboard {
  padding: 2rem;
  background: #0f172a;
  min-height: 100vh;
  color: #e5e7eb;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 2rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  background: #020617;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
}

.stat-card span {
  font-size: 2rem;
  font-weight: bold;
}

.stat-card.highlight {
  background: linear-gradient(135deg, #4f46e5, #9333ea);
}

.table-section h2 {
  margin-bottom: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: #020617;
  border-radius: 12px;
  overflow: hidden;
}

th, td {
  padding: 1rem;
  text-align: left;
}

th {
  background: #020617;
  color: #a5b4fc;
}

tr:not(:last-child) {
  border-bottom: 1px solid #1e293b;
}

.loading,
.error {
  margin-top: 2rem;
  font-size: 1.1rem;
}
</style>
