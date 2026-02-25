<template>
  <div class="flex min-h-screen bg-gray-50">
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <TheHeader />

      <main class="flex-1 p-4 md:p-8 overflow-y-auto">
        <div class="max-w-4xl mx-auto">
          
          <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-gray-800">Configurações</h1>
            <div class="flex gap-3">
              <button 
                v-if="!editMode"
                @click="enableEditMode"
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-sm flex items-center gap-2"
              >
                Editar
              </button>
              <template v-else>
                <button 
                  @click="cancelEdit"
                  class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-all shadow-sm"
                >
                  Cancelar
                </button>
                <button 
                  @click="saveSettings"
                  :disabled="!canSave"
                  class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="saving">Salvando...</span>
                  <span v-else>Salvar Alterações</span>
                </button>
              </template>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 class="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Meu Perfil</h2>
            
            <div class="flex flex-col md:flex-row gap-8 items-start">
              
              <!--
              <div class="flex flex-col items-center gap-3">
                <div class="relative group" :class="editMode ? 'cursor-pointer' : 'cursor-default'">
                  <img 
                    :src="userAvatar"
                    alt="Avatar" 
                    class="w-24 h-24 rounded-full bg-gray-100 border-4 border-white shadow-md"
                  >
                  <div 
                    v-if="editMode"
                    class="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span class="text-white text-xs font-medium">Alterar</span>
                  </div>
                </div>
              </div>
              -->

              <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div class="space-y-1">
                  <label class="text-sm font-medium text-gray-700">Nome</label>
                  <input 
                    v-model="form.nome" 
                    type="text" 
                    class="input-field" 
                    :disabled="!editMode" 
                  />
                </div>
                
                <div class="space-y-1">
                  <label class="text-sm font-medium text-gray-700">Sobrenome</label>
                  <input 
                    v-model="form.sobrenome" 
                    type="text" 
                    class="input-field" 
                    :disabled="!editMode" 
                  />
                </div>

                <div class="space-y-1">
                  <label class="text-sm font-medium text-gray-700">Email</label>
                  <input 
                    v-model="form.email" 
                    type="email" 
                    class="input-field" 
                    :disabled="!editMode" 
                  />
                </div>

                <div v-if="editMode && emailChanged" class="space-y-1">
                  <label class="text-sm font-medium text-gray-700">Confirmar Novo Email</label>
                  <input 
                    v-model="form.emailConfirmation" 
                    type="email" 
                    class="input-field" 
                    placeholder="Digite o email novamente"
                  />
                </div>

                <div v-if="editMode && emailChanged" class="space-y-1 md:col-span-2">
                  <label class="text-sm font-medium text-gray-700">Senha Atual (para confirmar a alteração)</label>
                  <input 
                    v-model="form.senhaAtual" 
                    type="password" 
                    class="input-field" 
                    placeholder="Digite sua senha para confirmar"
                  />
                </div>
              </div>
            </div>
          </div>

          <!--
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 class="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Notificações</h2>
              <div class="space-y-3">
                <label 
                  class="flex items-center gap-3 p-2 rounded-lg transition-colors"
                  :class="editMode ? 'cursor-pointer hover:bg-gray-50' : 'cursor-default'"
                >
                  <input 
                    v-model="form.notifications.tasks" 
                    type="checkbox" 
                    class="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                    :disabled="!editMode"
                  >
                  <span class="text-gray-600">Alertas de tarefas atrasadas</span>
                </label>
                <label 
                  class="flex items-center gap-3 p-2 rounded-lg transition-colors"
                  :class="editMode ? 'cursor-pointer hover:bg-gray-50' : 'cursor-default'"
                >
                  <input 
                    v-model="form.notifications.pomodoro" 
                    type="checkbox" 
                    class="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                    :disabled="!editMode"
                  >
                  <span class="text-gray-600">Sons do Pomodoro</span>
                </label>
              </div>
            </div>
          </div>
          -->

          <div class="bg-red-50 rounded-2xl border border-red-100 p-6">
            <h2 class="text-lg font-semibold text-red-700 mb-2">Área de Risco</h2>
            <div class="flex items-center justify-between">
              <p class="text-sm text-red-600">Deseja excluir sua conta permanentemente? Esta ação não pode ser desfeita.</p>
              <button class="text-red-600 hover:text-red-800 text-sm font-semibold underline decoration-2 underline-offset-2">
                Excluir Conta
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useAuthStore } from '@/store/auth.store';
import userService from '@/services/user.service';
import Sidebar from "../components/layout/Sidebar.vue";
import TheHeader from "../components/layout/TheHeader.vue";

