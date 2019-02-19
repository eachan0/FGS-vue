import Vue from 'vue';
import VueRouter from "vue-router"
import User from '@/userinfo/views/User';
import Pass from '@/userinfo/views/Pass';
import Address from '@/userinfo/views/Address';

Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        {
            path:'/user',
            component:User
        },
        {
            path:'/pass',
            component:Pass
        },
        {
            path:'/address',
            component:Address
        }]
});
