<template>
  <div class="flex min-h-screen bg-gray-50 text-gray-800">
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <TheHeader />

      <div class="flex flex-col items-center justify-center text-center p-6 bg-white rounded shadow-md w-full max-w-4xl mx-auto">
        <!-- Título e Timer -->
        <h2 class="text-2xl font-bold mb-4">{{ currentLabel }}</h2>
        <div class="text-6xl font-mono mb-6">{{ formattedTime }}</div>

        <!-- Controles do Timer -->
        <div class="flex gap-4 mb-6">
          <button @click="startTimer" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Start</button>
          <button @click="pauseTimer" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Pause</button>
          <button @click="resetTimer" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Reset</button>
        </div>

        <!-- Modos Pomodoro -->
        <div class="flex gap-2 mb-10">
          <button @click="setMode('focus')" :class="mode === 'focus' ? activeClass : defaultClass">Focus</button>
          <button @click="setMode('short')" :class="mode === 'short' ? activeClass : defaultClass">Short Break</button>
          <button @click="setMode('long')" :class="mode === 'long' ? activeClass : defaultClass">Long Break</button>
        </div>

        <!-- Lista de Tarefas -->
        <ToDo />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ToDo from '../components/ToDo.vue'
import Sidebar from '../components/layout/Sidebar.vue'
import TheHeader from '../components/layout/TheHeader.vue'


const mode = ref('focus')
const timeLeft = ref(25 * 60)
const timer = ref(null)
const isRunning = ref(false)

const durations = {
  focus: 25 * 60,
  short: 5 * 60,
  long: 15 * 60
}

const labels = {
  focus: 'Focus Time',
  short: 'Short Break',
  long: 'Long Break'
}

const currentLabel = computed(() => labels[mode.value])

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

function startTimer() {
  if (!isRunning.value) {
    timer.value = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--
      } else {
        pauseTimer()
        alert(`${labels[mode.value]} ended!`)
      }
    }, 1000)
    isRunning.value = true
  }
}

function pauseTimer() {
  clearInterval(timer.value)
  isRunning.value = false
}

function resetTimer() {
  pauseTimer()
  timeLeft.value = durations[mode.value]
}

function setMode(newMode) {
  mode.value = newMode
  resetTimer()
}

const activeClass = 'bg-blue-700 text-white px-3 py-1 rounded'
const defaultClass = 'bg-gray-200 text-black px-3 py-1 rounded hover:bg-gray-300'

onUnmounted(() => pauseTimer())
onMounted(() => resetTimer())
</script>



