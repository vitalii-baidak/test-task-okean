<template>
  <div class="d-flex justify-space-between align-center mb-4">
    <p class="text-h5 text-center">
      {{ title }}
    </p>

    <div>
      <v-select v-model="model" hide-details label="Sorting" density="comfortable" :items="['None', 'Ascending', 'Descending']" />
    </div>
  </div>
</template>

<script setup lang="ts">
export type SortVariants = 'None' | 'Ascending' | 'Descending';

// Props

defineProps<{
  title: string
}>();

// Model value

const model = defineModel<SortVariants>()
</script>
