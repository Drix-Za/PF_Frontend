<template>
  <div class="admin-page">
    <div class="dashboard-container">
      
      <div class="form-card">
        <div class="login-header">
          <div class="logo-group">
            <div class="logo-spinner"></div>
            <h2>NeoGaming</h2>
          </div>
          <p>{{ editMode ? 'Editando Producto' : 'Registro de Producto' }}</p>
        </div>

        <div class="form-section">
          <form class="login-form" @submit.prevent="handleSubmit">
            <div class="input-group">
              <label>ID Tipo Producto *</label>
              <input v-model.number="producto.id_tipo_producto" type="number" required min="1" />
            </div>

            <div class="input-group">
              <label>Título del Producto *</label>
              <input v-model.trim="producto.titulo" type="text" placeholder="Ej: Teclado Mecánico" required />
            </div>

            <div class="input-group">
              <label>ID Fabricante</label>
              <input v-model.number="producto.id_fabricante" type="number" placeholder="" />
            </div>

            <div class="button-group">
              <button class="btn btn-add" type="submit">
                {{ editMode ? 'Actualizar Cambios' : 'Registrar Producto' }}
              </button>
              <button v-if="editMode" @click="cancelarEdicion" class="btn btn-cancel" type="button">
                Cancelar
              </button>
            </div>
          </form>
        </div>

        <transition name="fade">
          <p v-if="mensaje" :class="['feedback', esError ? 'error' : 'success']">
            {{ mensaje }}
          </p>
        </transition>
      </div>

      <div class="table-card">
        <div class="table-header">
          <h3>Inventario de Productos</h3>
          <button @click="obtenerProductos" class="btn-refresh" title="Refrescar datos">
            <span>refresh</span>
          </button>
        </div>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Tipo</th>
                <th>Fab.</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in listaProductos" :key="item.id_producto">
                <td>#{{ item.id_producto }}</td>
                <td class="titulo-cell">{{ item.titulo }}</td>
                <td>{{ item.id_tipo_producto }}</td>
                <td>{{ item.id_fabricante || '-' }}</td>
                <td class="actions">
                  <button @click="prepararEdicion(item)" class="action-btn edit" title="Editar">
                    edit
                  </button>
                  <button @click="eliminarProducto(item.id_producto)" class="action-btn delete" title="Borrar">
                    delete
                  </button>
                </td>
              </tr>
              <tr v-if="listaProductos.length === 0">
                <td colspan="5" class="empty-state">No hay productos registrados.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const API_BASE = 'http://localhost:3000/api/productos'

// Estados
const listaProductos = ref([])
const mensaje = ref('')
const esError = ref(false)
const editMode = ref(false)
const productoActualId = ref(null)

const producto = ref({
  id_tipo_producto: 1,
  titulo: '',
  id_fabricante: null,
})

const mostrarMensaje = (msg, error = false) => {
  esError.value = error
  mensaje.value = msg
  setTimeout(() => { mensaje.value = '' }, 5000)
}

// Obtener productos
async function obtenerProductos() {
  try {
    const response = await fetch(API_BASE)
    const data = await response.json()
    listaProductos.value = Array.isArray(data) ? data : (data.productos || [])
  } catch (err) {
    mostrarMensaje('No se pudo conectar con el servidor', true)
  }
}

// Crear o actualizar
async function handleSubmit() {
  const method = editMode.value ? 'PUT' : 'POST'
  const url = editMode.value ? `${API_BASE}/${productoActualId.value}` : API_BASE
  
  const dataToSend = { ...producto.value }
  if (!dataToSend.id_fabricante) delete dataToSend.id_fabricante

  try {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend)
    })

    if (response.ok) {
      mostrarMensaje(editMode.value ? 'Producto actualizado' : 'Producto registrado')
      cancelarEdicion()
      obtenerProductos()
    } else {
      mostrarMensaje('Error en la operación', true)
    }
  } catch (err) {
    mostrarMensaje('Error de red', true)
  }
}

// Eliminar
async function eliminarProducto(id) {
  if (!confirm(`¿Eliminar producto #${id}?`)) return
  try {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
    if (response.status === 204 || response.ok) {
      mostrarMensaje('Producto eliminado')
      obtenerProductos()
    }
  } catch (err) {
    mostrarMensaje('Error al eliminar', true)
  }
}

// Lógica de edición
function prepararEdicion(item) {
  editMode.value = true
  productoActualId.value = item.id_producto
  producto.value = { 
    id_tipo_producto: item.id_tipo_producto, 
    titulo: item.titulo, 
    id_fabricante: item.id_fabricante 
  }
}

function cancelarEdicion() {
  editMode.value = false
  productoActualId.value = null
  producto.value = { id_tipo_producto: 1, titulo: '', id_fabricante: null }
}

onMounted(obtenerProductos)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Material+Icons+Outlined&display=swap');

.admin-page {
  min-height: 100vh;
  background: radial-gradient(circle at top, #0f172a, #020617);
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.dashboard-container {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 2rem;
  width: 100%;
  max-width: 1100px;
}

/* Tarjetas */
.form-card, .table-card {
  background: rgba(15, 23, 42, 0.9);
  border-radius: 16px;
  border: 1px solid #1e293b;
  padding: 2rem;
  box-shadow: 0 20px 50px rgba(0,0,0,0.4);
}

.login-header { text-align: center; margin-bottom: 2rem; color: #fff}
.logo-group { display: flex; align-items: center; justify-content: center; gap: 10px; color: #fff; }
.logo-spinner { width: 24px; height: 24px; border: 3px solid #22d3ee; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Formularios */
.login-form { display: flex; flex-direction: column; gap: 1rem; }
.input-group label { display: block; font-size: 0.75rem; color: #94a3b8; margin-bottom: 5px; }
.input-group input { width: 100%; padding: 12px; background: #020617; border: 1px solid #1e293b; border-radius: 8px; color: #fff; }
.input-group input:focus { border-color: #22d3ee; outline: none; }

.button-group { display: flex; flex-direction: column; gap: 10px; }
.btn { padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer; border: none; transition: 0.3s; }
.btn-add { background: linear-gradient(135deg, #22d3ee, #3b82f6); color: #020617; }
.btn-cancel { background: #334155; color: #fff; }

/* Tabla Estilizada */
.table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.table-header h3 { color: #38bdf8; font-size: 1.1rem; }

.table-wrapper { overflow-x: auto; max-height: 500px; }
table { width: 100%; border-collapse: collapse; color: #e5e7eb; }
th { text-align: left; background: #020617; padding: 12px; font-size: 0.8rem; color: #94a3b8; text-transform: uppercase; }
td { padding: 12px; border-bottom: 1px solid #1e293b; font-size: 0.9rem; }
.titulo-cell { font-weight: 600; color: #fff; }

/* Botones de acción en tabla */
.action-btn { font-family: 'Material Icons Outlined'; background: none; border: none; cursor: pointer; padding: 5px; margin-right: 5px; transition: 0.2s; }
.edit { color: #38bdf8; }
.delete { color: #f87171; }
.action-btn:hover { transform: scale(1.2); }

.btn-refresh { font-family: 'Material Icons Outlined'; background: none; border: 1px solid #1e293b; color: #94a3b8; cursor: pointer; border-radius: 5px; padding: 5px; }

/* Feedback */
.feedback { margin-top: 1rem; padding: 10px; border-radius: 8px; text-align: center; font-size: 0.85rem; }
.success { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
.error { background: rgba(248, 113, 113, 0.1); color: #f87171; }

@media (max-width: 900px) {
  .dashboard-container { grid-template-columns: 1fr; }
}
</style>