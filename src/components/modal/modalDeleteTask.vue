<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div
      class="bg-white rounded-lg shadow-xl px-10 py-8 text-center w-[90%] max-w-md"
    >
      <h2 class="text-2xl font-semibold text-blue-900 mb-6">
        Tem certeza que deseja deletar a task?
      </h2>

      <div class="flex justify-center gap-6">
        <button
          @click="deleteTask"
          class="bg-blue-800 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-900 transition"
        >
          Deletar
        </button>

        <button
          @click="cancelDelete"
          class="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["deleteTask", "cancelDelete"]);

function deleteTask() {
  emit("deleteTask");
}

function cancelDelete() {
  emit("cancelDelete");
}
</script>