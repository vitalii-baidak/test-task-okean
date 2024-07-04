<template>
  <v-select v-model="model" hide-details label="Sorting" density="comfortable" :items="['None', 'Ascending', 'Descending']" />
</template>

<script setup lang="ts">
export type SortVariants = 'None' | 'Ascending' | 'Descending';

const model = defineModel<SortVariants>()
</script>
