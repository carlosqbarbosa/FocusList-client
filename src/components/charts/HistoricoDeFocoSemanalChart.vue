<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Line } from "vue-chartjs"
import type { ChartOptions } from "chart.js"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const chartData = {
  labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5"],
  datasets: [
    {
      label: "Horas focadas acumuladas",
      data: [5, 12, 20, 28, 37],
      fill: true,
      backgroundColor: (ctx: any) => {
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400)
        gradient.addColorStop(0, "rgba(99, 102, 241, 0.3)")
        gradient.addColorStop(1, "rgba(99, 102, 241, 0)")
        return gradient
      },
      borderColor: "#6366F1",
      borderWidth: 3,
      tension: 0.4,
      pointBackgroundColor: "#4F46E5",
      pointRadius: 5,
    },
  ],
}
const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" },
    title: { display: true, text: "Histórico de Foco Acumulado" },
  },
  scales: { y: { beginAtZero: true } },
}

</script>

<style scoped>
.chart-container {
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  max-width: 700px;
  margin: auto;
}
</style>
