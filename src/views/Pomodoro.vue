<template>
  <div class="flex min-h-screen bg-gray-50 text-gray-800">
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <TheHeader />

      <main class="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-8">
        <section class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <h1 class="text-3xl font-extrabold text-blue-600 mb-6">Modo Pomodoro</h1>
          <p class="text-5xl font-mono text-gray-700 tracking-widest mb-6">
            {{ formatTime(timer) }}
          </p>

          <div class="flex justify-center gap-4">
            <button
              @click="startTimer"
              class="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
            >
            Iniciar
            </button>
            <button
              @click="resetTimer"
              class="flex items-center gap-2 bg-blue-400 text-white px-5 py-3 rounded-lg hover:bg-blue-500 transition"
            >
            Resetar
            </button>
          </div>
        </section>
        <p
          v-if="timerEnded"
          class="mt-4 text-red-600 font-semibold text-lg animate-pulse"
        >
          ⏰ Tempo encerrado! Faça uma pausa.
        </p>

        <section class="w-full max-w-4xl">
          <ToDO />
        </section>
      </main>
    </div>
  </div>
</template>



<script setup>
import Sidebar from '../components/layout/Sidebar.vue'
import TheHeader from '../components/layout/TheHeader.vue'
import ToDO from '../components/ToDo.vue'
import { ref } from 'vue'

const timer = ref(25 * 60)
const timerEnded = ref(false)
let intervalId = null

function startTimer() {
  if (intervalId) return
  timerEnded.value = false
  intervalId = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
    } else {
      clearInterval(intervalId)
      intervalId = null
      timerEnded.value = true
    }
  }, 1000)
}

function resetTimer() {
  clearInterval(intervalId)
  intervalId = null
  timer.value = 25 * 60
  timerEnded.value = false
}

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0')
  const s = String(seconds % 60).padStart(2, '0')
  return `${m}:${s}`
}
</script>


