<template>
  <div class="flex min-h-screen bg-gray-50">
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <TheHeader />

      <main class="flex-1 p-4">
        <MyTasks />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/layout/Sidebar.vue";
import TheHeader from "../components/layout/TheHeader.vue";
</script>

<style scoped>
main {
  transition: all 0.3s ease;
}
</style>
