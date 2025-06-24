<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h4 text-center">
            關於 Vue3 Template
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <h3 class="text-h6 mb-3">技術堆疊</h3>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>Vue 3</v-list-item-title>
                    <v-list-item-subtitle>Composition API</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Vuetify 3</v-list-item-title>
                    <v-list-item-subtitle>Material Design Components</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Pinia</v-list-item-title>
                    <v-list-item-subtitle>State Management</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Vue Router</v-list-item-title>
                    <v-list-item-subtitle>Client-side Routing</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Vite</v-list-item-title>
                    <v-list-item-subtitle>Build Tool</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12" md="6">
                <h3 class="text-h6 mb-3">功能特色</h3>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>響應式佈局</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>自訂主題</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>路由守衛</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>狀態管理</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>模組化架構</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
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