<template>
  <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" :max-width="width">
    <v-card>
      <v-card-title class="text-h5" :style="{ background: headerColor }">
        {{ title }}
      </v-card-title>
      <v-card-text class="pa-4">
        <slot>{{ message }}</slot>
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-btn variant="text" @click="cancel">{{ cancelText }}</v-btn>
        <v-spacer></v-spacer>
        <v-btn :color="confirmColor" @click="confirm" :loading="loading">
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: '確認'
  },
  message: {
    type: String,
    default: '確定要執行此操作嗎？'
  },
  confirmText: {
    type: String,
    default: '確定'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  confirmColor: {
    type: String,
    default: 'primary'
  },
  width: {
    type: [Number, String],
    default: 400
  },
  loading: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'default' // 'default', 'delete', 'warning'
  }
});

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);

const headerColor = computed(() => {
  if (props.type === 'delete') return '#ffebee';
  if (props.type === 'warning') return '#FFF3E0';
  return '#f5f5f5';
});

const confirm = () => {
  emit('confirm');
};

const cancel = () => {
  emit('update:modelValue', false);
  emit('cancel');
};
</script>
