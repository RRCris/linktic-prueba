import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import DefaultLayout from "../views/layouts/DefaultLayout.vue";
import NotFound from "../views/defaults/NotFound.vue";

export const ROUTES = {
  HOME: "/",
  CHARACTER_DETAILS: (id: number | string) => `/character/${id}`,
};

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../views/HomeView.vue"),
      },
      {
        path: "/character/:id",
        name: "CharacterDetail",
        component: () => import("../views/CharacterDetailsView.vue"),
      },
    ],
  },
  { path: "/:pathMath(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
