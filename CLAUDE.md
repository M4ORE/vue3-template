# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Vue 3 Template

這是一個基於 Vue 3 + Vuetify 3 + Pinia 的現代化前端腳手架範本。

## Development Commands

### Core Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables
The application uses `VITE_API_URL` for API configuration. Create a `.env` file for environment-specific settings.

## Project Architecture

### Tech Stack
- **Frontend Framework**: Vue 3 with Composition API
- **UI Library**: Vuetify 3 with custom theme
- **State Management**: Pinia stores
- **Routing**: Vue Router with hash-based routing
- **HTTP Client**: Axios with JWT authentication interceptors
- **Build Tool**: Vite

### Application Structure

這是一個可立即使用的 Vue 3 腳手架，包含基本的認證功能和範例頁面。

#### Core Modules
1. **Authentication Module** (`src/stores/auth/`, `src/views/auth/`)
   - 簡單的 JWT 認證範例
   - 模擬登入功能
   - Token 管理和自動登出

2. **Layout System** (`src/components/layout/`)
   - `LayoutManager.vue` - 動態佈局切換
   - `MainLayout.vue` - 預設的主要佈局含側邊欄
   - `BlankLayout.vue` - 極簡佈局用於登入/404頁面

3. **Sample Pages**
   - **Home** (`src/views/HomePage.vue`) - 首頁範例
   - **About** (`src/views/AboutPage.vue`) - 關於頁面
   - **Dashboard** (`src/views/DashboardPage.vue`) - 儀表板範例

### Key Architectural Patterns

#### Store Architecture
- `authStore.js` - 認證狀態和動作
- `appStore.js` - 全域 UI 狀態 (loading, snackbars)
- 使用 Composition API 模式與 `defineStore`

#### API Client Pattern
- 集中式 HTTP 客戶端 (`src/services/apiClient.js`)
- 自動 JWT token 注入請求攔截器
- 401 回應時自動登出
- 服務層模式 (`auth.js`)

#### Component Organization
- `components/common/` - 可重用的 UI 組件
- `components/layout/` - 佈局和導航組件

### Routing Configuration
- Hash-based routing (`createWebHashHistory`)
- 認證路由守衛
- 延遲載入組件以獲得更好的效能
- Meta 屬性用於佈局切換和標題

### Theme and Styling
- 自訂 Vuetify 主題配色
- 全域 CSS 在 `src/assets/styles/global.css`
- Material Design Icons (`@mdi/font`)

### Authentication Flow
1. 使用電子郵件 + 密碼登入 (模擬)
2. JWT token 儲存並自動注入請求
3. 路由守衛檢查認證狀態
4. Token 過期時自動登出 (401 回應)

## Getting Started

### 1. 安裝依賴
```bash
npm install
```

### 2. 設定環境變數
創建 `.env` 檔案：
```env
VITE_API_URL=http://localhost:3000
```

### 3. 啟動開發伺服器
```bash
npm run dev
```

### 4. 開始開發
- 訪問 `http://localhost:5173` 查看應用程式
- 使用任何有效的電子郵件格式登入
- 探索不同的頁面和功能

## Customization

### 修改主題
編輯 `src/plugins/vuetify.js` 來自訂顏色和主題設定。

### 新增頁面
1. 在 `src/views/` 建立新的 Vue 組件
2. 在 `src/router/index.js` 新增路由
3. 在 `src/components/layout/Sidebar.vue` 新增導航項目

### 新增 API 服務
1. 在 `src/services/` 建立新的服務檔案
2. 使用 `apiClient` 進行 HTTP 請求
3. 在 Pinia store 中整合服務

### 新增 Store
1. 在 `src/stores/` 建立新的 store 檔案
2. 使用 Composition API 模式
3. 在組件中使用 store

## Code Conventions
- 使用 `@/` 別名指向 `src/` 目錄
- Composition API 搭配 `<script setup>` 語法
- 組件檔案使用 PascalCase，服務檔案使用 camelCase
- 遵循現有的程式碼風格和結構