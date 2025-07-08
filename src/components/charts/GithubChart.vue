<template>
  <div class="bg-white rounded-2xl p-6 shadow-md">
    <h3 class="text-md font-semibold mb-2">Tarefas por mês</h3>
    <p class="text-xs text-gray-500 mb-4">263 tarefas no ano passado</p>
    <div ref="calEl" class="w-full h-48"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';
import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css';

const cal = new CalHeatmap();
const calEl = ref(null);

onMounted(async () => {
  await nextTick();

  const observer = new IntersectionObserver(
    async ([entry]) => {
      if (entry.isIntersecting) {
        try {
          await cal.paint({
            itemSelector: calEl.value,
            range: 12,
            domain: { type: 'month', gutter: 4 },
            subDomain: { type: 'day', radius: 2, width: 12, height: 12 },
            date: { start: new Date() },
            data: {
              source: async () => {
                return {
                  [new Date().toISOString().split('T')[0]]: 5,
                };
              },
              x: 'date',
              y: 'value',
            },
            scale: {
              color: {
                type: 'linear',
                domain: [0, 10],
                range: ['#e0e0e0', '#3b82f6'],
              },
            },
          });
        } catch (err) {
          console.error('Erro ao pintar CalHeatmap:', err);
        } finally {
          observer.disconnect();
        }
      }
    },
    { threshold: 0.1 }
  );

  if (calEl.value) observer.observe(calEl.value);
});
</script>


