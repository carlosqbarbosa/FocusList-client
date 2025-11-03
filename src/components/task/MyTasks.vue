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
            <!-- Nome da Task -->
            <td class="py-3 px-6 border-b">{{ task.nome }}</td>

            <!-- Dropdown Status -->
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

            <!-- Dropdown Prioridade -->
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

            <!-- Botões de Ação -->
            <td class="py-3 px-6 border-b text-center">
              <div class="flex justify-center gap-3">
                <button
                  class="bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-800 transition"
                >
                  Ver detalhes
                </button>
                <button
                  class="bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-900 transition"
                >
                  Editar
                </button>
                <button
                  class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Deletar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Adicionar nova task -->
    <div class="text-right mt-4">
      <button class="text-red-500 hover:text-red-600 text-sm font-medium">
        + Adicionar Task
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const tasks = reactive([
  { id: 1, nome: "Estudar React", status: "Completo", prioridade: "Alta" },
  { id: 2, nome: "Fazer projeto", status: "Em progresso", prioridade: "Moderada" },
  { id: 3, nome: "Estudar Node", status: "Não iniciado", prioridade: "Baixa" },
]);
</script>

