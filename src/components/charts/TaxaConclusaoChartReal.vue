<template>
  <div class="chart-wrapper">
    <Doughnut v-if="!loading" :data="chartData" :options="chartOptions" />
    <div v-else class="loading">Carregando...</div>
    
    <div v-if="!loading" class="stats">
      <div class="stat-item">
        <span class="stat-value">{{ taxaConclusao }}%</span>
        <span class="stat-label">Taxa de Conclusão</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import api from '@/services/api';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const loading = ref(true);
const taxaConclusao = ref(0);

const chartData = ref({
  labels: ['Concluídas', 'Pendentes'],
  datasets: [
    {
      backgroundColor: ['#10B981', '#E5E7EB'],
      data: [0, 0],
    },
  ],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { position: 'bottom' },
    title: { display: true, text: 'Taxa de Conclusão de Tasks' },
  },
};

async function loadData() {
  try {
    const { data } = await api.get('/dashboard/summary');
    
    const completas = data.data.completas || 0;
    const pendentes = data.data.pendentes || 0;
    taxaConclusao.value = data.data.taxaConclusao || 0;

    chartData.value.datasets[0].data = [completas, pendentes];

    loading.value = false;
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    loading.value = false;
  }
}

onMounted(loadData);
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  max-width: 350px;
  margin: auto;
  min-height: 300px;
}

.loading {
  color: #6B7280;
  font-size: 14px;
  text-align: center;
  padding: 40px;
}

.stats {
  margin-top: 20px;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: #10B981;
}

.stat-label {
  font-size: 14px;
  color: #6B7280;
}
</style>