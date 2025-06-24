<!-- src/layouts/MainLayout.vue -->
<template>
  <v-app>
    <!-- 側邊欄組件 -->
    <sidebar ref="sidebarRef" @logout="handleLogout" />
    <!-- 頂部搜索欄 -->
    <topbar
      @toggle-drawer="toggleDrawer"
      :userName="userDisplayName"
      @logout="handleLogout"
    />

    <!-- 主內容區 -->
    <v-main>
      <!-- 主內容 -->
      <div fluid class="main-background fill-height">
        <slot></slot>
      </div>
    </v-main>

    <!-- 提示訊息 -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>
  </v-app>
</template>

<script setup>
// 引入組件
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth/authStore.js";
import Sidebar from "./Sidebar.vue";
import Topbar from "./Topbar.vue";

const router = useRouter();
const sidebarRef = ref(null);
const authStore = useAuthStore();

// 提示訊息
const snackbar = ref({
  show: false,
  text: "",
  color: "success",
});

// 使用computed屬性從authStore直接獲取使用者名稱
const userDisplayName = computed(() => {
  return authStore.user?.name || authStore.user?.username || "訪客";
});

// 切換抽屜狀態的方法
const toggleDrawer = () => {
  if (sidebarRef.value) {
    sidebarRef.value.toggleDrawer();
  }
};

// 在MainLayout.vue中，優化handleLogout方法
const handleLogout = async () => {
  try {
    // 可以先顯示載入中狀態
    const loadingId = showLoading("正在登出...");

    // 調用authStore的登出方法
    await authStore.logout();

    // 清除載入狀態
    hideLoading(loadingId);

    // 驗證清除是否成功
    if (localStorage.getItem("token") || localStorage.getItem("user")) {
      throw new Error("本地存儲清除失敗");
    }

    // 顯示成功訊息
    showMessage("已成功登出系統", "success");

    // 導航到首頁前，可以先清除路由歷史，防止使用者按"後退"回到需要認證的頁面
    router.replace("/");
  } catch (error) {
    console.error("登出過程中發生錯誤:", error);

    // 如果發生錯誤，強制清除本地存儲
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    showMessage("登出過程中發生錯誤，但已清除本地登入狀態", "warning");

    // 仍然導航到首頁
    router.replace("/");
  }
};

// 這是一個簡單的loading管理器示例，實際中可能已有更好的解決方案
let loadingIds = 0;
function showLoading(message) {
  const id = ++loadingIds;
  // 顯示loading，實際實現依賴UI框架
  return id;
}

function hideLoading(id) {
  // 隱藏特定id的loading
}

// 顯示提示訊息
const showMessage = (text, color = "success") => {
  snackbar.value = {
    show: true,
    text,
    color,
  };
};
</script>

<style>
.main-background {
  /* 灰黃漸層 由左上斜至向下 */
  background: linear-gradient(
    to bottom right,
    #e3e4e8,
    #e8e8e8,
    #fdf9e7,
    #fff4d7
  );
}

/* 確保最小高度填滿整個螢幕 */
.fill-height {
  min-height: calc(100vh - 64px); /* 減去app-bar的高度 */
}

/* 確保v-container填滿v-main的空間 */
.v-main .v-container {
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}
</style>
