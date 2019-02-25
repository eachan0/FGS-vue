const apiUrl = 'http://127.0.0.1:8090/';//线上域名
/**
 * ajax请求配置
 */
import axios from 'axios';
import storage from '@/storage';

// axios默认配置
axios.defaults.timeout = 10000;   // 超时时间
axios.defaults.baseURL = apiUrl;  // 默认地址

//整理数据
axios.defaults.transformRequest = function (data) {
    data = JSON.stringify(data);
    return data;
};

// 路由请求拦截
// http request 拦截器
axios.interceptors.request.use(
    config => {
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
        return Promise.reject(error.response);
    });

// 路由响应拦截
// http response 拦截器
axios.interceptors.response.use(
    response => {
        const code = response.data.resultCode;
        if (code==="404") {
            console.log("response.data.resultCode是404")
            return false;
        }else if(code==="401"){
            return false;
        }else
            return response;
    },
    error => {
        return Promise.reject(error.response)   // 返回接口返回的错误信息
    });
export default axios;
