<template>
  <div class="flex min-h-screen bg-gray-50">
    <Sidebar />

    <div class="flex-1 flex flex-col">
    
      <TheHeader />

      <main class="flex flex-col lg:flex-row gap-8 p-8">
        <section class="flex-1 bg-white rounded-2xl shadow-lg p-6">
          <PomodoroTimer />
        </section>

        <section class="flex-1 rounded-2xl p-6">
          <ToDo />
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/layout/Sidebar.vue";
import TheHeader from "../components/layout/TheHeader.vue";
import PomodoroTimer from "../components/pomodoro/PomodoroTimer.vue";
import ToDo from "../components/task/ToDo.vue";
</script>

<style scoped>
main {
  transition: all 0.3s ease;
}
</style>




