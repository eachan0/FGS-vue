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
                <el-button type="primary" size="small" @click="login">登陆</el-button>
            </div>
        </div>
    </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Footer from "@/components/Footer";
    import LogAndSearch from "@/components/LogAndSearch";
    export default {
        name: "App",
        components: {LogAndSearch, Footer},
        data(){
            return {
                account:'admin',
                password:'123456'
            }
        },
        methods:{
            login(){
                if (this.account && this.password){
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    this.$http.post('http://127.0.0.1:8090/fgs-api/login',
                            'username='+ this.account+'&password='+this.password,
                    ).then(res=>{
                        console.log(res);
                    }).catch(err=>{
                        console.log(err);
                    });
                }
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
