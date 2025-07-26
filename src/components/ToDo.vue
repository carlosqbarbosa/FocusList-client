<template>
  <div class="w-full max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-6">
    <h2 class="text-2xl font-bold text-blue-700 text-center mb-6">Lista de Tarefas</h2>

    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <input
        type="text"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Adicione uma nova tarefa..."
        v-model="newTask"
        @keyup.enter="addTask"
        :disabled="tasks.length > 4"
      />
      <button
        v-if="tasks.length <= 4"
        @click="addTask"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Adicionar
      </button>
      <p v-else class="text-green-600 font-semibold self-center">Lista completa</p>
    </div>

    <transition-group name="fade" tag="div">
      <div
        v-for="(task, index) in tasks"
        :key="task.description + index"
        class="flex items-center justify-between bg-blue-100 text-blue-900 px-4 py-3 rounded-lg mb-3 shadow-sm"
      >
        <div class="flex items-center gap-3">
          <input
            type="checkbox"
            v-model="task.isDone"
            class="form-checkbox h-5 w-5 text-blue-600"
          />
          <span
            :class="{ 'line-through text-gray-500': task.isDone }"
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
        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
      Apagar Tudo
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";

export default {
  name: "ToDo",
  setup() {
    const newTask = ref("");
    const tasks = ref([
      { description: "Revisar atividades pendentes", isDone: false },
      { description: "Participar da daily", isDone: false },
    ]);

    const addTask = () => {
      if (!newTask.value) return;
      tasks.value.unshift({
        description: newTask.value,
        isDone: false,
      });
      localStorage.setItem("tasks", JSON.stringify(tasks.value));
      newTask.value = "";
    };

    const deleteTask = (index) => {
      tasks.value.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks.value));
    };

    const deleteAllTasks = () => {
      tasks.value = [];
      localStorage.removeItem("tasks");
    };

    const pendingTasks = computed(() => {
      return tasks.value.filter((x) => !x.isDone).length;
    });

    watch(
      tasks,
      () => {
        if (tasks.value.length > 4) {
          alert("Você atingiu o limite máximo de tarefas (5)");
        }
      },
      { deep: true }
    );

    onMounted(() => {
      if (localStorage.tasks) {
        tasks.value = JSON.parse(localStorage.getItem("tasks")) || [];
      }
    });

    return {
      newTask,
      tasks,
      addTask,
      deleteTask,
      deleteAllTasks,
      pendingTasks,
    };
  },
};
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

</style>
