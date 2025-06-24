<!-- src/layouts/LayoutManager.vue -->
<template>
    <component :is="layout">
      <router-view />
    </component>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import MainLayout from './MainLayout.vue';
  import BlankLayout from './BlankLayout.vue';
  
  const route = useRoute();
  
  // 根據路由元資訊決定使用哪種佈局
  const layout = computed(() => {
    const layoutName = route.meta.layout || 'default';
    switch (layoutName) {
      case 'blank':
        return BlankLayout;
      default:
        return MainLayout;
    }
  });
  </script>