import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./registerServiceWorker";
import router from "./router";
import VueRellax from "vue-rellax";
import vueHeadful from 'vue-headful';

Vue.use(VueRellax);
Vue.component('vue-headful', vueHeadful);

Vue.config.devtools = false;
Vue.config.debug = false;
Vue.config.silent = true;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
