import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./registerServiceWorker";
import router from "./router";
import VueRellax from "vue-rellax";

Vue.use(VueRellax);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
