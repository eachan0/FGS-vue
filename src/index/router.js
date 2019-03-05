import Vue from "vue";
import VueRouter from "vue-router";
import List from "@/components/List";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path:"/list/:type",
            component:List
        }
    ]
});
