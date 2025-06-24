<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="mx-auto" max-width="400">
          <v-card-title class="text-h4 text-center py-6">
            Vue3 Template
          </v-card-title>
          <v-card-subtitle class="text-center">
            請輸入您的登入資訊
          </v-card-subtitle>
          <v-card-text>
            <v-form @submit.prevent="handleLogin" ref="form" v-model="valid">
              <v-text-field
                v-model="credentials.email"
                label="電子郵件"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                :rules="emailRules"
                required
              ></v-text-field>
              
              <v-text-field
                v-model="credentials.password"
                label="密碼"
                prepend-inner-icon="mdi-lock"
                :type="showPassword ? 'text' : 'password'"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showPassword = !showPassword"
                variant="outlined"
                :rules="passwordRules"
                required
              ></v-text-field>

              <v-alert
                v-if="authStore.loginError"
                type="error"
                class="mb-4"
                :text="authStore.loginError"
              ></v-alert>

              <v-btn
                type="submit"
                color="primary"
                :loading="authStore.isLoading"
                :disabled="!valid"
                block
                size="large"
              >
                登入
              </v-btn>

              <div class="text-center mt-4">
                <small class="text-grey">
                  測試帳號：任何有效的電子郵件格式即可
                </small>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth/authStore';

const authStore = useAuthStore();

const valid = ref(false);
const showPassword = ref(false);
const form = ref(null);

const credentials = ref({
  email: '',
  password: ''
});

const emailRules = [
  v => !!v || '請輸入電子郵件',
  v => /.+@.+\..+/.test(v) || '請輸入有效的電子郵件'
];

const passwordRules = [
  v => !!v || '請輸入密碼',
  v => v.length >= 6 || '密碼至少需要 6 個字符'
];

const handleLogin = async () => {
  if (valid.value) {
    await authStore.login(credentials.value);
  }
};
</script>
