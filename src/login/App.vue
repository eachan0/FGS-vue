<template>
    <div>
        <LogAndSearch></LogAndSearch>
    <div class="login-div-body posi-r">
        <div class="posi-a login-content">
            <div class="" >
                <el-input placeholder="请输入账号" v-model="account" autocomplete="off" type="text">
                </el-input>
            </div>
            <div class="mt-30">
                <el-input placeholder="请输入密码" v-model="password" type="password">
                </el-input>
            </div>
            <div class="w-50-p posi-a" style="top: 155px;left: 0px"><a href="register.html">立即注册</a></div>
            <div class="posi-a" style="width: 24px;height: 14px;top: 150px;right: 40px">
                <el-button type="primary" size="small" @click="doLogin">登陆</el-button>
            </div>
        </div>
    </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Footer from "@/components/Footer";
    import LogAndSearch from "@/components/LogAndSearch";
    import storage from "@/storage";
    import {mapState} from "vuex";
    export default {
        name: "App",
        components: {LogAndSearch, Footer},
        data(){
            return {
                account:'shop',
                password:'123456',
                ...mapState(["login"])
            }
        },
        mounted(){
            const token = storage.get("token");
            if (token.length>125){
                window.location = "/index.html";
            }
        },
        methods:{
            doLogin(){
                if (this.account && this.password){
                    this.$http.post('/login',{
                        username:this.account,
                        password:this.password
                    },{
                            headers:{
                                post:{
                                    'Content-Type':'application/x-www-form-urlencoded'
                                }
                            }
                        }
                    ).then(res=>{
                        storage.set("token",res.data.token);
                        this.$store.dispatch('setLoginAcion', true);
                        this.getUserInfo();
                    }).catch(err=>{
                        console.log(err);
                    });
                }
            },
            getUserInfo(){
                this.$http.get("/get_user_info").then(res=>{
                    storage.set("user",res.data.data);
                    this.$message({
                        showClose: true,
                        message: '登陆成功！',
                        type: 'success'
                    });
                    setTimeout("window.location = '/index.html'",1500);
                }).catch(err=>{
                    localStorage.clear();
                })
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
