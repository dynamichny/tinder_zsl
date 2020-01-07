import Vue from "vue";
import VueRouter from "vue-router";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/app",
    name: "Application",
    component: () => import("../views/Application.vue")
  },
  {
    path: "*",
    component: () => import("../views/NotFound.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
