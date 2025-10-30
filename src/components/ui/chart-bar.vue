<script setup lang="ts">
import {
  BarChart as ReBarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  index: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  yFormatter: {
    type: Function,
    default: (value: number) => value,
  },
  customTooltip: {
    type: Object,
    default: null,
  },
});
</script>

<template>
  <div class="w-full h-80">
    <ResponsiveContainer width="100%" height="100%">
      <ReBarChart :data="data">
        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
        <XAxis :dataKey="index" />
        <YAxis :tickFormatter="yFormatter" />
        <Tooltip :content="customTooltip ? h(customTooltip) : undefined" />
        <Legend />
        <Bar
          v-for="(cat, i) in categories"
          :key="i"
          :dataKey="cat"
          :fill="i === 0 ? '#4f46e5' : '#22c55e'"
          :radius="[6, 6, 0, 0]"
        />
      </ReBarChart>
    </ResponsiveContainer>
  </div>
</template>

<style scoped>
.w-full {
  width: 100%;
}
.h-80 {
  height: 20rem;
}
</style>
