<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6">

      <h2 class="text-xl font-semibold mb-4">Editar Tarefa</h2>

      <div class="space-y-4">
        <div>
          <label class="block font-medium mb-1">Nome</label>
          <input
            v-model="edited.nome"
            class="w-full border rounded px-3 py-2"
            type="text"
          />
        </div>

        <div>
          <label class="block font-medium mb-1">Status</label>
          <select
            v-model="edited.status"
            class="w-full border rounded px-3 py-2"
          >
            <option>Não iniciado</option>
            <option>Em progresso</option>
            <option>Completo</option>
          </select>
        </div>

        <div>
          <label class="block font-medium mb-1">Data de Vencimento</label>
          <input
            v-model="edited.dataVencimento"
            class="w-full border rounded px-3 py-2"
            type="date"
          />
        </div>

        <div>
          <label class="block font-medium mb-1">Prioridade</label>
          <select
            v-model="edited.prioridade"
            class="w-full border rounded px-3 py-2"
          >
            <option>Alta</option>
            <option>Moderada</option>
            <option>Baixa</option>
          </select>
        </div>
        <!--
        <div>
          <label class="block font-medium mb-1">Descrição</label>
          <textarea
            v-model="edited.descricao"
            class="w-full border rounded px-3 py-2"
            rows="3"
          ></textarea>
        </div>-->
      </div>

      <div class="flex justify-end gap-3 mt-6">
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>

        <button
          @click="save"
          class="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900"
        >
          Salvar
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  show: Boolean,
  task: Object
});

const emit = defineEmits(["save", "close"]);

const edited = reactive({
  nome: "",
  status: "Não iniciado",
  dataVencimento: "",
  prioridade: "Moderada",
  descricao: ""
});

watch(
  () => props.task,
  (t) => {
    if (t) {
      edited.nome = t.nome || "";
      edited.status = t.status || "Não iniciado";
      edited.dataVencimento = t.dataVencimento || "";
      edited.prioridade = t.prioridade || "Moderada";
      edited.descricao = t.descricao || "";
      
    }
  },
  { immediate: true }
);

function save() {
  
  emit("save", { 
    nome: edited.nome,
    status: edited.status,
    dataVencimento: edited.dataVencimento,
    prioridade: edited.prioridade,
    descricao: edited.descricao
  });
}
</script>