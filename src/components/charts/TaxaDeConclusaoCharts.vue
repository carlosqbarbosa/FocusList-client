<template>
  <div class="chart-container">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Doughnut } from "vue-chartjs"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const chartData = {
  labels: ["Concluídas", "Pendentes"],
  datasets: [
    {
      backgroundColor: ["#6366F1", "#242673"],
      data: [75, 25],
    },
  ],
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" },
    title: { display: true, text: "Taxa de Conclusão de Tarefas" },
  },
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 300px;
  margin: auto;
}
</style>
