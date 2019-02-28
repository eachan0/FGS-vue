import Vue from "vue";
import Vuex from "vuex";
import storage from "@/storage";

const SETLOGIN = 'setLogin';
const initLogin = function () {
    const login = storage.get("state.login");
    const arr = Object.keys(login);
    return arr.length !== 0;
};
Vue.use(Vuex);
const state = {
    login:initLogin()
};

const mutations ={
    [SETLOGIN](state,{val}){
        state.login = val;
        storage.set("state.login",state.login);
    }
};
const actions = {
    setLoginAcion({commit}, val) {
        commit(SETLOGIN,{val});
    }
};
const getters = {};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
