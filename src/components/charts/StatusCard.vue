<template>
  <div class="bg-white rounded-2xl p-6 shadow-md">
    <h3 class="text-md font-semibold mb-4">Tarefas concluídas e pendentes do mês</h3>
    <div v-for="(task, index) in tasks" :key="index" class="mb-4">
      <div class="h-3 bg-blue-600 rounded" :style="{ width: task.done + '%' }"></div>
      <div class="h-3 bg-gray-300 rounded mt-1" :style="{ width: task.total + '%' }"></div>
    </div>
    <p class="text-sm text-gray-500">Categoria: Faculdade</p>
  </div>
</template>

<script setup>
const tasks = [
  { done: 60, total: 80 },
  { done: 50, total: 70 },
  { done: 30, total: 50 },
  { done: 80, total: 90 },
  { done: 100, total: 100 },
];
</script>