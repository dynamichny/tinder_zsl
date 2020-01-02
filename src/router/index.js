import Vue from "vue";
import VueRouter from "vue-router";
import Application from "../views/Application.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/app",
    name: "Application",
    component: Application
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue")
  },
  {
    path: "/*",
    component: () => import("../views/NotFound.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