const authStore = useAuthStore();
const saving = ref(false);
const editMode = ref(false);

const form = reactive({
  nome: '',
  sobrenome: '',
  email: '',
  emailConfirmation: '',
  senhaAtual: ''
  /*
  notifications: {
    tasks: true,
    pomodoro: false
  }
  */
});

const originalData = ref({});

/*
const userAvatar = computed(() => {
  return authStore.usuario?.urlFotoPerfil || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + authStore.usuario?.email
})
*/

const emailChanged = computed(() => {
  return form.email !== originalData.value.email && form.email.trim() !== '';
})

const emailMismatch = computed(() => {
  return emailChanged.value && 
         form.emailConfirmation && 
         form.email !== form.emailConfirmation;
})

const canSave = computed(() => {
  if (!emailChanged.value) return true;
  return form.emailConfirmation && 
         !emailMismatch.value && 
         form.senhaAtual.trim() !== '';
})

onMounted(() => {
  loadUserData();
})

const loadUserData = () => {
  if (authStore.usuario) {
    form.nome = authStore.usuario.nome || ''
    form.sobrenome = authStore.usuario.sobrenome || ''
    form.email = authStore.usuario.email || ''

    originalData.value = {
      nome: form.nome,
      sobrenome: form.sobrenome,
      email: form.email
    }
  }
}

const enableEditMode = () => {
  editMode.value = true;
}

const cancelEdit = () => {
  form.nome = originalData.value.nome;
  form.sobrenome = originalData.value.sobrenome;
  form.email = originalData.value.email;
  form.emailConfirmation = '';
  form.senhaAtual = '';
  editMode.value = false;
}

const saveSettings = async () => {
  if (!canSave.value) {
    alert('Por favor, preencha todos os campos obrigatórios');
    return;
  }

  saving.value = true;
  
  try {
    let emailAlterado = false;

    if (form.nome !== originalData.value.nome || form.sobrenome !== originalData.value.sobrenome) {
      const profileResponse = await userService.updateProfile({
        nome: form.nome,
        sobrenome: form.sobrenome
      });

      authStore.updateUser(profileResponse.data.data.usuario);
    }

    if (emailChanged.value) {
      const emailResponse = await userService.updateEmail({
        novoEmail: form.email,
        senhaAtual: form.senhaAtual
      });

      authStore.updateUser(emailResponse.data.data.usuario);
      emailAlterado = true;
    }

    originalData.value = {
      nome: form.nome,
      sobrenome: form.sobrenome,
      email: form.email
    }
    
    form.emailConfirmation = '';
    form.senhaAtual = '';
    
    saving.value = false;
    editMode.value = false;
    
    if (emailAlterado) {
      alert('Email atualizado com sucesso!');
    } else {
      alert('Configurações salvas com sucesso!');
    }
  } catch (error) {
    saving.value = false;
    const errorMessage = error.response?.data?.error || 'Erro ao salvar as configurações';
    alert(errorMessage);
  }
};
</script>
<style scoped>
.input-field {
  @apply w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-gray-700;
}

.input-field:disabled {
  @apply bg-gray-100 cursor-not-allowed;
}
</style>