<template>
  <div class="chart-container">
    <Radar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Radar } from "vue-chartjs"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js"

ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler)

const chartData = {
  labels: ["Foco", "Pontualidade", "Descanso", "Produtividade", "Consistência"],
  datasets: [
    {
      label: "Desempenho Semanal",
      backgroundColor: "rgba(99,102,241,0.2)",
      borderColor: "#6366F1",
      pointBackgroundColor: "#6366F1",
      data: [85, 70, 65, 90, 80],
    },
  ],
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" },
    title: { display: true, text: "Desempenho Semanal" },
  },
  scales: {
    r: { beginAtZero: true, max: 100 },
  },
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 500px;
  margin: auto;
}
</style>
