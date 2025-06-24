<template>
  <v-card class="mb-4 pa-3 px-4 rounded-lg glassmorphism-card">
    <v-row>
      <slot></slot>
    </v-row>
    <v-row class="align-end">
      <v-spacer></v-spacer>
      <v-col cols="6" md="3" v-if="showClearButton" class="d-flex align-center">
        <v-btn variant="outlined" color="grey" class="rounded-lg" block @click="$emit('clear')" :disabled="!hasFilters">
          清除全部條件
        </v-btn>
      </v-col>
      <v-col cols="6" md="3" class="d-flex align-center">
        <v-btn color="primary" class="rounded-lg" block @click="$emit('search')" :loading="loading" :disabled="loading">
          搜尋
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  searchButtonCols: {
    type: [Number, String],
    default: 3
  },
  clearButtonCols: {
    type: [Number, String],
    default: 3
  },
  showClearButton: {
    type: Boolean,
    default: true
  },
  hasFilters: {
    type: Boolean,
    default: false
  }
});

defineEmits(['search', 'clear']);
</script>