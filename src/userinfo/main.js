import Vue from "vue";
import App from "./App.vue";
import store from "@/store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../assets/css/common.css';
import router from '@/userinfo/router/router';
import axios from "@/axios";

Vue.prototype.$http = axios;
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
