<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="text-center">
          <h1 class="text-h3 font-weight-bold mb-4">歡迎使用 Vue3 Template</h1>
          <p class="text-h6 text-grey-darken-1 mb-8">
            一個基於 Vue 3 + Vuetify 3 + Pinia 的現代化前端腳手架
          </p>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-card class="mx-auto" max-width="400">
          <v-card-title class="text-h5">
            <v-icon class="me-2" color="primary">mdi-lightning-bolt</v-icon>
            快速開始
          </v-card-title>
          <v-card-text>
            <p>開始使用這個模板來建立您的專案。</p>
            <v-btn color="primary" variant="elevated" to="/about">
              了解更多
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="mx-auto" max-width="400">
          <v-card-title class="text-h5">
            <v-icon class="me-2" color="success">mdi-chart-line</v-icon>
            儀表板
          </v-card-title>
          <v-card-text>
            <p>查看需要登入的儀表板範例頁面。</p>
            <v-btn color="success" variant="elevated" to="/dashboard">
              查看儀表板
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="mx-auto" max-width="400">
          <v-card-title class="text-h5">
            <v-icon class="me-2" color="info">mdi-account-circle</v-icon>
            登入系統
          </v-card-title>
          <v-card-text>
            <p>測試基本的認證功能。</p>
            <v-btn color="info" variant="elevated" to="/login">
              前往登入
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h5">
            <v-icon class="me-2" color="primary">mdi-information</v-icon>
            使用說明
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>🔧 修改主題</v-list-item-title>
                <v-list-item-subtitle>
                  編輯 src/plugins/vuetify.js 來自訂主題配色
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>🏗️ 新增頁面</v-list-item-title>
                <v-list-item-subtitle>
                  在 src/views/ 建立新的頁面組件並更新路由
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>💾 狀態管理</v-list-item-title>
                <v-list-item-subtitle>
                  使用 Pinia stores 來管理應用程式狀態
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>🎨 組件庫</v-list-item-title>
                <v-list-item-subtitle>
                  充分利用 Vuetify 3 的豐富組件
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAppStore } from '@/stores/appStore';

const appStore = useAppStore();
</script>
