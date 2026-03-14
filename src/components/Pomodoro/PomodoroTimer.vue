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

        <button
          @click="showSettings = true"
          aria-label="Configurações"
          class="group relative w-16 h-16 flex items-center justify-center rounded-full 
            bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg
            transition-all duration-300 hover:scale-110 hover:shadow-blue-400/50 
            active:scale-95"
        >
          <Settings class="w-8 h-8" />
        </button>
      </div>
    </div>

    <div class="flex justify-center gap-4 mt-6">
      <button @click="setMode('foco')" :class="mode === 'foco' ? activeClass : inactiveClass">
        Foco ({{ customDurations.foco }}min)
      </button>
      <button @click="setMode('pausa-curta')" :class="mode === 'pausa-curta' ? activeClass : inactiveClass">
        Pausa Curta ({{ customDurations['pausa-curta'] }}min)
      </button>
      <button @click="setMode('pausa-longa')" :class="mode === 'pausa-longa' ? activeClass : inactiveClass">
        Pausa Longa ({{ customDurations['pausa-longa'] }}min)
      </button>
    </div>

    <!-- Modal de Configurações -->
    <transition name="modal">
      <div 
        v-if="showSettings" 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" 
        @click.self="showSettings = false"
      >
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-gray-800">Configurações do Timer</h3>
            <button @click="showSettings = false" class="text-gray-400 hover:text-gray-600 transition-colors">
              <X class="w-6 h-6" />
            </button>
          </div>

          <div class="space-y-6">
            <!-- Foco -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Tempo de Foco (minutos)
              </label>
              <div class="flex items-center gap-3">
                <button 
                  @click="decrementDuration('foco')"
                  class="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                >
                  <Minus class="w-5 h-5 text-gray-700" />
                </button>
                <input 
                  v-model.number="customDurations.foco" 
                  type="number" 
                  min="1" 
                  max="60"
                  class="flex-1 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg py-2 focus:border-blue-500 focus:outline-none"
                />
                <button 
                  @click="incrementDuration('foco')"
                  class="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                >
                  <Plus class="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            <!-- Pausa Curta -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Pausa Curta (minutos)
              </label>
              <div class="flex items-center gap-3">
                <button 
                  @click="decrementDuration('pausa-curta')"
                  class="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                >
                  <Minus class="w-5 h-5 text-gray-700" />
                </button>
                <input 
                  v-model.number="customDurations['pausa-curta']" 
                  type="number" 
                  min="1" 
                  max="30"
                  class="flex-1 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg py-2 focus:border-blue-500 focus:outline-none"
                />
                <button 
                  @click="incrementDuration('pausa-curta')"
                  class="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                >
                  <Plus class="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            <!-- Pausa Longa -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Pausa Longa (minutos)
              </label>
              <div class="flex items-center gap-3">
                <button 
                  @click="decrementDuration('pausa-longa')"
                  class="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                >
                  <Minus class="w-5 h-5 text-gray-700" />
                </button>
                <input 
                  v-model.number="customDurations['pausa-longa']" 
                  type="number" 
                  min="1" 
                  max="60"
                  class="flex-1 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg py-2 focus:border-blue-500 focus:outline-none"
                />
                <button 
                  @click="incrementDuration('pausa-longa')"
                  class="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                >
                  <Plus class="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>

          <div class="flex gap-3 mt-8">
            <button 
              @click="resetToDefaults"
              class="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Restaurar Padrão
            </button>
            <button 
              @click="saveSettings"
              class="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-md"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Elemento de áudio -->
    <audio ref="alarmAudio" preload="auto">
      <source src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" type="audio/mpeg">
      <source src="https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3" type="audio/mpeg">
    </audio>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { Play, Pause, RotateCcw, Settings, X, Plus, Minus } from "lucide-vue-next";

const alarmAudio = ref(null);

const DEFAULT_DURATIONS = {
  foco: 25,
  "pausa-curta": 5,
  "pausa-longa": 15,
};

const mode = ref("foco");
const time = ref(0);
const isRunning = ref(false);
const showSettings = ref(false);
const customDurations = ref({ ...DEFAULT_DURATIONS });

let timer = null;

const formatTime = computed(() => {
  const m = Math.floor(time.value / 60).toString().padStart(2, "0");
  const s = (time.value % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
});

function playAlarm() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  const pattern = [
    { freq: 523.25, time: 0 },     // C5
    { freq: 659.25, time: 0.4 },   // E5
    { freq: 783.99, time: 0.8 },   // G5
    { freq: 523.25, time: 1.4 },   // C5
    { freq: 659.25, time: 1.8 },   // E5
    { freq: 783.99, time: 2.2 },   // G5
    { freq: 523.25, time: 2.8 },   // C5
    { freq: 659.25, time: 3.2 },   // E5
    { freq: 783.99, time: 3.6 }    // G5
  ];
  
  pattern.forEach(note => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = note.freq;
    oscillator.type = 'sine';
    
    const startTime = audioContext.currentTime + note.time;
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.5);
  });
}

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
  time.value = customDurations.value[mode.value] * 60;
}

function setMode(newMode) {
  mode.value = newMode;
  time.value = customDurations.value[newMode] * 60;
  pauseTimer();
}

function incrementDuration(modeKey) {
  const max = modeKey === 'foco' || modeKey === 'pausa-longa' ? 60 : 30;
  if (customDurations.value[modeKey] < max) {
    customDurations.value[modeKey]++;
  }
}

function decrementDuration(modeKey) {
  if (customDurations.value[modeKey] > 1) {
    customDurations.value[modeKey]--;
  }
}

function resetToDefaults() {
  customDurations.value = { ...DEFAULT_DURATIONS };
}

function saveSettings() {
  localStorage.setItem('pomodoroSettings', JSON.stringify(customDurations.value));
  
  time.value = customDurations.value[mode.value] * 60;
  
  showSettings.value = false;
}

onMounted(() => {
  const saved = localStorage.getItem('pomodoroSettings');
  if (saved) {
    try {
      customDurations.value = JSON.parse(saved);
    } catch (e) {
      console.error('Erro ao carregar configurações:', e);
    }
  }
  
  time.value = customDurations.value[mode.value] * 60;
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});

const activeClass = "px-4 py-2 rounded-lg bg-blue-900 text-white transition-colors";
const inactiveClass = "px-4 py-2 rounded-lg bg-gray-200 text-blue-900 hover:bg-gray-300 transition-colors";
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.9);
}
</style>