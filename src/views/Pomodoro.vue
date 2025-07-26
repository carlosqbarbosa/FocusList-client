<template>
  <div class="flex min-h-screen bg-gray-50 text-gray-800">
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <TheHeader />
      
      <div class="flex justify-center items-center flex-col flex-1">
        <!-- Container Timer -->
          <div
            class="w-full max-w-xl rounded-3xl text-white py-10 px-6 mb-10 justify-center"
            :class="{
              'bg-blue-800': mode === 'focus',
              'bg-sky-600': mode === 'short',
              'bg-teal-600': mode === 'long'
            }"
          >
            <div class="flex justify-center mb-4">
              <span
                class="bg-white text-blue-800 font-semibold text-sm px-3 py-1 rounded-full"
                v-if="mode === 'focus'"
              >
                Focus
              </span>
              <span
                class="bg-white text-sky-700 font-semibold text-sm px-3 py-1 rounded-full"
                v-if="mode === 'short'"
              >
                Short Break
              </span>
              <span
                class="bg-white text-teal-700 font-semibold text-sm px-3 py-1 rounded-full"
                v-if="mode === 'long'"
              >
                Long Break
              </span>
            </div>

            <div class="text-6xl font-mono text-center mb-8">
              {{ formattedTime }}
            </div>

            <div class="flex justify-center gap-6">
              <button @click="startTimer" class="bg-white text-blue-800 hover:bg-gray-100 p-3 rounded-full">
                ▶
              </button>
              <button @click="pauseTimer" class="bg-white text-yellow-600 hover:bg-gray-100 p-3 rounded-full">
                ⏸
              </button>
              <button @click="resetTimer" class="bg-white text-red-600 hover:bg-gray-100 p-3 rounded-full">
                ⟳
              </button>
            </div>
          </div>

        <!-- Modos Pomodoro -->
        <div class="flex justify-center gap-2 mb-10">
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

const activeClass = 'bg-white text-blue-800 font-semibold px-3 py-1 rounded'
const defaultClass = 'bg-gray-200 text-black px-3 py-1 rounded hover:bg-gray-300'

onUnmounted(() => pauseTimer())
onMounted(() => resetTimer())
</script>



