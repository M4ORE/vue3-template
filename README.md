# Vue 3 Template

一個基於 Vue 3 + Vuetify 3 + Pinia 的現代化前端腳手架範本。

## ✨ 特性

- 🎯 **Vue 3 Composition API** - 最新的 Vue 3 語法和特性
- 🎨 **Vuetify 3** - 豐富的 Material Design 組件庫
- 📦 **Pinia** - 輕量級且直觀的狀態管理
- 🚦 **Vue Router** - 客戶端路由，支援動態載入
- 🔐 **JWT 認證** - 完整的認證流程範例
- 📱 **響應式設計** - 支援桌面和行動裝置
- ⚡ **Vite** - 快速的建置工具

## 🚀 快速開始

### 環境要求
- Node.js 16+
- npm 或 yarn

### 使用模板創建新專案

使用 degit 快速創建基於此模板的新專案：

```bash
# 使用 degit 克隆模板 (推薦)
npx degit Annam4ore/vue3-template my-new-project
cd my-new-project

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

### 傳統方式安裝

```bash
# 克隆專案
git clone <repository-url>
cd vue3-template

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

### 環境變數設定

創建 `.env` 檔案：
```env
VITE_API_URL=http://localhost:3000
```

## 📁 專案結構

```
src/
├── components/
│   ├── common/           # 可重用組件
│   └── layout/           # 佈局組件
├── views/                # 頁面組件
│   ├── auth/            # 認證相關頁面
│   ├── HomePage.vue     # 首頁
│   ├── AboutPage.vue    # 關於頁面
│   └── DashboardPage.vue # 儀表板
├── stores/
│   ├── auth/            # 認證相關狀態
│   └── appStore.js      # 全域應用狀態
├── services/            # API 服務層
├── router/              # 路由配置
├── plugins/             # 插件配置
├── assets/              # 靜態資源
└── utils/               # 工具函數
```

## 🎯 核心功能

### 認證系統
- 模擬登入功能
- JWT Token 管理
- 自動登出機制
- 路由守衛保護

### 頁面範例
- **首頁** - 歡迎頁面和快速導航
- **關於頁面** - 技術棧介紹
- **儀表板** - 需要認證的範例頁面

### 佈局系統
- 響應式側邊欄
- 動態佈局切換
- 自適應設計

## 🛠️ 可用指令

```bash
# 開發伺服器
npm run dev

# 生產建置
npm run build

# 預覽生產版本
npm run preview
```

## 🎨 自訂設定

### 修改主題
編輯 `src/plugins/vuetify.js` 來自訂顏色和主題：

```javascript
theme: {
  defaultTheme: "customTheme",
  themes: {
    customTheme: {
      colors: {
        primary: "#your-color",
        // ...更多顏色設定
      }
    }
  }
}
```

### 新增頁面
1. 在 `src/views/` 建立新組件
2. 在 `src/router/index.js` 新增路由
3. 在側邊欄新增導航項目

### 新增 API 服務
1. 在 `src/services/` 建立新服務
2. 使用 `apiClient` 進行 HTTP 請求
3. 在 Pinia store 中整合

## 📋 開發指南

### 程式碼規範
- 使用 Composition API + `<script setup>`
- 組件檔名使用 PascalCase
- 使用 `@/` 別名指向 src 目錄
- 遵循 Vue 3 最佳實踐

### 建議的開發工作流程
1. 在 `stores/` 定義應用狀態
2. 在 `services/` 建立 API 服務
3. 在 `views/` 建立頁面組件
4. 在 `components/` 建立可重用組件
5. 在 `router/` 配置路由

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License
