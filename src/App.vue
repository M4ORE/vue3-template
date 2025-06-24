<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  document.title = "Vue3 Template";
});
</script>
