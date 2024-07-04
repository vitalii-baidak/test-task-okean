<template>
  <v-container class="dashboard-view-container">
    <LineChart title="Sales" :labels="salesData.labels" :values="salesData.values" />

    <div class="mt-3">
      <BarChart />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import mockChartsData from '@/shared/mockChartsData.json';

import BarChart from '@/components/BarChart.vue';
import LineChart from '@/components/LineChart.vue';

// Charts data

const salesData = computed(() => {
  return {
    labels: mockChartsData.salesData.map(salesItem => salesItem.month),
    values: mockChartsData.salesData.map(salesItem => salesItem.sales),
  }
});
</script>

<style scoped>
.dashboard-view-container {
  max-width: 1600px;
}
</style>
