<template>
  <div class="flex min-h-screen bg-gray-50">
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <TheHeader />

      <main class="flex-1 p-4 md:p-8 overflow-y-auto">
        <div class="max-w-4xl mx-auto">
          
          <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-gray-800">Configurações</h1>
            <button 
              @click="saveSettings"
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-sm flex items-center gap-2"
            >
              <span v-if="saving">Salvando...</span>
              <span v-else>Salvar Alterações</span>
            </button>
          </div>

          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 class="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Meu Perfil</h2>
            
            <div class="flex flex-col md:flex-row gap-8 items-start">
              <div class="flex flex-col items-center gap-3">
                <div class="relative group cursor-pointer">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Camila" 
                    alt="Avatar" 
                    class="w-24 h-24 rounded-full bg-gray-100 border-4 border-white shadow-md"
                  >
                  <div class="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span class="text-white text-xs font-medium">Alterar</span>
                  </div>
                </div>
              </div>

              <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div class="space-y-1">
                  <label class="text-sm font-medium text-gray-700">Nome Completo</label>
                  <input v-model="form.name" type="text" class="input-field" />
                </div>
                
                <div class="space-y-1">
                  <label class="text-sm font-medium text-gray-700">Email</label>
                  <input v-model="form.email" type="email" class="input-field" />
                </div>

                <div class="space-y-1 md:col-span-2">
                  <label class="text-sm font-medium text-gray-700">Biografia</label>
                  <textarea v-model="form.bio" rows="3" class="input-field resize-none"></textarea>
                  <p class="text-xs text-gray-400 text-right">Breve descrição sobre você.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 class="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Aparência</h2>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Tema Escuro</span>
                  <button 
                    @click="form.darkMode = !form.darkMode"
                    :class="form.darkMode ? 'bg-indigo-600' : 'bg-gray-200'"
                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none"
                  >
                    <span
                      :class="form.darkMode ? 'translate-x-6' : 'translate-x-1'"
                      class="inline-block h-4 w-4 transform rounded-full bg-white transition duration-200"
                    />
                  </button>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Modo Compacto</span>
                  <button 
                    @click="form.compactMode = !form.compactMode"
                    :class="form.compactMode ? 'bg-indigo-600' : 'bg-gray-200'"
                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none"
                  >
                    <span
                      :class="form.compactMode ? 'translate-x-6' : 'translate-x-1'"
                      class="inline-block h-4 w-4 transform rounded-full bg-white transition duration-200"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 class="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Notificações</h2>
              <div class="space-y-3">
                <label class="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <input v-model="form.notifications.email" type="checkbox" class="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300">
                  <span class="text-gray-600">Receber emails semanais</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <input v-model="form.notifications.tasks" type="checkbox" class="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300">
                  <span class="text-gray-600">Alertas de tarefas atrasadas</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <input v-model="form.notifications.pomodoro" type="checkbox" class="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300">
                  <span class="text-gray-600">Sons do Pomodoro</span>
                </label>
              </div>
            </div>
          </div>

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
import { ref, reactive } from 'vue';
import Sidebar from "../components/layout/Sidebar.vue";
import TheHeader from "../components/layout/TheHeader.vue";

const saving = ref(false);

// Estado do formulário
const form = reactive({
  name: 'Camila',
  email: 'camila@focuslist.com',
  bio: 'Product Designer apaixonada por produtividade e café. ☕',
  darkMode: false,
  compactMode: false,
  notifications: {
    email: true,
    tasks: true,
    pomodoro: false
  }
});

// Simulação de salvamento
const saveSettings = () => {
  saving.value = true;
  // Simula uma chamada API
  setTimeout(() => {
    saving.value = false;
    alert('Configurações salvas com sucesso! ✨');
  }, 1000);
};
</script>

<style scoped>
/* Classe utilitária para inputs para manter o código limpo */
.input-field {
  @apply w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-gray-700;
}
</style>