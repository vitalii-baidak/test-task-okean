<template>
  <v-card>
    <v-card-text>
      <p class="text-body-1 text-center mb-3">
        {{ title }}
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

const props = defineProps<{
  title: string
  labels: string[]
  values: number[]
}>();

// Chart

const theme = useTheme();

const chartConfig = {
  responsive: true,
  maintainAspectRatio: false
};

const chartData = computed(() => {
  return {
    labels: props.labels,
    datasets: [{
      data: props.values,
      tension: 0.1,
      borderColor: theme.global.current.value.colors.primary,
    }]
  }
});
</script>
