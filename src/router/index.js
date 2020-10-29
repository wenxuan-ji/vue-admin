import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import Login from "../views/Login/index.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // name: "Home",
    // component: Home
    redirect:"Login"
  },
  {
    path: "/Login",
    name: "Login",
    component: Login
    // component: () => import("../views/login/index.vue") 懒加载
  }
  // ,
  // {
    // path: "/about",
    // name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
      // import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  routes
});

export default router;
