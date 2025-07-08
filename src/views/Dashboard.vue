<template>
  <div class="flex">
    <Sidebar />
    <main class="bg-gray-100 flex-1 min-h-screen pl-6 pt-6 pr-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Coluna 1: Logo + StatusCard -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-2 mb-4">
            <img src="@/assets/img/logo.png" alt="logo" class="w-6 h-6" />
            <span class="text-xl font-semibold text-gray-700">FocusList</span>
          </div>
          <StatusCard />
        </div>

        <!-- Coluna 2 e 3: Cabeçalho + Charts -->
        <div class="lg:col-span-2">
          <div class="flex justify-between items-start">
            <h1 class="text-2xl font-bold text-gray-800 mb-4">
              Welcome back, <span class="text-blue-600">Camila 👋</span>
            </h1>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            <GithubChart />
            <BarChart />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '../components/layout/Sidebar.vue'
import StatusCard from '../components/charts/StatusCard.vue'
import GithubChart from '../components/charts/GithubChart.vue'
import BarChart from '../components/charts/BarChart.vue'
</script>