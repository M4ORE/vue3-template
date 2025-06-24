<template>
  <v-app-bar
    flat
    density="comfortable"
    color="white"
    elevation="1"
    style="position: fixed"
  >
    <!-- 漢堡選單按鈕，僅在手機版顯示 -->
    <v-app-bar-nav-icon
      v-if="isMobile"
      @click="toggleDrawer"
    ></v-app-bar-nav-icon>

    <!-- <v-text-field
      variant="solo"
      density="compact"
      prepend-inner-icon="mdi-magnify"
      placeholder="搜尋..."
      hide-details
      rounded
      flat
      class="ml-2 search-field"
      bg-color="grey-lighten-4"
      style="max-width: 300px"
    ></v-text-field> -->

    <v-spacer></v-spacer>

    <!-- <v-btn icon class="mr-2">
        <v-icon>mdi-bell</v-icon>
        <v-badge dot color="error" floating></v-badge>
      </v-btn> -->
    <p class="text-caption text-grey-darken-3 mx-4">版本號 v1.3.0</p>
    <v-menu offset-y location="bottom end">
      <template v-slot:activator="{ props }">
        <div
          class="d-flex align-center mr-2"
          v-bind="props"
          style="cursor: pointer"
        >
          <v-avatar color="amber" size="36">
            <span class="text-white pb-1">{{
              userName.charAt(0).toUpperCase()
            }}</span>
          </v-avatar>
          <span class="ml-2 user-name" v-if="!isMobileXs">{{ userName }}</span>
          <v-icon class="ml-1">mdi-chevron-down</v-icon>
        </div>
      </template>
      <v-list width="200">
        <v-list-item prepend-icon="mdi-account" title="個人資料"></v-list-item>
        <v-list-item
          prepend-icon="mdi-lock-reset"
          title="重設密碼"
          @click="openChangePasswordDialog"
        ></v-list-item>
        <!-- <v-list-item prepend-icon="mdi-cog" title="設定"></v-list-item> -->
        <v-divider></v-divider>
        <v-list-item
          prepend-icon="mdi-logout"
          title="登出"
          @click="handleLogout"
        ></v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>

  <!-- 使用共用 FormDialog 組件替換修改密碼對話框 -->
  <form-dialog
    v-model="changePasswordDialog"
    title="修改密碼"
    :loading="isLoading"
    :initial-valid="isFormValid"
    @save="changePassword"
    @cancel="resetForm"
  >
    <template v-slot:default="{ isValid }">
      <v-text-field
        v-model.trim="passwordData.currentPassword"
        :append-inner-icon="showCurrentPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showCurrentPassword ? 'text' : 'password'"
        label="當前密碼"
        variant="outlined"
        class="mb-3"
        :rules="[(v) => !!v || '請輸入當前密碼']"
        @click:append-inner="showCurrentPassword = !showCurrentPassword"
      ></v-text-field>

      <v-text-field
        v-model.trim="passwordData.newPassword"
        :append-inner-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showNewPassword ? 'text' : 'password'"
        label="新密碼"
        variant="outlined"
        class="mb-3"
        :rules="passwordRules"
        @click:append-inner="showNewPassword = !showNewPassword"
      ></v-text-field>

      <v-text-field
        v-model.trim="confirmPassword"
        :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showConfirmPassword ? 'text' : 'password'"
        label="確認新密碼"
        variant="outlined"
        :rules="[
          (v) => !!v || '請確認新密碼',
          (v) => v === passwordData.newPassword || '兩次輸入的密碼不一致',
        ]"
        @click:append-inner="showConfirmPassword = !showConfirmPassword"
      ></v-text-field>

      <v-alert
        v-if="errorMessage"
        type="error"
        variant="tonal"
        class="mt-3"
        closable
        @click:close="errorMessage = ''"
      >
        {{ errorMessage }}
      </v-alert>
    </template>
  </form-dialog>

  <!-- 成功提示 -->
  <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
    {{ snackbar.text }}
    <template v-slot:actions>
      <v-btn
        variant="text"
        icon="mdi-close"
        @click="snackbar.show = false"
      ></v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { computed, ref, reactive } from "vue";
import { useDisplay } from "vuetify";
import AuthService from "@/services/auth";
import FormDialog from "@/components/common/FormDialog.vue";

const emit = defineEmits(["toggle-drawer", "logout"]);

defineProps({
  userName: {
    type: String,
    required: true,
    default: "Guest",
  },
});

// 使用 Vuetify 的 display 工具檢測螢幕尺寸
const { mobile, xs } = useDisplay();

// 判斷是否為移動設備
const isMobile = computed(() => mobile.value);
const isMobileXs = computed(() => xs.value);

// 切換抽屜狀態的方法
const toggleDrawer = () => {
  emit("toggle-drawer");
};

// 登出處理 - 發射登出事件給父組件處理
const handleLogout = () => {
  emit("logout");
};

// ===== 密碼修改相關 =====
// 對話框控制
const changePasswordDialog = ref(false);
const isLoading = ref(false);
const isFormValid = ref(false);
const errorMessage = ref("");

// 密碼顯示控制
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

// 表單數據
const passwordData = reactive({
  currentPassword: "",
  newPassword: "",
});
const confirmPassword = ref("");

// 密碼規則
const passwordRules = [
  (v) => !!v || "請輸入新密碼",
  (v) => v.length >= 8 || "密碼長度至少為8個字元",
  (v) => (/[A-Za-z]/.test(v) && /[0-9]/.test(v)) || "密碼需包含字母和數字",
];

// 提示訊息
const snackbar = reactive({
  show: false,
  text: "",
  color: "success",
});

// 打開修改密碼對話框
const openChangePasswordDialog = () => {
  resetForm();
  changePasswordDialog.value = true;
};

// 重置表單
const resetForm = () => {
  passwordData.currentPassword = "";
  passwordData.newPassword = "";
  confirmPassword.value = "";
  errorMessage.value = "";
  isFormValid.value = false;
};

// 修改密碼
const changePassword = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    const response = await AuthService.changePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });

    if (response.status) {
      // 修改成功
      snackbar.color = "success";
      snackbar.text = "密碼修改成功";
      snackbar.show = true;
      changePasswordDialog.value = false;

      // 重新登入
      emit("logout");
    } else {
      // 修改失敗
      errorMessage.value = response.msg || "密碼修改失敗";
    }
  } catch (error) {
    console.error("修改密碼錯誤:", error);
    errorMessage.value = error.response?.data?.msg || "修改密碼時發生錯誤";
  } finally {
    isLoading.value = false;
  }
};
</script>
