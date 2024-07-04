<template>
  <v-card :loading="loading">
    <v-card-text>
      <div class="d-flex justify-space-between align-center mb-4">
        <p class="text-h5 text-center">
          {{ loading ? 'Loading...' : title }}
        </p>

        <div>
          <SelectSortType v-model="sortValue" />
        </div>
      </div>

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
import { useTheme } from 'vuetify';
import { computed, ref } from 'vue';
import { sortObjectDataByKey } from "@/composables/sortObjectDataByKey";

import { Line } from 'vue-chartjs';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';

import SelectSortType, { SortVariants } from './SelectSortType.vue';

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

// Data sorting

const sortValue = ref<SortVariants>('None');

const sortedData = computed(() => {
  if (sortValue.value === 'Ascending') {
    return sortObjectDataByKey(props.data, 'value', 'asc')
  }

  if (sortValue.value === 'Descending') {
    return sortObjectDataByKey(props.data, 'value', 'desc')
  }

  return props.data;
});

// Chart data

const theme = useTheme();

const chartConfig = {
  responsive: true,
  maintainAspectRatio: false
};

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
