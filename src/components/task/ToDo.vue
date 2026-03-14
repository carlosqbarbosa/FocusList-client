<template>
  <div class="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 transition-all duration-300 hover:shadow-xl">
    <div class="flex items-center justify-center gap-2 mb-6">
      <CheckSquare class="w-6 h-6 text-blue-600" />
      <h2 class="text-2xl font-bold text-blue-800">Lista de Tarefas</h2>
    </div>

    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <input
        type="text"
        v-model="newTask"
        @keyup.enter="addTask"
        placeholder="Adicione uma nova tarefa..."
        class="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />

      <button
        @click="addTask"
        class="flex items-center justify-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition-all"
      >
        <Plus class="w-5 h-5" /> Adicionar
      </button>
    </div>

    <transition-group name="fade" tag="div">
      <div
        v-for="(task, index) in tasks"
        :key="task.description + index"
        class="flex items-center justify-between bg-blue-50 text-blue-900 px-4 py-3 rounded-xl mb-3 shadow-sm border border-blue-100 transition-all duration-200 hover:shadow-md"
      >
        <div class="flex items-center gap-3">
          <input
            type="checkbox"
            v-model="task.isDone"
            class="h-5 w-5 accent-blue-600"
          />
          <span
            :class="{ 'line-through text-gray-400': task.isDone }"
            class="font-medium"
          >
            {{ task.description }}
          </span>
        </div>

        <button
          @click="deleteTask(index)"
          class="text-red-500 hover:text-red-700 transition"
          title="Remover tarefa"
        >
          <Trash2 class="w-5 h-5" />
        </button>
      </div>
    </transition-group>

    <div class="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
      <p v-show="pendingTasks > 0" class="text-sm text-gray-700 font-semibold">
        Você tem {{ pendingTasks }} tarefa(s) pendente(s)
      </p>
      <button
        v-show="tasks.length > 0"
        @click="deleteAllTasks"
        class="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
      >
        <Trash class="w-4 h-4" /> Apagar Tudo
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { Plus, Trash2, Trash, CheckSquare } from "lucide-vue-next";

const newTask = ref("");
const tasks = ref([
  { description: "Revisar atividades pendentes", isDone: false },
  { description: "Participar da daily", isDone: false },
]);

const addTask = () => {
  if (!newTask.value.trim()) return;
  tasks.value.unshift({ description: newTask.value, isDone: false });
  newTask.value = "";
  saveTasks();
};

const deleteTask = (index) => {
  tasks.value.splice(index, 1);
  saveTasks();
};

const deleteAllTasks = () => {
  tasks.value = [];
  localStorage.removeItem("tasks");
};

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

const pendingTasks = computed(() => tasks.value.filter((t) => !t.isDone).length);

watch(tasks, saveTasks, { deep: true });

onMounted(() => {
  const stored = localStorage.getItem("tasks");
  if (stored) tasks.value = JSON.parse(stored);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

