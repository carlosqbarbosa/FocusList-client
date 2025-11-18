<template>
  <div class="chart-container">
    <h3 class="title">Produtividade Diária (Heatmap)</h3>
    <div class="grid">
      <div
        v-for="(value, index) in data"
        :key="index"
        class="cell"
        :style="{
          backgroundColor: getColor(value),
        }"
        :title="`Dia ${index + 1}: ${value} sessões de foco`"
      >
        {{ index + 1 }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const data = Array.from({ length: 30 }, () => Math.floor(Math.random() * 6))

const getColor = (value: number) => {
  const colors = ["#E5E7EB", "#C7D2FE", "#A5B4FC", "#818CF8", "#6366F1", "#4F46E5"]
  return colors[value] || "#E5E7EB"
}
</script>

<style scoped>
.chart-container {
  background: white; 
  padding: 20px;
  border-radius: 16px;
}
.title {
  font-weight: 600;
  margin-bottom: 16px;
  color: #111827;
}
.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}
.cell {
  width: 40px;
  height: 40px;
  font-size: 12px;
  color: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: transform 0.2s ease, background-color 0.3s ease;
}
.cell:hover {
  transform: scale(1.05);
}
</style>
