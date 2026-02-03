<template>
  <div class="chart-container">
    <Doughnut v-if="!loading" :data="chartData" :options="chartOptions" />
    <div v-else class="loading">Carregando...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import api from '@/services/api';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const loading = ref(true);

const chartData = ref({
  labels: ['Não Iniciado', 'Em Progresso', 'Completo'],
  datasets: [
    {
      backgroundColor: ['#EF4444', '#F59E0B', '#10B981'],
      data: [0, 0, 0],
    },
  ],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { position: 'bottom' },
    title: { display: true, text: 'Tasks por Status' },
  },
};

async function loadData() {
  try {
    const { data } = await api.get('/dashboard/summary');
    
    const statusMap = {
      'Não Iniciado': 0,
      'Em Progresso': 0,
      'Completo': 0
    };

    data.data.porStatus.forEach(item => {
      statusMap[item.status] = item.count;
    });

    chartData.value.datasets[0].data = [
      statusMap['Não Iniciado'],
      statusMap['Em Progresso'],
      statusMap['Completo']
    ];

    loading.value = false;
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    loading.value = false;
  }
}

onMounted(loadData);
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 400px;
  margin: auto;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading {
  color: #6B7280;
  font-size: 14px;
}
</style>