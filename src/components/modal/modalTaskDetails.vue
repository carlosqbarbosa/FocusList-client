<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6">

      <h2 class="text-xl font-semibold mb-4">Detalhes da Tarefa</h2>

      <div class="space-y-3">
        <p><strong>Nome:</strong> {{ task.nome }}</p>
        <p><strong>Data:</strong> {{ task.data }}</p>
        <p><strong>Prioridade:</strong> {{ task.prioridade }}</p>
        <p><strong>Descrição:</strong> {{ task.descricao }}</p>
      </div>

      <div class="text-right mt-6">
        <button 
          @click="$emit('close')" 
          class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
        >
          Fechar
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  task: Object
});

defineEmits(['close']);
</script>
