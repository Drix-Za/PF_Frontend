<template>
  <div class="edit-profile-page">
    <div class="profile-card">
      <h2 class="title">Configuración de Perfil</h2>
      
      <div class="avatar-upload-section">
        <div class="avatar-container">
          <img :src="previewUrl || avatarUrl" class="avatar-large" />
          <label class="upload-badge">
            <span class="material-icons-outlined">photo_camera</span>
            <input type="file" @change="handleFile" hidden accept="image/*" />
          </label>
        </div>
      </div>

      <div class="form-grid">
        <div class="input-group">
          <label>Nombre</label>
          <input v-model="userForm.nombre" type="text" placeholder="Escribe el nombre" />
        </div>
        <div class="input-group">
          <label>Apellido</label>
          <input v-model="userForm.apellido" type="text" placeholder="Escribe el apellido" />
        </div>
        <div class="input-group full-width">
          <label>Teléfono</label>
          <input v-model="userForm.telefono" type="text" placeholder="+1 809-XXX-XXXX" />
        </div>
      </div>

      <div class="actions">
        <button @click="$router.push('/')" class="btn-cancel">Cancelar</button>
        <button @click="saveChanges" class="btn-save" :disabled="loading">
          {{ loading ? 'Guardando...' : 'Guardar Cambios' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const userForm = ref({
  nombre: '',
  apellido: '',
  telefono: '',
  avatar_url: ''
});

const selectedFile = ref(null);
const previewUrl = ref(null);
const loading = ref(false);

// Se cargan los datos ya almacenados
onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const parsed = JSON.parse(storedUser);
    userForm.value = {
      nombre: parsed.nombre || '',
      apellido: parsed.apellido || '',
      telefono: parsed.telefono || '',
      avatar_url: parsed.avatar_url || ''
    };
  }
});

const avatarUrl = computed(() => {
  return userForm.value.avatar_url 
    ? `http://localhost:3000${userForm.value.avatar_url}`
    : `https://ui-avatars.com/api/?name=${userForm.value.nombre}+${userForm.value.apellido}&background=random`;
});

const handleFile = (e) => {
  const file = e.target.files[0];
  if (file) {
    selectedFile.value = file;
    previewUrl.value = URL.createObjectURL(file);
  }
};

const saveChanges = async () => {
  loading.value = true;
  
  // Se usa formdata para que multer reciba nombre, apellido y telefono

  const formData = new FormData();
  formData.append('nombre', userForm.value.nombre);
  formData.append('apellido', userForm.value.apellido);
  formData.append('telefono', userForm.value.telefono);
  
  // Solo se envia el avatar si el usuario seleccionó uno nuevo
  if (selectedFile.value) {
    formData.append('avatar', selectedFile.value);
  }

  try {
    const token = localStorage.getItem('token');
    
    // Petición a la ruta del server.js
    const response = await axios.put('http://localhost:3000/api/perfil', formData, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data' // Necesario para enviar archivos y campos mezclados
      }
    });

    // Se guarda la nueva información en el localStorage
    localStorage.setItem('user', JSON.stringify(response.data));
    
    alert("¡Perfil actualizado con éxito!");
    
    // Opcional en proceso: Volver al inicio o recargar para ver cambios
    window.location.href = '/'; 
    
  } catch (err) {
    console.error("Error al actualizar perfil:", err.response?.data || err.message);
    alert("Hubo un error al guardar los cambios.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Los estilos se mantienen iguales para conservar tu estética NeoGaming */
.edit-profile-page { padding: 4rem 2rem; display: flex; justify-content: center; background: #050814; min-height: 100vh; }
.profile-card { background: #0b1021; padding: 2rem; border-radius: 1rem; width: 100%; max-width: 500px; border: 1px solid rgba(255,255,255,0.05); }
.title { text-align: center; margin-bottom: 2rem; color: white; }
.avatar-upload-section { display: flex; justify-content: center; margin-bottom: 2rem; }
.avatar-container { position: relative; width: 120px; height: 120px; }
.avatar-large { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 3px solid #2563eb; }
.upload-badge { position: absolute; bottom: 0; right: 0; background: #2563eb; color: white; padding: 8px; border-radius: 50%; cursor: pointer; display: flex; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.full-width { grid-column: span 2; }
.input-group label { display: block; color: #9ca3af; font-size: 0.8rem; margin-bottom: 5px; }
.input-group input { width: 100%; padding: 0.75rem; background: #151b33; border: 1px solid #2d3748; color: white; border-radius: 0.5rem; outline: none; }
.input-group input:focus { border-color: #2563eb; }
.actions { margin-top: 2rem; display: flex; gap: 1rem; }
.btn-save { flex: 1; padding: 0.75rem; background: #2563eb; color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: bold; }
.btn-save:hover { background: #1d4ed8; }
.btn-cancel { flex: 1; padding: 0.75rem; background: transparent; color: #9ca3af; border: 1px solid #2d3748; border-radius: 0.5rem; cursor: pointer; }
</style>