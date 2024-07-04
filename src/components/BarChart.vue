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
        <Bar :data="chartData" :options="chartConfig" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';
import { ref, computed } from "vue";
import { sortObjectDataByKey } from "@/composables/sortObjectDataByKey";

import { Bar } from 'vue-chartjs';
import { Chart, Title, Tooltip, BarElement, CategoryScale, LinearScale } from 'chart.js';

import SelectSortType, { SortVariants } from './SelectSortType.vue';

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

// Data sorting

const sortValue = ref<SortVariants>('None');

const sortedData = computed<BarChartPoint[]>(() => {
  if (sortValue.value === 'Ascending') {
    return sortObjectDataByKey(props.data, 'value', 'asc')
  }

  if (sortValue.value === 'Descending') {
    return sortObjectDataByKey(props.data, 'value', 'desc')
  }

  return props.data;
})

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
    labels: labels,
    datasets: [{
      data: values,
      backgroundColor: theme.global.current.value.colors.primary,
    }]
  }
});
</script>
