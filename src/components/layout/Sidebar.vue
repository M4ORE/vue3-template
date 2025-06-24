<template>
  <v-navigation-drawer
    v-model="drawerModel"
    :permanent="!isMobile"
    :temporary="isMobile"
    :rail="!isMobile && rail"
    :width="drawerWidth"
    :expand-on-hover="!isMobile && expandOnHover"
    color="black"
    style="position: fixed"
  >
    <div
      class="d-flex align-center justify-center pt-6 pb-4"
      style="cursor: pointer"
      @click="handleLogoClick"
    >
      <template v-if="!isMobile">
        <!-- <v-avatar
          color="grey-darken-4"
          size="44"
          rounded="lg"
          class="d-flex align-center justify-center"
        > -->
        <v-img
          :src="currentLogo"
          alt="Logo"
          contain
          class="mobile-logo"
        ></v-img>
        <!-- </v-avatar> -->
      </template>
      <template v-else>
        <v-img :src="currentLogo" alt="Logo" contain class="web-logo"></v-img>
      </template>
    </div>

    <v-divider class="my-2"></v-divider>

    <v-list nav density="compact">
      <!-- 根據使用者角色動態渲染選單項目 -->
      <template v-for="(item, index) in filteredMenuItems" :key="index">
        <v-tooltip
          :text="item.label"
          location="right"
          :disabled="isMobile || !rail"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="item.icon"
              :value="item.value"
              :to="item.to"
              :title="item.label"
              color="primary"
              class="mb-1"
              rounded
            ></v-list-item>
          </template>
        </v-tooltip>
      </template>
    </v-list>

    <template v-slot:append>
      <v-divider></v-divider>
      <div class="pa-2">
        <v-tooltip
          text="登出系統"
          location="right"
          :disabled="isMobile || !rail"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-logout"
              title="登出"
              value="logout"
              @click="handleLogout"
              color="error"
              rounded
            ></v-list-item>
          </template>
        </v-tooltip>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import { useAuthStore } from "@/stores/auth/authStore";
import logoImage from "@/assets/logo3.png";
import logoImageWeb from "@/assets/m@2x.png";

const router = useRouter();
const { mobile, mdAndUp } = useDisplay();
const authStore = useAuthStore();

// 導航抽屜狀態
const drawerModel = ref(true);
const rail = ref(true);
const expandOnHover = ref(true);

// 計算抽屜寬度
const drawerWidth = computed(() => {
  if (isMobile.value) return 240;
  return rail.value ? 56 : 240;
});

// 判斷是否為移動設備
const isMobile = computed(() => mobile.value);

// 根據裝置類型選擇適合的Logo
const currentLogo = computed(() => {
  return isMobile.value ? logoImage : logoImageWeb;
});

// 監視螢幕大小變化 - 修改這部分以避免循環更新
watch(
  mobile,
  (newValue) => {
    // 避免在每次更新時都改變 drawerModel，只在初始化或真正變化時更新
    if (drawerModel.value === newValue) {
      drawerModel.value = !newValue; // 在手機上預設隱藏抽屜
    }
    rail.value = !newValue; // 在手機上禁用精簡模式
  },
  { immediate: true }
);

// 設置 drawer 的 getter 和 setter，供父組件使用
const drawer = computed({
  get: () => drawerModel.value,
  set: (value) => {
    // 避免無意義的更新
    if (drawerModel.value !== value) {
      drawerModel.value = value;
    }
  },
});

// 定義menu
const allMenuItems = ref([
  {
    icon: "mdi-home",
    to: "/home",
    label: "首頁",
    roles: ["user"],
  },
  {
    icon: "mdi-information",
    to: "/about",
    label: "關於",
    roles: ["user"],
  },
  {
    icon: "mdi-chart-line",
    to: "/dashboard",
    label: "儀表板",
    roles: ["user"],
  },
]);

// 當前使用者角色
const userRole = ref("admin");

// 根據角色過濾選單項目
const filteredMenuItems = computed(() => {
  // 未來可以根據真實使用者角色進行過濾
  return allMenuItems.value;

  // 當認證系統準備好後，可以使用以下代碼：
  // return allMenuItems.value.filter(item => {
  //   return item.roles.includes(userRole.value);
  // });
});

// 登出處理
const handleLogout = async () => {
  authStore.logout();
};

// 點擊Logo處理
const handleLogoClick = () => {
  router.push("/home");
};

// 暴露 drawer 屬性給父組件使用
defineExpose({
  drawer,
  toggleDrawer: () => {
    drawerModel.value = !drawerModel.value;
  },
});
</script>

<style scoped>
.sidebar-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.v-tooltip > ::v-deep(.v-overlay__content) {
  background: #303030;
  color: white;
}

/* Logo大小樣式 */
.mobile-logo {
  width: 36px !important;
  height: 36px !important;
}

.web-logo {
  width: 30px !important;
  height: 30px !important;
}
</style>
