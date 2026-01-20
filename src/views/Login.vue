<template>
  <div class="login-page">
    <div class="login-card">
      <!-- Header -->
      <div class="login-header">
        <div class="logo-group">
          <div class="logo-spinner"></div>
          <h2>GameStore</h2>
        </div>
        <p>Registro de usuario</p>
      </div>

      <!-- Form -->
      <form class="login-form" @submit.prevent="registrarUsuario">
        <div class="form-group">
          <label>Nombre</label>
          <input v-model="usuario.nombre" type="text" required />
        </div>

        <div class="form-group">
          <label>Apellido</label>
          <input v-model="usuario.apellido" type="text" required />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input v-model="usuario.email" type="email" required />
        </div>

        <div class="form-group">
          <label>Teléfono (opcional)</label>
          <input v-model="usuario.telefono" type="text" />
        </div>

        <div class="form-group">
          <label>Contraseña</label>
          <input v-model="usuario.contrasena" type="password" required />
        </div>

        <button class="login-button" :disabled="loading">
          {{ loading ? 'Registrando...' : 'Registrar Usuario' }}
        </button>

        <p v-if="mensaje" :class="['error-text', { success: !esError }]">
          {{ mensaje }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const API_USUARIOS = 'http://localhost:3000/api/usuarios'

const loading = ref(false)
const mensaje = ref('')
const esError = ref(false)

const usuario = ref({
  id_rol: 1,
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  contrasena: '',
})

const registrarUsuario = async () => {
  mensaje.value = ''
  esError.value = false
  loading.value = true

  const dataToSend = {
    id_rol: usuario.value.id_rol,
    nombre: usuario.value.nombre,
    apellido: usuario.value.apellido,
    email: usuario.value.email,
    //telefono: usuario.value.telefono || null,
    contrasena_hash: usuario.value.contrasena, // backend debe hashear
  }

  try {
    const response = await fetch(API_USUARIOS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    })

    const data = await response.json()

    if (response.ok) {
      mensaje.value = 'Usuario registrado correctamente'
      usuario.value = {
        id_rol: 1,
        nombre: '',
        apellido: '',
        email: '',
        //telefono: '',
        contrasena: '',
      }
    } else {
      esError.value = true
      mensaje.value = data.error || 'Error al registrar usuario'
    }
  } catch {
    esError.value = true
    mensaje.value = 'Error de red o servidor no disponible'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* ===== Fondo ===== */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f172a, #1e3a8a, #2563eb);
  background-size: 400% 400%;
  animation: gradientMove 10s ease infinite;
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* ===== Card ===== */
.login-card {
  width: 100%;
  max-width: 460px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(18px);
  border-radius: 1.25rem;
  padding: 2.5rem;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

/* ===== Header ===== */
.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
}

.logo-spinner {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  border: 4px solid #60a5fa;
  border-top-color: transparent;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.login-header h2 {
  font-size: 1.6rem;
  font-weight: 800;
  color: #e0f2fe;
}

.login-header p {
  margin-top: 0.4rem;
  color: #bfdbfe;
}

/* ===== Form ===== */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.form-group label {
  font-size: 0.85rem;
  color: #dbeafe;
}

.form-group input {
  padding: 0.75rem 1rem;
  border-radius: 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

.form-group input::placeholder {
  color: #c7d2fe;
}

.form-group input:focus {
  outline: none;
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.35);
}

/* ===== Botón ===== */
.login-button {
  margin-top: 1rem;
  padding: 0.8rem;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  border-radius: 0.7rem;
  font-weight: 700;
  cursor: pointer;
}

.login-button:disabled {
  opacity: 0.6;
}

/* ===== Mensajes ===== */
.error-text {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  text-align: center;
  color: #fecaca;
}

.success {
  color: #86efac;
}
</style>
