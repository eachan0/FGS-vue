export default {
    set(key,value){
        window.localStorage.setItem("client"+key,JSON.stringify(value));
    },
    get(key){
        return JSON.parse(window.localStorage.getItem("client"+key) || '{}');
    }
}
