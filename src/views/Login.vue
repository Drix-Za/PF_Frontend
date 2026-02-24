<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <div class="logo-group">
          <div class="logo-spinner"></div>
          <h2>NeoGaming</h2>
        </div>
        <p>Inicia sesión para continuar</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input 
            v-model="credenciales.email" 
            type="email" 
            placeholder="ejemplo@correo.com" 
            required 
          />
        </div>

        <div class="form-group">
          <label>Contraseña</label>
          <input 
            v-model="credenciales.contrasena" 
            type="password" 
            placeholder="••••••••"
            required 
          />
        </div>

        <button class="login-button" :disabled="loading">
          {{ loading ? 'Verificando...' : 'Entrar al Sistema' }}
        </button>

        <p v-if="mensaje" :class="['feedback-text', { 'error-msg': esError, 'success-msg': !esError }]">
          {{ mensaje }}
        </p>

        <div class="footer-links">
          <span>¿No tienes cuenta?</span>
          <RouterLink to="/RegistroUsuario" class="nav-link">Registrarse</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // Importamos el router para redirigir

const router = useRouter()
const loading = ref(false)
const mensaje = ref('')
const esError = ref(false)

const credenciales = ref({
  email: '',
  contrasena: ''
})

const handleLogin = async () => {
  mensaje.value = ''
  esError.value = false
  loading.value = true

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credenciales.value),
    })

    const data = await response.json()

    if (response.ok) {
      esError.value = false
      mensaje.value = '¡Acceso concedido!'
      
      // Guardar el Token
      localStorage.setItem('token', data.token)
      
      // Se intenta obtener 'usuario' o 'user' del server.
      // Si el server no envía nada, creamos un objeto con el email para que no de 'undefined'
      const usuarioParaGuardar = data.usuario || data.user || { 
        nombre: credenciales.value.email.split('@')[0], 
        email: credenciales.value.email 
      }
      
      localStorage.setItem('user', JSON.stringify(usuarioParaGuardar))

      console.log('Sesión guardada:', usuarioParaGuardar)
      
      // Usamos window.location para forzar al Homepage a leer el storage
      setTimeout(() => {
        window.location.href = '/'
      }, 500)

    } else {
      esError.value = true
      mensaje.value = data.error || 'Credenciales incorrectas'
    }
  } catch (error) {
    esError.value = true
    mensaje.value = 'Error de conexión con el servidor'
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Reutilizamos estilos */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f172a, #1e3a8a, #2563eb);
  background-size: 400% 400%;
  animation: gradientMove 10s ease infinite;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  padding: 3rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.logo-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 0.5rem;
}

.logo-spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid #60a5fa;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.login-header h2 { color: #f0f9ff; font-size: 1.8rem; font-weight: 800; }
.login-header p { color: #93c5fd; font-size: 0.9rem; }

.login-form { display: flex; flex-direction: column; gap: 1.5rem; }

.form-group { display: flex; flex-direction: column; gap: 0.5rem; }
.form-group label { font-size: 0.85rem; color: #dbeafe; font-weight: 500; }

.form-group input {
  padding: 0.85rem 1.1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #60a5fa;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.25);
}

.login-button {
  margin-top: 1rem;
  padding: 0.9rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  border-radius: 0.8rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.4);
}

.login-button:disabled { opacity: 0.6; cursor: not-allowed; }

.feedback-text {
  text-align: center;
  font-size: 0.9rem;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.error-msg { color: #fecaca; background: rgba(220, 38, 38, 0.2); }
.success-msg { color: #bbf7d0; background: rgba(22, 163, 74, 0.2); }

.footer-links {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: #93c5fd;
}

.footer-links a {
  color: #f0f9ff;
  text-decoration: none;
  font-weight: 600;
  margin-left: 0.5rem;
}

.footer-links a:hover { text-decoration: underline; }
</style>