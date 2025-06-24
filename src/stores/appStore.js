// stores/appStore.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const loading = ref(false);
  const snackbar = ref({
    show: false,
    text: "",
    color: "info",
  });

  function showLoading() {
    loading.value = true;
  }

  function hideLoading() {
    loading.value = false;
  }

  function showMessage(text, color = "info") {
    snackbar.value = {
      show: true,
      text,
      color,
    };
  }

  return {
    loading,
    snackbar,
    showLoading,
    hideLoading,
    showMessage,
  };
});
