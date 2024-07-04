<template>
  <v-container class="dashboard-view-container">
    <LineChart
      title="Sales"
      :labels="salesData.labels"
      :values="salesData.values"
      :loading="isSalesDataLoading"
    />

    <BarChart
      class="mt-4"
      title="Expense"
      :labels="expenseData.labels"
      :values="expenseData.values"
      :loading="isExpenseDataLoading"
    />
  </v-container>
</template>

<script setup lang="ts">
import MockApiService from "@/shared/MockApiService";

import { ref, onBeforeMount } from 'vue';
import { SalesList, ExpenseList } from "@/shared/MockApiService.types";

import BarChart from '@/components/BarChart.vue';
import LineChart from '@/components/LineChart.vue';

// Fetch sales data

onBeforeMount(fetchSalesData);

const isSalesDataLoading = ref<boolean>(false);

const salesData = ref<{ labels: string[]; values: number[] }>({
  labels: [],
  values: []
});

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
  salesData.value.labels = salesList.map(salesItem => salesItem.month);
  salesData.value.values = salesList.map(salesItem => salesItem.sales);
}

// Fetch expense data

onBeforeMount(fetchExpenseData);

const isExpenseDataLoading = ref<boolean>(false);

const expenseData = ref<{ labels: string[]; values: number[] }>({
  labels: [],
  values: []
});

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

function setExpenseData(salesList: ExpenseList) {
  expenseData.value.labels = salesList.map(salesItem => salesItem.category);
  expenseData.value.values = salesList.map(salesItem => salesItem.amount);
}
</script>

<style scoped>
.dashboard-view-container {
  max-width: 1600px;
}
</style>
