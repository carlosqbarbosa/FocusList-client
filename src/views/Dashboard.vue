<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1">
      <TheHeader />
      <main class="bg-gray-100 flex-1 min-h-screen pl-6 pt-6 pr-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Coluna 1: Logo + StatusCard -->

          <!-- Coluna 2 e 3: Cabeçalho + Charts -->
          <div class="lg:col-span-2">
            <div class="flex justify-between items-start">
              <h1 class="text-2xl font-bold text-gray-800 mb-4">
                Welcome back, <span class="text-blue-600">Camila 👋</span>
              </h1>
            </div>
            <div class="grid md:grid-cols-2 gap-6">
              <GithubChart />
              <TarefasConcluidasPorMesCharts />
            </div>
          </div>
        </div>
      </main>
    </div> 
  </div>
</template>

<script setup>
import TarefasConcluidasPorMesCharts from '../components/charts/TarefasConcluidasPorMesCharts.vue';
import Sidebar from '../components/layout/Sidebar.vue'
import TheHeader from '../components/layout/TheHeader.vue'
</script>