<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Bar } from "vue-chartjs"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js"

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = {
  labels: ["Foco", "Pausas", "Estudo", "Reuniões", "Lazer"],
  datasets: [
    {
      label: "Minutos por dia",
      backgroundColor: ["#3B82F6", "#FBBF24", "#10B981", "#8B5CF6", "#F87171"],
      data: [150, 30, 90, 45, 60],
    },
  ],
}

const chartOptions = {
  indexAxis: "y",
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: "Distribuição de Tempo Diário" },
  },
  scales: { x: { beginAtZero: true } },
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 600px;
  margin: auto;
}
</style>
