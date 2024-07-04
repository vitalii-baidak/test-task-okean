<template>
  <v-card>
    <v-card-text>
      <p class="text-body-1 text-center mb-3">
        {{ title }}
      </p>

      <div>
        <Bar :data="chartData" :options="chartConfig" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { Bar } from 'vue-chartjs';
import { Chart, Title, Tooltip, BarElement, CategoryScale, LinearScale } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

// Props

const props = defineProps<{
  title: string
  labels: string[]
  values: number[]
}>();

// Chart

const chartConfig = {
  responsive: true,
  maintainAspectRatio: false
};

const chartData = computed(() => {
  return {
    labels: props.labels,
    datasets: [{
      data: props.values,
      backgroundColor: 'rgb(75, 192, 192)',
    }]
  }
});
</script>
