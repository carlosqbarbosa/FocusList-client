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
              <select v-model="task.status" class="border border-gray-300 rounded px-3 py-1 w-40">
                <option value="Completo">Completo</option>
                <option value="Em progresso">Em progresso</option>
                <option value="Não iniciado">Não iniciado</option>
              </select>
            </td>

            <td class="py-3 px-6 border-b">
              <select v-model="task.prioridade" class="border border-gray-300 rounded px-3 py-1 w-40">
                <option value="Alta">Alta</option>
                <option value="Moderada">Moderada</option>
                <option value="Baixa">Baixa</option>
              </select>
            </td>

            <td class="py-3 px-6 border-b text-center">
              <div class="flex justify-center gap-3">

                <button @click="openDetailsModal(task)" class="bg-blue-900 text-white px-3 py-1 rounded">
                  Ver detalhes
                </button>

                <modalTaskDetails 
                  :show="showDetailsModal"
                  :task="selectedTask"
                  @close="showDetailsModal = false"
                />

                <button @click="openEditModal(task)" class="bg-blue-800 text-white px-3 py-1 rounded">
                  Editar
                </button>

                <modalEditTask
                  :show="showEditModal"
                  :task="selectedTask"
                  @close="showEditModal = false"
                  @save="saveEditedTask"
                />

                <button @click="openDeleteModal(task)" class="bg-red-600 text-white px-3 py-1 rounded">
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
      <button @click="showModal = true" class="text-red-500 text-sm font-medium">
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
import { ref, onMounted } from "vue";
import modalAddTasks from "@/components/Modal/modalAddTasks.vue";
import modalDeleteTask from "@/components/Modal/modalDeleteTask.vue";
import modalTaskDetails from "@/components/Modal/modalTaskDetails.vue";
import modalEditTask from "@/components/Modal/modalEditTask.vue";
import api from "@/services/api";


const showModal = ref(false);
const showDeleteModal = ref(false);
const showDetailsModal = ref(false);
const showEditModal = ref(false);

const taskToDelete = ref(null);
const selectedTask = ref({});

const tasks = ref([])


function mapStatus(s) {
  if (s === 'nao_iniciado') return 'Não iniciado'
  if (s === 'em_progresso') return 'Em progresso'
  if (s === 'concluido') return 'Completo'
  return s
}

function unmapStatus(s) {
  if (s === 'Não iniciado') return 'nao_iniciado'
  if (s === 'Em progresso') return 'em_progresso'
  if (s === 'Completo') return 'concluido'
  return s
}

function mapPrioridade(p) {
  if (p === 'alta') return 'Alta'
  if (p === 'moderada') return 'Moderada'
  if (p === 'baixa') return 'Baixa'
  return p
}

function unmapPrioridade(p) {
  if (p === 'Alta') return 'alta'
  if (p === 'Moderada') return 'moderada'
  if (p === 'Baixa') return 'baixa'
  return p
}


async function loadTasks() {
  const { data } = await api.get('/tasks')

  tasks.value = data.data.map(t => ({
    id: t.id,
    nome: t.titulo,
    status: mapStatus(t.status),
    prioridade: mapPrioridade(t.prioridade),
    descricao: t.descricao,
    data: t.data_vencimento
  }))
}

onMounted(loadTasks)


function openDeleteModal(task) {
  taskToDelete.value = task
  showDeleteModal.value = true
}

function cancelDelete() {
  showDeleteModal.value = false
  taskToDelete.value = null
}

async function deleteTask() {
  await api.delete(`/tasks/${taskToDelete.value.id}`)
  tasks.value = tasks.value.filter(t => t.id !== taskToDelete.value.id)
  cancelDelete()
}

function openDetailsModal(task) {
  selectedTask.value = task
  showDetailsModal.value = true
}

function openEditModal(task) {
  selectedTask.value = task
  showEditModal.value = true
}

async function saveEditedTask(updatedTask) {
  await api.put(`/tasks/${selectedTask.value.id}`, {
    titulo: updatedTask.nome,
    descricao: updatedTask.descricao,
    status: unmapStatus(updatedTask.status),
    prioridade: unmapPrioridade(updatedTask.prioridade)
  })

  await loadTasks()
  showEditModal.value = false
}


async function addTask(novaTask) {
  try {
    const res = await api.post('/tasks', {
      titulo: novaTask.titulo,
      descricao: novaTask.descricao,
      prioridade: 'moderada'
    })

    console.log("TASK CRIADA:", res.data)

    showModal.value = false
    await loadTasks()

  } catch (e) {
    console.error("ERRO AO CRIAR TASK:", e.response?.data || e)
  }
}
</script>

