<template>
  <div class="flex bg-gray-100 min-h-screen">
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <TheHeader />

      <main class="flex-1 p-8 overflow-y-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">
          Olá, <span class="text-indigo-600">Camila 👋</span>
        </h1>

        <div
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-fade-in"
        >
          <!-- Primeira linha -->
          <!--<div class="card"><TarefasConcluidasPorMesChart /></div> -->
          <!--<div class="card"><HorasFocadasPorMesChart /></div>-->
         <!-- <div class="card"><TaxaConclusaoDoughnut /></div> -->

          <!-- Segunda linha -->
          <div class="card md:col-span-2"><PomodoroVsTarefasChart /></div>
          <!--<div class="card"><DesempenhoSemanalRadar /></div>-->

          <!-- Terceira linha -->
          <!--<div class="card md:col-span-2"><HistoricoFocoAcumuladoChart /></div> -->
          <div class="card"><ProdutividadeDiariaHeatmap /></div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/layout/Sidebar.vue";
import TheHeader from "../components/layout/TheHeader.vue";
//import TarefasConcluidasPorMesChart from "../components/charts/TarefasConcluidasPorMesCharts.vue";
//import HorasFocadasPorMesChart from "../components/charts/HorasFocadasPorMesChart.vue";
import ProdutividadeDiariaHeatmap from "../components/charts/ProdutividadeDiariaHeatmap.vue";
import PomodoroVsTarefasChart from "../components/charts/PomodoroVsTarefasChart.vue";
//import HistoricoFocoAcumuladoChart from "../components/charts/HistoricoFocoAcumuladoChart.vue";
//import DesempenhoSemanalRadar from "../components/charts/DesempenhoSemanalRadar.vue";
//import TaxaConclusaoDoughnut from "../components/charts/TaxaConclusaoDoughnut.vue";
</script>

<style scoped>
.card {
  @apply bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}
</style>


