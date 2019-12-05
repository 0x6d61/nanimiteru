import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueMaterial from "vue-material";
import VueLazyload from "vue-lazyload";
import router from "./router";

import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(VueLazyload, {
  preload: 1.3,
  error: "img/error.jpg"
});
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
