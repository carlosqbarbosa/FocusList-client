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
  labels: [],
  datasets: [
    {
      label: 'Tasks criadas',
      backgroundColor: '#4F46E5',
      data: [],
    },
  ],
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: true, position: 'top' },
    title: { display: true, text: 'Tasks Criadas por Mês' },
  },
  scales: { 
    y: { 
      beginAtZero: true,
      ticks: { stepSize: 1 }
    } 
  },
};

function formatMonth(yearMonth) {
  const [year, month] = yearMonth.split('-');
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  return `${months[parseInt(month) - 1]}/${year.slice(2)}`;
}

async function loadData() {
  try {
    const { data } = await api.get('/dashboard/tasks-by-month');
    
    chartData.value.labels = data.data.map(item => formatMonth(item.mes));
    chartData.value.datasets[0].data = data.data.map(item => item.total);

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
  max-width: 600px;
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