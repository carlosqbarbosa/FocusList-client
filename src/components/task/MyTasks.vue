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
            <th class="py-3 px-6 border-b">Data Vencimento</th>
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
                @change="saveTaskField(task)"
                class="border border-gray-300 rounded px-3 py-1 w-40"
              >
                <option value="Não iniciado">Não iniciado</option>
                <option value="Em progresso">Em progresso</option>
                <option value="Completo">Completo</option>
              </select>
            </td>

            <td class="py-3 px-6 border-b">
              <select 
                v-model="task.prioridade" 
                @change="saveTaskField(task)"
                class="border border-gray-300 rounded px-3 py-1 w-40"
              >
                <option value="Alta">Alta</option>
                <option value="Moderada">Moderada</option>
                <option value="Baixa">Baixa</option>
              </select>
            </td>

            <td class="py-3 px-6 border-b">
              <input 
                type="date" 
                v-model="task.dataVencimento"
                @change="saveTaskField(task)"
                class="border border-gray-300 rounded px-3 py-1 w-40"
                :class="{
                  'text-red-600 font-semibold': isOverdue(task.dataVencimento),
                  'text-orange-600 font-semibold': isDueSoon(task.dataVencimento)
                }"
              />
            </td>

            <td class="py-3 px-6 border-b text-center">
              <div class="flex justify-center gap-3">
                <!--
                <button @click="openDetailsModal(task)" class="bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-800 transition">
                  Ver detalhes
                </button>-->

                <button @click="openEditModal(task)" class="bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                  Editar
                </button>

                <button @click="openDeleteModal(task)" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">
                  Deletar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="text-right mt-4">
      <button @click="showModal = true" class="text-red-500 text-sm font-medium hover:text-red-600 transition">
        + Adicionar Task
      </button>
    </div>

    <!-- MODAIS -->
    <modalAddTasks
      :show="showModal"
      @save="addTask"
      @cancel="showModal = false"
    />

    <modalTaskDetails 
      :show="showDetailsModal"
      :task="selectedTask"
      @close="showDetailsModal = false"
    />

    <modalEditTask
      :show="showEditModal"
      :task="selectedTask"
      @close="showEditModal = false"
      @save="saveEditedTask"
    />

    <modalDeleteTask 
      :show="showDeleteModal"
      @deleteTask="deleteTask"
      @cancelDelete="cancelDelete"
    />
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


function isOverdue(dateStr) {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(dateStr + 'T00:00:00');
  return dueDate < today;
}

function isDueSoon(dateStr) {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(dateStr + 'T00:00:00');
  const diffTime = dueDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= 3 && diffDays > 0;
}

function mapStatus(s) {
  const map = {
    'Não Iniciado': 'Não iniciado',
    'Em Progresso': 'Em progresso',
    'Completo': 'Completo'
  }
  return map[s] || s
}

function unmapStatus(s) {
  const map = {
    'Não iniciado': 'Não Iniciado',
    'Em progresso': 'Em Progresso',
    'Completo': 'Completo'
  }
  return map[s] || s
}

function mapPrioridade(p) {
  return p
}

function unmapPrioridade(p) {
  return p
}

async function loadTasks() {
  try {
    const { data } = await api.get('/tasks')
    
    tasks.value = data.data.map(t => ({
      id: t.id,
      nome: t.titulo,
      status: mapStatus(t.status),
      prioridade: mapPrioridade(t.prioridade),
      descricao: t.descricao,
      dataCriacao: t.criado_em,
      dataVencimento: t.data_vencimento ? t.data_vencimento.split('T')[0] : ''
    }))
    
  } catch (error) {
    console.error(' Erro ao carregar tasks:', error.response?.data)
  }
}

onMounted(loadTasks)

async function saveTaskField(task) {
  try {
    const payload = {
      titulo: task.nome,
      descricao: task.descricao || '',
      status: unmapStatus(task.status),
      prioridade: unmapPrioridade(task.prioridade),
      data_vencimento: task.dataVencimento || null
    }
    
    await api.put(`/tasks/${task.id}`, payload)
    
  } catch (error) {
    console.error(' Erro ao salvar:', error.response?.data)
    alert(`Erro: ${error.response?.data?.message || error.message}`)
    await loadTasks()
  }
}

function openDeleteModal(task) {
  taskToDelete.value = task
  showDeleteModal.value = true
}

function cancelDelete() {
  showDeleteModal.value = false
  taskToDelete.value = null
}

async function deleteTask() {
  try {
    await api.delete(`/tasks/${taskToDelete.value.id}`)
    tasks.value = tasks.value.filter(t => t.id !== taskToDelete.value.id)
    cancelDelete()
  } catch (error) {
    console.error(' Erro ao deletar:', error.response?.data)
    alert('Erro ao deletar task')
  }
}


function openDetailsModal(task) {
  selectedTask.value = task
  showDetailsModal.value = true
}


function openEditModal(task) {
  selectedTask.value = { ...task }
  showEditModal.value = true
}

async function saveEditedTask(updatedTask) {
  try {
    const payload = {
      titulo: updatedTask.nome,
      descricao: updatedTask.descricao,
      status: unmapStatus(updatedTask.status),
      prioridade: unmapPrioridade(updatedTask.prioridade),
      data_vencimento: updatedTask.dataVencimento || null
    }
    
    await api.put(`/tasks/${selectedTask.value.id}`, payload)
    
    await loadTasks()
    showEditModal.value = false
    
  } catch (error) {
    console.error(' Erro ao editar:', error.response?.data)
    alert(`Erro: ${error.response?.data?.message || error.message}`)
  }
}

 
async function addTask(novaTask) {
  try {
    const payload = {
      titulo: novaTask.titulo,
      descricao: novaTask.descricao || '',
      prioridade: 'Moderada',
      data_vencimento: novaTask.dataVencimento || null
    }
    
    await api.post('/tasks', payload)

    showModal.value = false
    await loadTasks()

  } catch (e) {
    console.error(' Erro ao criar:', e.response?.data)
    alert(`Erro: ${e.response?.data?.message || e.message}`)
  }
}
</script>