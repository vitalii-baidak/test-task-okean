<template>
  <v-container>
    <LineChart />

    <div class="mt-3">
      <BarChart />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import BarChart from '@/components/BarChart.vue';
import LineChart from '@/components/LineChart.vue';
</script>
