const apiUrl = 'http://127.0.0.1:8090/fgs-api/shop';//线上域名
let loadinginstace;
const loadingoption ={
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.3)',
    customClass:"osloading",
    fullscreen: true
};
/**
 * ajax请求配置
 */
import axios from 'axios';
import storage from '@/storage';
import {Loading,Message} from 'element-ui';

// axios默认配置
axios.defaults.timeout = 10000;   // 超时时间
axios.defaults.baseURL = apiUrl;  // 默认地址
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//整理数据
axios.defaults.transformRequest = function (data) {
    console.log(data);
    return JSON.stringify(data);
};

// 路由请求拦截
// http request 拦截器
axios.interceptors.request.use(
    config => {
        loadinginstace = Loading.service(loadingoption);
        //config.data = JSON.stringify(config.data);
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        //判断是否存在ticket，如果存在的话，则每个http header都加上ticket
        if (storage.get("token")) {
            // config.headers.token = storage.get("token");
            // config.headers.name= storage.get("name");
        }
        return config;
    },
    error => {
        loadinginstace.close();
        return Promise.reject(error.response);
    });

// 路由响应拦截
// http response 拦截器
axios.interceptors.response.use(
    response => {
        loadinginstace.close();
        console.log(response);
        if (response.data.code===0){
            return response;
        }
        let msg = response.data.msg ||'操作失败';
        Message.error({message:msg,duration:1500,showClose:true});
        return Promise.reject(new Error(msg));
    },
    error => {
        loadinginstace.close();
        let res = error.response;
        let msg;
        if (res.status===401){
            msg = res.data.message ||'操作失败';
        } else if(res.status===404){
            msg = res.data.message ||'操作失败';
        }else {
            msg = '未知错误';
        }
        Message.error({message:msg,duration:1500,showClose:true});
        return Promise.reject(new Error(msg));   // 返回接口返回的错误信息
    });
export default axios;