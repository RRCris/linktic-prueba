import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import CharacterDetails from "../views/CharacterDetails.vue";

export const ROUTES = {
  HOME: "/",
  CHARACTER_DETAILS: (id: number | string) => `/character/${id}`,
};

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/character/:id",
    name: "CharacterDetail",
    component: CharacterDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
