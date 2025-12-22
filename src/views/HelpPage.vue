<template>
  <div class="flex min-h-screen bg-gray-50">
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <TheHeader />

      <main class="flex-1 p-4 md:p-8 overflow-y-auto">
        <div class="max-w-5xl mx-auto">
          
          <div class="text-center mb-12">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Como podemos ajudar você?
            </h1>
            <p class="text-gray-500 mb-8">Busque por tópicos ou navegue pelas categorias abaixo.</p>
            
            <div class="max-w-xl mx-auto relative">
              <span class="absolute left-4 top-3.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Ex: Como configurar o Pomodoro..." 
                class="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none text-gray-700 transition-all"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div class="lg:col-span-2 space-y-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
                Perguntas Frequentes
              </h2>

              <div class="space-y-4">
                <div 
                  v-for="(item, index) in faqs" 
                  :key="index"
                  class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button 
                    @click="toggleFaq(index)"
                    class="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors focus:outline-none"
                  >
                    <span class="font-medium text-gray-700">{{ item.question }}</span>
                    <span 
                      class="text-gray-400 transition-transform duration-300"
                      :class="{'rotate-180': item.open}"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a 1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </span>
                  </button>
                  
                  <div 
                    v-show="item.open" 
                    class="px-5 pb-5 text-gray-600 text-sm leading-relaxed bg-gray-50 border-t border-gray-100 pt-4"
                  >
                    {{ item.answer }}
                  </div>
                </div>
              </div>
            </div>

            <!--feature futura
            <div class="space-y-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4">Ainda precisa de ajuda?</h2>
              
              <div class="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div class="absolute -right-6 -top-6 bg-white/10 w-32 h-32 rounded-full blur-2xl"></div>
                
                <h3 class="text-lg font-bold mb-2">Chat em Tempo Real</h3>
                <p class="text-indigo-100 text-sm mb-6">Nossa equipe está disponível das 9h às 18h.</p>
                <button class="w-full bg-white text-indigo-700 font-semibold py-2 rounded-lg hover:bg-indigo-50 transition-colors">
                  Iniciar Chat
                </button>
              </div>
            </div>
            -->

            <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 class="font-bold text-gray-800 mb-4">Envie uma mensagem</h3>
              <form @submit.prevent="sendMessage" class="space-y-4">
                <div>
                  <label class="text-xs font-semibold text-gray-500 uppercase">Assunto</label>
                  <select class="w-full mt-1 p-2 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:border-indigo-500">
                    <option>Problema Técnico</option>
                    <option>Sugestão</option>``
                  </select>
                </div>
                <div>
                  <label class="text-xs font-semibold text-gray-500 uppercase">Mensagem</label>
                  <textarea 
                    v-model="contactMsg"
                    rows="4" 
                    class="w-full mt-1 p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:border-indigo-500 resize-none"
                    placeholder="Descreva seu problema..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  class="w-full bg-gray-800 text-white font-medium py-2 rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Enviar Email
                </button>
              </form>
            </div>

          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from "../components/layout/Sidebar.vue";
import TheHeader from "../components/layout/TheHeader.vue";

const contactMsg = ref('');

const faqs = ref([
  {
    question: 'Como funciona o método Pomodoro?',
    answer: 'O método Pomodoro consiste em trabalhar focado por 25 minutos e descansar por 5 minutos. Após 4 ciclos, você faz uma pausa maior de 15 a 30 minutos. Nosso app automatiza esses timers para você.',
    open: true
  },
  {
    question: 'Posso sincronizar com o Google Calendar?',
    answer: 'Atualmente a sincronização com o Google Calendar está em fase beta. Vá em Configurações > Integrações para solicitar acesso antecipado.',
    open: false
  },
  {
    question: 'Como resetar minhas estatísticas?',
    answer: 'Você pode limpar seus dados indo na página de Configurações e rolando até a "Zona de Perigo". Cuidado, essa ação é irreversível.',
    open: false
  },
  {
    question: 'O aplicativo funciona offline?',
    answer: 'Sim! Seus dados são salvos localmente no navegador e sincronizados com a nuvem assim que você recuperar a conexão.',
    open: false
  }
]);

const toggleFaq = (index) => {
  faqs.value[index].open = !faqs.value[index].open;
};

const sendMessage = () => {
  if (!contactMsg.value) return alert('Por favor escreva uma mensagem.');
  alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
  contactMsg.value = '';
};
</script>

<style scoped>
main {
  transition: all 0.3s ease;
}
</style>
