<template>
  <div class="chart-container">
    <Bar v-if="!loading" :data="chartData" :options="chartOptions" />
    <div v-else class="loading">Carregando...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import api from '@/services/api';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const loading = ref(true);

const chartData = ref({
  labels: ['Alta', 'Moderada', 'Baixa'],
  datasets: [
    {
      label: 'Número de Tasks',
      backgroundColor: ['#EF4444', '#F59E0B', '#3B82F6'],
      data: [0, 0, 0],
    },
  ],
});

const chartOptions = {
  indexAxis: 'y',
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: 'Tasks por Prioridade' },
  },
  scales: { 
    x: { beginAtZero: true, ticks: { stepSize: 1 } }
  },
};

async function loadData() {
  try {
    const { data } = await api.get('/dashboard/summary');
    
    const priorityMap = {
      'Alta': 0,
      'Moderada': 0,
      'Baixa': 0
    };

    data.data.porPrioridade.forEach(item => {
      priorityMap[item.prioridade] = item.count;
    });

    chartData.value.datasets[0].data = [
      priorityMap['Alta'],
      priorityMap['Moderada'],
      priorityMap['Baixa']
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
  max-width: 500px;
  margin: auto;
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading {
  color: #6B7280;
  font-size: 14px;
}
</style>