<template>
  <div class="bg-white p-6 rounded-lg shadow-md mt-6 mx-8">
    <h2 class="text-lg font-semibold mb-4 text-blue-900">Minhas Tasks</h2>

    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-200 rounded-lg text-left">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="py-3 px-6 border-b">Tasks</th>
            <th class="py-3 px-6 border-b">Status</th>
            <th class="py-3 px-6 border-b">Prioridade</th>
            <th class="py-3 px-6 border-b text-center">Ação</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="task in tasks"
            :key="task.id"
            class="hover:bg-gray-50 transition"
          >
            <td class="py-3 px-6 border-b">{{ task.nome }}</td>

            <td class="py-3 px-6 border-b">
              <select
                v-model="task.status"
                class="border border-gray-300 rounded px-3 py-1 w-40 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
              >
                <option value="Completo">Completo</option>
                <option value="Em progresso">Em progresso</option>
                <option value="Não iniciado">Não iniciado</option>
              </select>
            </td>

            <td class="py-3 px-6 border-b">
              <select
                v-model="task.prioridade"
                class="border border-gray-300 rounded px-3 py-1 w-40 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
              >
                <option value="Alta">Alta</option>
                <option value="Moderada">Moderada</option>
                <option value="Baixa">Baixa</option>
              </select>
            </td>

            <td class="py-3 px-6 border-b text-center">
              <div class="flex justify-center gap-3">
                <button
                @click="openDetailsModal(task)"
                  class="bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-800 transition"
                >
                  Ver detalhes
                </button>

                <modalTaskDetails 
                  :show="showDetailsModal"
                  :task="selectedTask"
                  @close="showDetailsModal = false"
                />

                <button
                  @click="openEditModal(task)"
                  class="bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-900 transition"
                >
                  Editar
                </button>
                <modalEditTask
                  :show="showEditModal"
                  :task="selectedTask"
                  @close="showEditModal = false"
                  @save="saveEditedTask"
                />

                <button
                  @click="openDeleteModal(task)"
                  class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Deletar
                </button>

                <modalDeleteTask 
                  :show="showDeleteModal"
                  @deleteTask="deleteTask"
                  @cancelDelete="cancelDelete"
                />
                
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="text-right mt-4">
      <button 
        @click="showModal = true"
        class="text-red-500 hover:text-red-600 text-sm font-medium"
      >
        + Adicionar Task
      </button>

      <modalAddTasks
        :show="showModal"
        @save="addTask"
        @cancel="showModal = false"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import modalAddTasks from "@/components/Modal/modalAddTasks.vue";
import modalDeleteTask from "@/components/Modal/modalDeleteTask.vue";
import modalTaskDetails from "@/components/Modal/modalTaskDetails.vue";
import modalEditTask from "@/components/Modal/modalEditTask.vue";


const showModal = ref(false);
const showDeleteModal = ref(false);     
const taskToDelete = ref(null); 
const showDetailsModal = ref(false);
const selectedTask = ref({});
const showEditModal = ref(false);
      


const tasks = reactive([
  { id: 1, nome: "Estudar React", status: "Completo", prioridade: "Alta" },
  { id: 2, nome: "Fazer projeto", status: "Em progresso", prioridade: "Moderada" },
  { id: 3, nome: "Estudar Node", status: "Não iniciado", prioridade: "Baixa" },
]);

function openDeleteModal(task) {
  taskToDelete.value = task;
  showDeleteModal.value = true;
}


function deleteTask() {
  const id = taskToDelete.value.id;
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) tasks.splice(index, 1);

  showDeleteModal.value = false;
  taskToDelete.value = null;
}

function cancelDelete() {
  showDeleteModal.value = false;
  taskToDelete.value = null;
}


function addTask(novaTask) {
  tasks.push({
    id: Date.now(),
    nome: novaTask.titulo,
    status: "Não iniciado",
    prioridade: "Moderada",
    data: novaTask.data,
    descricao: novaTask.descricao,
  });

  showModal.value = false;
}

const openDetailsModal = (task) => {
  selectedTask.value = task;
  showDetailsModal.value = true;
}

function openEditModal(task) {
  selectedTask.value = task;
  showEditModal.value = true;
}

function saveEditedTask(updatedTask) {
  const id = selectedTask.value.id;

  const index = tasks.findIndex((t) => t.id === id);
  if (index !== -1) {
    tasks[index] = { 
      ...tasks[index], 
      ...updatedTask 
    };
  }

  showEditModal.value = false;
}

</script>

