<template>
  <div class="flex bg-gray-100 min-h-screen">
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <TheHeader />

      <main class="flex-1 p-8 overflow-y-auto">
        <!-- Cards de Resumo -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-fade-in">
          <div class="stat-card">
            <div class="stat-icon bg-blue-100">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div class="stat-content">
              <p class="stat-label">Total de Tasks</p>
              <p class="stat-value">{{ summary.total || 0 }}</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon bg-green-100">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="stat-content">
              <p class="stat-label">Completas</p>
              <p class="stat-value text-green-600">{{ summary.completas || 0 }}</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon bg-orange-100">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="stat-content">
              <p class="stat-label">Pendentes</p>
              <p class="stat-value text-orange-600">{{ summary.pendentes || 0 }}</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon bg-purple-100">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div class="stat-content">
              <p class="stat-label">Taxa de Conclusão</p>
              <p class="stat-value text-purple-600">
                {{ summary.taxaConclusao || 0 }}%
              </p>
            </div>
          </div>
        </div>

        <!-- Gráficos -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-fade-in">
          <div class="card">
            <TaxaConclusaoChartReal />
          </div>

          <div class="card">
            <TasksPorStatusChart />
          </div>

          <div class="card">
            <TasksPorPrioridadeChart />
          </div>

          <div class="card md:col-span-2">
            <TasksCriadasPorMesChart />
          </div>

          <div class="card">
            <TasksVencendoEmBreve />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import Sidebar from '../components/layout/SideBar.vue';
import TheHeader from '../components/layout/TheHeader.vue';

import TaxaConclusaoChartReal from '../components/charts/TaxaConclusaoChartReal.vue';
import TasksPorStatusChart from '../components/charts/TasksPorStatusChart.vue';
import TasksPorPrioridadeChart from '../components/charts/TasksPorPrioridadeChart.vue';
import TasksCriadasPorMesChart from '../components/charts/TasksCriadasPorMesChart.vue';
import TasksVencendoEmBreve from '../components/charts/TasksVencendoEmBreve.vue';

import dashboardService from '@/services/dashboard.service';

const loading = ref(true);

const summary = ref({
  total: 0,
  completas: 0,
  pendentes: 0,
  taxaConclusao: 0,
  porStatus: [],
  porPrioridade: []
});

const tasksByMonth = ref([]);
const upcomingTasks = ref([]);
const overdueTasks = ref([]);

async function loadDashboard() {
  try {
    const responses = await Promise.allSettled([
      dashboardService.getSummary(),
      dashboardService.getTasksByMonth(),
      dashboardService.getUpcomingTasks(),
      dashboardService.getOverdueTasks()
    ]);

    if (responses[0].status === 'fulfilled') {
      summary.value = responses[0].value.data.data;
    }

    if (responses[1].status === 'fulfilled') {
      tasksByMonth.value = responses[1].value.data.data;
    }

    if (responses[2].status === 'fulfilled') {
      upcomingTasks.value = responses[2].value.data.data;
    }

    if (responses[3].status === 'fulfilled') {
      overdueTasks.value = responses[3].value.data.data;
    }

  } catch (error) {
    console.error('Erro inesperado no dashboard:', error);
  } finally {
    loading.value = false;
  }
}


onMounted(loadDashboard);
</script>

<style scoped>
.card {
  @apply bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out;
}

.stat-card {
  @apply bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4;
}

.stat-icon {
  @apply w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0;
}

.stat-content {
  @apply flex-1;
}

.stat-label {
  @apply text-sm text-gray-600 mb-1;
}

.stat-value {
  @apply text-2xl font-bold text-gray-900;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}
</style>


