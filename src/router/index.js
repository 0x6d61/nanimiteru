import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  base: "/nanimiteru/",
  routes: [
    {
      path: "/",
      name: "top",
      components: "App"
    }
  ]
});
