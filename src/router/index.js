import { createRouter, createWebHashHistory } from "vue-router";
import LayoutManager from "@/components/layout/LayoutManager.vue";
import { useAuthStore } from "@/stores/auth/authStore";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/LoginPage.vue"),
    meta: { requiresAuth: false, layout: "blank" },
  },
  {
    path: "/",
    redirect: { name: "Home" },
  },
  {
    path: "/",
    component: LayoutManager,
    meta: { requiresAuth: false, layout: "default" },
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/HomePage.vue"),
        meta: { title: "首頁" },
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/views/AboutPage.vue"),
        meta: { title: "關於" },
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/DashboardPage.vue"),
        meta: { title: "儀表板", requiresAuth: true },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/PageNotFound.vue"),
    meta: { requiresAuth: false, layout: "blank" },
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  document.title = to.meta.title
    ? `${to.meta.title} | Vue3 Template`
    : "Vue3 Template";

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: "Login" });
    return;
  }

  next();
});

export default router;
