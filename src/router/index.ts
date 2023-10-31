import {
  createRouter,
  createWebHistory,
  RouterOptions,
  Router,
  RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/",
    redirect: "/login",
  },
];

const options: RouterOptions = {
  history: createWebHistory(),
  routes,
};

const router: Router = createRouter(options);

export default router;
