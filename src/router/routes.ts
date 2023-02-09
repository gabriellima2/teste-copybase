import type { RouteRecordRaw } from "vue-router";

import Home from "../views/Home.vue";
import SearchResult from "../views/SearchResult.vue";

export const routes: RouteRecordRaw[] = [
  { path: "/", name: "Home", component: Home },
  { path: "/result", name: "SearchResult", component: SearchResult },
];
