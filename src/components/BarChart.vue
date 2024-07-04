<template>
  <v-card :loading="loading">
    <v-card-text>
      <p class="text-body-1 text-center mb-3">
        {{ loading ? 'Loading...' : title }}
      </p>

      <div>
        <Bar :data="chartData" :options="chartConfig" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTheme } from 'vuetify';

import { Bar } from 'vue-chartjs';
import { Chart, Title, Tooltip, BarElement, CategoryScale, LinearScale } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

// Props

export type BarChartPoint = {
  label: string;
  value: number;
};

const props = defineProps<{
  data: BarChartPoint[];
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
    labels: labels,
    datasets: [{
      data: values,
      backgroundColor: theme.global.current.value.colors.primary,
    }]
  }
});
</script>
