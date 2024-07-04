<template>
  <v-card :loading="loading">
    <v-card-text>
      <p class="text-body-1 text-center mb-3">
        {{ loading ? 'Loading...' : title }}
      </p>

      <div>
        <Line
          :data="chartData"
          :options="chartConfig"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from 'vuetify';

import { Line } from 'vue-chartjs';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip );

// Props

export type LineChartPoint = {
  label: string;
  value: number;
};

const props = defineProps<{
  data: LineChartPoint[];
  title: string;
  loading?: boolean;
}>();

// Chart

const theme = useTheme();

const chartConfig = {
  responsive: true,
  maintainAspectRatio: false
};

const sortedData = computed(() => {
  return props.data;
})

const chartData = computed(() => {
  const labels = sortedData.value.map(item => item.label);
  const values = sortedData.value.map(item => item.value);

  return {
    labels,
    datasets: [{
      data: values,
      tension: 0.1,
      borderColor: theme.global.current.value.colors.primary,
    }]
  }
});
</script>
