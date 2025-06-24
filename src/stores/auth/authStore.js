import { defineStore } from "pinia";
import { ref, computed } from "vue";
import router from "@/router";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('token') || null);
  const loginError = ref(null);
  const isLoading = ref(false);

  const isAuthenticated = computed(() => !!token.value);

  function setToken(newToken) {
    token.value = newToken;
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
  }

  function setUser(userData) {
    user.value = userData;
  }

  async function login(credentials) {
    isLoading.value = true;
    loginError.value = null;
    
    try {
      // 模擬 API 調用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模擬登入成功
      const mockUser = { id: 1, name: 'Demo User', email: credentials.email };
      const mockToken = 'demo-token-' + Date.now();
      
      setUser(mockUser);
      setToken(mockToken);
      
      router.push('/dashboard');
      return true;
    } catch (error) {
      loginError.value = error.message;
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  function logout() {
    user.value = null;
    setToken(null);
    router.push('/');
  }

  return {
    user,
    token,
    loginError,
    isLoading,
    isAuthenticated,
    login,
    logout,
    setUser,
    setToken,
  };
});
