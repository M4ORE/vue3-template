<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-6">儀表板</h1>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col cols="12" md="6" lg="3" v-for="stat in stats" :key="stat.title">
        <v-card>
          <v-card-text>
            <div class="d-flex justify-space-between">
              <div>
                <div class="text-h6">{{ stat.value }}</div>
                <div class="text-caption text-grey">{{ stat.title }}</div>
              </div>
              <v-icon :color="stat.color" size="large">{{ stat.icon }}</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>圖表範例</v-card-title>
          <v-card-text>
            <div class="chart-placeholder">
              <v-icon size="64" color="grey-lighten-2">mdi-chart-line</v-icon>
              <div class="text-caption text-grey mt-2">在此處放置您的圖表</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>最近活動</v-card-title>
          <v-card-text>
            <v-list density="compact">
              <v-list-item v-for="activity in activities" :key="activity.id">
                <v-list-item-title>{{ activity.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ activity.time }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const stats = ref([
  {
    title: '總用戶數',
    value: '1,234',
    icon: 'mdi-account-group',
    color: 'primary'
  },
  {
    title: '今日訪問',
    value: '567',
    icon: 'mdi-chart-line',
    color: 'success'
  },
  {
    title: '新增項目',
    value: '89',
    icon: 'mdi-plus-circle',
    color: 'info'
  },
  {
    title: '待處理',
    value: '12',
    icon: 'mdi-clock-outline',
    color: 'warning'
  }
]);

const activities = ref([
  { id: 1, title: '用戶註冊', time: '2 分鐘前' },
  { id: 2, title: '數據更新', time: '5 分鐘前' },
  { id: 3, title: '系統備份', time: '10 分鐘前' },
  { id: 4, title: '報告生成', time: '15 分鐘前' },
]);
</script>

<style scoped>
.chart-placeholder {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
}
</style>