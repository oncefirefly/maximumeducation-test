import { createRouter, createWebHistory } from "vue-router";
import FormPage from "../views/FormPage.vue";

const routes = [
  {
    path: "/",
    name: "FormPage",
    component: FormPage,
  },
  {
    path: "/success",
    name: "SuccessRequest",
    component: () => import("../views/SuccessRequest.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
