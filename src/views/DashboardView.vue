<template>
  <v-container class="dashboard-view-container">
    <LineChart
      title="Sales"
      :data="salesData"
      :loading="isSalesDataLoading"
    />

    <BarChart
      class="mt-4"
      title="Expense"
      :data="expenseData"
      :loading="isExpenseDataLoading"
    />
  </v-container>
</template>

<script setup lang="ts">
import MockApiService from "@/shared/MockApiService";

import { ref, onBeforeMount } from 'vue';
import { SalesList, ExpenseList } from "@/shared/MockApiService.types";

import BarChart, { BarChartPoint } from '@/components/BarChart.vue';
import LineChart, { LineChartPoint } from '@/components/LineChart.vue';

// Fetch sales data

onBeforeMount(fetchSalesData);

const salesData = ref<LineChartPoint[]>([]);
const isSalesDataLoading = ref<boolean>(false);

async function fetchSalesData() {
  isSalesDataLoading.value = true;

  await MockApiService.fetchSalesData()
    .then(salesData => {
      setSalesData(salesData);
    })
    .catch(error => {
      console.log(error.message);
    });

  isSalesDataLoading.value = false;
}

function setSalesData(salesList: SalesList) {
  salesData.value = salesList.map(salesItem => {
    return {
      label: salesItem.month,
      value: salesItem.sales,
    }
  })
}

// Fetch expense data

onBeforeMount(fetchExpenseData);

const expenseData = ref<BarChartPoint[]>([]);
const isExpenseDataLoading = ref<boolean>(false);

async function fetchExpenseData() {
  isExpenseDataLoading.value = true;

  await MockApiService.fetchExpenseData()
    .then(expenseData => {
      setExpenseData(expenseData);
    })
    .catch(error => {
      console.log(error.message);
    });

  isExpenseDataLoading.value = false;
}

function setExpenseData(expenseList: ExpenseList) {
  expenseData.value = expenseList.map(expenseItem => {
    return {
      label: expenseItem.category,
      value: expenseItem.amount,
    }
  })
}
</script>

<style scoped>
.dashboard-view-container {
  max-width: 1600px;
}
</style>
