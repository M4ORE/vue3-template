import apiClient from './apiClient';

const AuthService = {
  async login(credentials) {
    // 模擬 API 調用 - 在實際專案中替換為真實的 API 端點
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: true,
          data: {
            id: 1,
            name: 'Demo User',
            email: credentials.email || credentials.username,
          },
          token: 'demo-token-' + Date.now()
        });
      }, 1000);
    });
  },

  async logout() {
    // 模擬登出 API 調用 - 在實際專案中替換為真實的 API 端點
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: true });
      }, 500);
    });
  }
};

export default AuthService;
