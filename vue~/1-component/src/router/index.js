import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/course/:name",
        name: "detail",
        component: () => import("../views/Detail.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/coure/:name",
    component: () => import("../views/Detail.vue"),
  },
  {
    // 会匹配所有路径
    path: "*",
    component: () => import("../views/404.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
