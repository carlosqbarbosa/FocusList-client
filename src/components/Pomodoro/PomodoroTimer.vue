<template>
  <div class="text-center">
    <div class="bg-blue-900 text-white rounded-2xl py-10 px-6 shadow-lg max-w-md mx-auto">

      <div class="text-5xl font-mono my-4">{{ formatTime }}</div>

      <div class="flex justify-center gap-6 mt-6">
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
        </button>


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
        </button>


        <button
          @click="resetTimer"
          aria-label="Resetar"
          class="group relative w-16 h-16 flex items-center justify-center rounded-full 
            bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg
            transition-all duration-300 hover:scale-110 hover:shadow-blue-400/50 
            active:scale-95"
        >
          <RotateCcw class="w-8 h-8" />
        </button>
      </div>
    </div>

    <div class="flex justify-center gap-4 mt-6">
      <button @click="setMode('foco')" :class="mode === 'foco' ? activeClass : inactiveClass">Foco</button>
      <button @click="setMode('pausa-curta')" :class="mode === 'pausa-curta' ? activeClass : inactiveClass">Pausa curta</button>
      <button @click="setMode('pausa-longa')" :class="mode === 'pausa-longa' ? activeClass : inactiveClass">Pausa longa</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from "vue";
import { Play, Pause, RotateCcw } from "lucide-vue-next";
import { useSound } from "@vueuse/sound";


const { play: playAlarm } = useSound(
  "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3"
);


const DURATIONS = {
  foco: 25 * 60,
  "pausa-curta": 5 * 60,
  "pausa-longa": 15 * 60,
};

const mode = ref("foco");
const time = ref(DURATIONS[mode.value]);
const isRunning = ref(false);

let timer = null;

/* Formatador MM:SS */
const formatTime = computed(() => {
  const m = Math.floor(time.value / 60).toString().padStart(2, "0");
  const s = (time.value % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
});


function startTimer() {
  if (isRunning.value) return;
  isRunning.value = true;

  if (timer) clearInterval(timer);

  timer = setInterval(() => {
    if (time.value > 0) {
      time.value--;
    } else {
      pauseTimer();
      playAlarm(); 
    }
  }, 1000);
}


function pauseTimer() {
  if (timer) clearInterval(timer);
  timer = null;
  isRunning.value = false;
}


function resetTimer() {
  pauseTimer();
  time.value = DURATIONS[mode.value];
}


function setMode(newMode) {
  mode.value = newMode;
  time.value = DURATIONS[newMode];
  pauseTimer();
}

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});


const activeClass = "px-4 py-2 rounded-lg bg-blue-900 text-white";
const inactiveClass = "px-4 py-2 rounded-lg bg-gray-200 text-blue-900";
</script>

<style scoped>
</style>
