<template>
  <div class="text-center">
    <div class="bg-blue-900 text-white rounded-2xl py-10 px-6 shadow-lg max-w-md mx-auto">

      <div class="text-5xl font-mono my-4">{{ formatTime }}</div>

      <div class="flex justify-center gap-6 mt-6">
        <!-- Iniciar -->
        <button
            @click="startTimer"
            :disabled="isRunning"
            aria-label="Iniciar"
            class="group relative w-16 h-16 flex items-center justify-center rounded-full 
                bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg
                transition-all duration-300 hover:scale-110 hover:shadow-blue-400/50 
                active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
        >
            <Play class="w-8 h-8" />
            <span class="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
        </button>

        <!-- Pausar -->
        <button
            @click="pauseTimer"
            :disabled="!isRunning"
            aria-label="Pausar"
            class="group relative w-16 h-16 flex items-center justify-center rounded-full 
                bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg
                transition-all duration-300 hover:scale-110 hover:shadow-blue-400/50 
                active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
        >
            <Pause class="w-8 h-8" />
            <span class="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
        </button>

        <!-- Resetar -->
        <button
            @click="resetTimer"
            aria-label="Resetar"
            class="group relative w-16 h-16 flex items-center justify-center rounded-full 
                bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg
                transition-all duration-300 hover:scale-110 hover:shadow-blue-400/50 
                active:scale-95"
        >
            <RotateCcw class="w-8 h-8" />
            <span class="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
        </button>
        </div>

    </div>

    <div class="flex justify-center gap-4 mt-6">
      <button
        @click="setMode('foco')"
        :class="mode === 'foco' ? activeClass : inactiveClass"
      >
        Foco
      </button>

      <button
        @click="setMode('pausa-curta')"
        :class="mode === 'pausa-curta' ? activeClass : inactiveClass"
      >
        Pausa mais curta
      </button>

      <button
        @click="setMode('pausa-longa')"
        :class="mode === 'pausa-longa' ? activeClass : inactiveClass"
      >
        Pausa mais longa
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from "vue";
import { Play, Pause, RotateCcw } from "lucide-vue-next";


/* --- Configuração de durações (em segundos) --- */
const DURATIONS = {
  foco: 25 * 60,
  "pausa-curta": 5 * 60,
  "pausa-longa": 15 * 60,
};

/* --- Estado reativo --- */
const mode = ref("foco"); // 'foco' | 'pausa-curta' | 'pausa-longa'
const time = ref(DURATIONS[mode.value]);
const isRunning = ref(false);

let timer = null;

/* --- Classes reutilizáveis para os botões de modo --- */
const activeClass = "px-4 py-2 rounded-lg bg-blue-900 text-white";
const inactiveClass = "px-4 py-2 rounded-lg bg-gray-200 text-blue-900";

/* --- Formatador do tempo --- */
const formatTime = computed(() => {
  const minutes = Math.floor(time.value / 60);
  const seconds = time.value % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
});

/* --- Funções de controle do temporizador --- */
function startTimer() {
  if (isRunning.value) return;
  isRunning.value = true;

  // protege se houver intervalo anterior
  if (timer) clearInterval(timer);

  timer = setInterval(() => {
    if (time.value > 0) {
      time.value--;
    } else {
      // quando chega a 0, pausa e limpa
      pauseTimer();
      // opcional: aqui você pode disparar uma notificação, som ou alternar automaticamente de modo
    }
  }, 1000);
}

function pauseTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  isRunning.value = false;
}

function resetTimer() {
  pauseTimer();
  time.value = DURATIONS[mode.value];
}

/* --- Troca de modo --- */
function setMode(selectedMode) {
  // se for o mesmo modo, só reseta
  if (selectedMode === mode.value) {
    resetTimer();
    return;
  }

  // atualiza modo e tempo
  mode.value = selectedMode;
  time.value = DURATIONS[selectedMode];

  // pausar ao trocar de modo (evita rodar dois timers ao mesmo tempo)
  pauseTimer();
}

/* --- Limpeza ao desmontar o componente --- */
onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
/* Pequeno ajuste visual (opcional) */
</style>
