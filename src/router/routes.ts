import type { RouteRecordRaw } from "vue-router";

import Home from "../views/Home.vue";

const SearchResult = () => import("../views/SearchResult.vue");
const Details = () => import("../views/Details.vue");

export const routes: RouteRecordRaw[] = [
  { path: "/", name: "Home", component: Home },
  { path: "/result", name: "SearchResult", component: SearchResult },
  { path: "/details/:id", name: "Details", component: Details },
  { path: "/:pathMatch(.*)*", component: Home },
];
