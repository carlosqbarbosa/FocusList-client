<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div
      class="bg-white rounded-lg shadow-xl px-10 py-8 text-center w-[90%] max-w-md"
    >
      <h2 class="text-2xl font-semibold text-blue-900 mb-6">
        Adicionar Nova Task
      </h2>

      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">

        <label class="text-left font-medium">
          Título:
          <input
            v-model="form.titulo"
            type="text"
            required
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
        </label>

        <label class="text-left font-medium">
          Data de Vencimento:
          <input
            v-model="form.dataVencimento"
            type="date"
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
        </label>

        <label class="text-left font-medium">
          Descrição:
          <input
            v-model="form.descricao"
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
        </label>

        <div class="flex justify-center gap-6 mt-4">
          <button
            type="submit"
            class="bg-blue-800 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-900 transition"
          >
            Salvar
          </button>

          <button
            @click.prevent="cancel"
            class="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, reactive, watch } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["save", "cancel"]);

const form = reactive({
  titulo: "",
  dataVencimento: "",
  descricao: "",
});


function handleSubmit() {
  
  emit("save", { 
    titulo: form.titulo,
    dataVencimento: form.dataVencimento,
    descricao: form.descricao
  });

  form.titulo = "";
  form.dataVencimento = "";
  form.descricao = "";
}

function cancel() {
  form.titulo = "";
  form.dataVencimento = "";
  form.descricao = "";
  
  emit("cancel");
}
</script>