<template>
    <div class="my-media-width">
      <el-row>
        <el-col :sm="12" :xs="12" :md="12" :lg="12" :xl="12">
          <div>Tel:400-000-000</div>
        </el-col>
        <el-col :sm="12" :xs="12" :md="12" :lg="12" :xl="12" >
          <el-dropdown @command="handleCommand" v-if="bool">
            <span class="el-dropdown-link">
               {{nickname}} 我的账户<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="shopcar.html">购物车</el-dropdown-item>
              <el-dropdown-item command="order.html">我的订单</el-dropdown-item>
              <el-dropdown-item command="userinfo.html">账户设置</el-dropdown-item>
              <el-dropdown-item command="logout" divided>退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="text" v-else style="color: #ededed" @click="toLogPage">登陆/注册</el-button>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import {mapState} from "vuex";
  import storage from "@/storage";
  import PubSub from "pubsub-js";
export default {
  name: "MyHeader",
  data(){
    return {
      ...mapState(["login"]),
      bool:false,
      nickname:''
    }
  },
  mounted(){
    this.getUserInfo();
    PubSub.subscribe('doLogout', (msg, data) => {
      this.logout(false);
    });
  },
  methods: {
    handleCommand(command) {
      if (command==='logout'){
        this.logout();
        return;
      }
      window.open(`/${command}`,'_blank');
    },
    logout(show =true){
      this.$http.post("logout")
              .then(()=>{
                localStorage.clear();
                if (show){
                  this.$message({
                  showClose: true,
                  message: '退出成功！',
                  type: 'success',
                  duration:1500,
                  onClose:window.location = '/login.html'
                });
                }
              })
              .catch(err=>{
                console.log(err)
              });

    },
    toLogPage(){
      window.open('/login.html','_blank');
    },
    getUserInfo(){
      this.$http.get("/get_user_info").then(res=>{
        const user = res.data.data;
        storage.set("user",user);
        this.bool = true;
        this.nickname = user.nickname;
      }).catch(()=>{
        localStorage.clear();
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
