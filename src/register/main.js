import Vue from "vue";
import App from "./App.vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../assets/css/common.css';
import axios from '@/axios';

Vue.use(ElementUI);
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount("#app");
