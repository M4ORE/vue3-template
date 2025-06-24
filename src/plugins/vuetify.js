// plugins/vuetify.js
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "templateTheme",
    themes: {
      templateTheme: {
        dark: false,
        colors: {
          // 主色調
          primary: "#FFD85F", // 黃色主色調 (按鈕、高亮元素)
          "primary-darken-1": "#EBC143", // 深黃色

          // 輔助色
          secondary: "#303030", // 深灰色 (文字、按鈕)
          "secondary-lighten-1": "#5A5A5A", // 較淺灰色
          "secondary-lighten-2": "#747474", // 更淺的灰色

          // 狀態色
          success: "#10B981", // 綠色
          error: "#EF4444", // 紅色
          warning: "#F59E0B", // 橙色警告
          info: "#3B82F6", // 藍色資訊

          // 背景色系
          background: "#E3E4E8", // 主背景淺灰色
          "background-lighten-1": "#EEEEEE", // 次要背景色
          "background-gradient-1": "#F6EEC7", // 背景漸變色1
          "background-gradient-2": "#F8E6B8", // 背景漸變色2

          // 表面色
          surface: "#FFFFFF", // 卡片表面白色
          "surface-variant": "#F9F6ED", // 米色表面變體
          "surface-dark": "#303030", // 深色卡片表面

          // 文字色
          "on-primary": "#303030", // 主色上的文字
          "on-secondary": "#FFFFFF", // 次要色上的文字
          "on-surface": "#303030", // 表面上的文字
          "on-background": "#303030", // 背景上的文字
          "text-primary": "#303030", // 主要文字
          "text-secondary": "#747474", // 次要文字
          "text-disabled": "#AAAAAA", // 禁用文字

          // 邊框和分隔線
          "border-color": "#E5E7EB",
          "divider-color": "#EEEEEE",

          // 圖表和數據可視化色
          "chart-1": "#FFD85F", // 黃色
          "chart-2": "#303030", // 黑色
          "chart-3": "#AAAAAA", // 灰色
        },
        variables: {
          // 自定義變量
          "border-radius": "12px",
          "card-border-radius": "16px",
          "border-width": "1px",
          "shadow-key-umbra-opacity": "rgba(0, 0, 0, 0.05)",
          "shadow-key-penumbra-opacity": "rgba(0, 0, 0, 0.07)",
          "background-gradient-1": "#F6EEC7",
          "background-gradient-2": "#F8E6B8",
        },
      },
    },
  },
});
