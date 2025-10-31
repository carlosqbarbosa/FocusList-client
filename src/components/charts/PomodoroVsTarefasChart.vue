<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { Line } from "vue-chartjs"
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
  ChartData,
  ChartOptions,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const chartData: ChartData<"line"> = {
  labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5"],
  datasets: [
    {
      label: "Horas focadas acumuladas",
      data: [5, 12, 20, 28, 37],
      fill: true,
      backgroundColor: (ctx) => {
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

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" as const },
    title: { display: true, text: "Histórico de Foco Acumulado" },
  },
  scales: { y: { beginAtZero: true } },
}
</script>
