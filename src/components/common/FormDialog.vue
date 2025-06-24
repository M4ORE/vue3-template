<template>
    <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" :max-width="width"
        persistent scrollable>
        <v-card class="rounded-lg">
            <v-card-title class="text-h5 pa-4 bg-primary text-secondary font-weight-bold">
                {{ title }}
            </v-card-title>
            <v-card-text class="pa-4">
                <v-form ref="formRef" v-model="isValid" @submit.prevent="save">
                    <slot :isValid="isValid"></slot>
                </v-form>
            </v-card-text>
            <v-card-actions class="pa-4">
                <v-btn variant="outlined" @click="cancel" color="secondary">
                    取消
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="save" :loading="loading" :disabled="!isValid"
                    class="ml-2 text-secondary font-weight-medium">
                    儲存
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- 取消確認對話框 -->
    <confirm-dialog :model-value="cancelConfirmationOpen" @update:model-value="cancelConfirmationOpen = $event"
        title="確認取消" message="確定要取消嗎？已填資料將不會儲存。" confirm-text="確定取消" confirm-color="error" cancel-text="返回編輯"
        type="warning" @confirm="confirmCancel"></confirm-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import ConfirmDialog from './ConfirmDialog.vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    width: {
        type: [Number, String],
        default: 600
    },
    loading: {
        type: Boolean,
        default: false
    },
    initialValid: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue', 'save', 'cancel']);

const isValid = ref(props.initialValid);
const formRef = ref(null);
const cancelConfirmationOpen = ref(false);

watch(() => props.initialValid, (newVal) => {
    isValid.value = newVal;
});

const save = () => {
    if (!isValid.value) return;
    emit('save');
};

const cancel = () => {
    cancelConfirmationOpen.value = true;
};

const confirmCancel = () => {
    cancelConfirmationOpen.value = false;
    emit('update:modelValue', false);
    emit('cancel');
};
</script>
