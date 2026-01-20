<template>
  <div class="crud-container">
    <h2>Panel Simplificado de Producto</h2>
    <p class="api-info">
      Endpoints: <code>/api/productos</code> | Servidor: http://localhost:3000
    </p>

    <div class="section add-section">
      <h3>1. Crear Producto Nuevo (ADD / POST)</h3>
      <p>Inserta un producto. El ID se genera automáticamente.</p>

      <form @submit.prevent="crearProducto">
        <label for="tipo_id">ID Tipo Producto *</label>
        <input
          id="tipo_id"
          v-model.number="nuevoProducto.id_tipo_producto"
          type="number"
          placeholder="Ej: 1"
          required
          min="1"
        />

        <label for="titulo">Título del Producto *</label>
        <input
          id="titulo"
          v-model.trim="nuevoProducto.titulo"
          type="text"
          placeholder="Ej: Nuevo juego de prueba"
          required
        />

        <label for="fabricante_id">ID Fabricante (Opcional)</label>
        <input
          id="fabricante_id"
          v-model.number="nuevoProducto.id_fabricante"
          type="number"
          placeholder="Ej: 5 (Dejar vacío si no aplica)"
        />

        <button type="submit" class="button-add">
          <span class="material-icons-outlined">save</span>
          Ejecutar ADD (POST)
        </button>
      </form>
    </div>

    <div class="section delete-section">
      <h3>2. Eliminar Producto por ID (DELETE)</h3>
      <p>Necesitas el ID exacto de un producto existente.</p>

      <form @submit.prevent="eliminarProducto">
        <label for="delete_id">ID del Producto a Eliminar *</label>
        <input
          id="delete_id"
          v-model.number="idProductoAEliminar"
          type="number"
          placeholder="ID numérico (Ej: 44)"
          required
          min="1"
        />

        <button type="submit" class="button-delete">
          <span class="material-icons-outlined">delete_forever</span>
          Ejecutar DELETE
        </button>
      </form>
    </div>

    <div v-if="mensaje" :class="['message', { success: !esError, error: esError }]">
      {{ mensaje }}
    </div>

    <p class="nota">
      Revisa la Consola (F12) para ver los IDs generados y detalles del proceso.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const API_BASE_PRODUCTOS = 'http://localhost:3000/api/productos'
const mensaje = ref('')
const esError = ref(false)

const nuevoProducto = ref({
  id_tipo_producto: 1,
  titulo: '',
  id_fabricante: null,
})

const idProductoAEliminar = ref(null)

const mostrarMensaje = (msg, error = false) => {
  esError.value = error
  mensaje.value = msg
  setTimeout(() => {
    mensaje.value = ''
  }, 6000)
}

async function crearProducto() {
  const dataToSend = { ...nuevoProducto.value }
  if (!dataToSend.id_fabricante || dataToSend.id_fabricante === 0) {
    delete dataToSend.id_fabricante
  }

  try {
    const response = await fetch(API_BASE_PRODUCTOS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    })

    const data = await response.json()

    if (response.ok) {
      mostrarMensaje(`Producto creado! ID asignado por DB: ${data.id_producto}.`)
      nuevoProducto.value.titulo = ''
      nuevoProducto.value.id_fabricante = null
    } else {
      mostrarMensaje(`Error ${response.status}: ${data.error}`, true)
    }
  } catch {
    mostrarMensaje('Fallo de red o servidor no responde.', true)
  }
}

async function eliminarProducto() {
  const id = idProductoAEliminar.value

  if (!id || id <= 0) {
    mostrarMensaje('Introduce un ID numérico válido.', true)
    return
  }

  if (!confirm(`Confirmar eliminación del Producto con ID ${id}?`)) return

  try {
    const response = await fetch(`${API_BASE_PRODUCTOS}/${id}`, {
      method: 'DELETE',
    })

    if (response.status === 204) {
      mostrarMensaje(`Producto ID ${id} eliminado exitosamente.`)
      idProductoAEliminar.value = null
    } else if (response.status === 404) {
      mostrarMensaje(`Producto ID ${id} no existe.`, true)
    } else {
      mostrarMensaje('Error al eliminar el producto.', true)
    }
  } catch {
    mostrarMensaje('Fallo de red al eliminar.', true)
  }
}
</script>

<style scoped>
.crud-container {
  max-width: 560px;
  margin: 2rem auto;
  padding: 2.5rem;
  background: #020617;
  border-radius: 18px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.65);
  color: #e5e7eb;
  font-family: system-ui, sans-serif;
}

h2 {
  text-align: center;
  color: #38bdf8;
}

.api-info {
  text-align: center;
  color: #9ca3af;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.api-info code {
  background: #020617;
  color: #38bdf8;
  padding: 0.2rem 0.4rem;
  border-radius: 6px;
}

.section {
  background: #020617;
  padding: 1.6rem;
  border-radius: 14px;
  margin-bottom: 2rem;
  box-shadow: inset 0 0 0 1px #1e293b;
}

h3 {
  color: #22c55e;
  border-bottom: 1px solid #1e293b;
  padding-bottom: 0.4rem;
}

label {
  color: #cbd5f5;
  font-weight: 600;
}

input {
  background: #020617;
  border: 1px solid #1e293b;
  border-radius: 10px;
  padding: 0.7rem 1rem;
  color: #e5e7eb;
}

input:focus {
  outline: none;
  border-color: #38bdf8;
  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);
}

button {
  margin-top: 1rem;
  padding: 0.9rem;
  border-radius: 12px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

button:hover {
  transform: translateY(-1px);
}

.button-add {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #020617;
}

.button-delete {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: #020617;
}

.message {
  padding: 1rem;
  border-radius: 12px;
  font-weight: 600;
  text-align: center;
}

.success {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.error {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.nota {
  text-align: center;
  color: #9ca3af;
  font-size: 0.85rem;
  margin-top: 2rem;
}
</style>
