<template>
  <v-container class="dashboard-view-container">
    <LineChart title="Sales" :labels="salesData.labels" :values="salesData.values" />

    <BarChart class="mt-4" title="Expense" :labels="expenseData.labels" :values="expenseData.values" />
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

const expenseData = computed(() => {
  return {
    labels: mockChartsData.expenseData.map(salesItem => salesItem.category),
    values: mockChartsData.expenseData.map(salesItem => salesItem.amount),
  }
});
</script>

<style scoped>
.dashboard-view-container {
  max-width: 1600px;
}
</style>
