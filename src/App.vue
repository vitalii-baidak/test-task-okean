<template>
  <!--
    TODO: Add to readme file next info:
      1. How to start project with npm
      2. How to start project with docker
      3. Vuetify components auto imported
  -->

  <v-app>
    <v-main>
      <DashboardView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import DashboardView from "@/views/DashboardView.vue";
</script>
