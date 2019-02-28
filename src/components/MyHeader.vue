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
    const token = storage.get("token");
    if (token.length>125){
      this.bool = true;
      this.nickname = storage.get("user").nickname;
    }

  },
  methods: {
    handleCommand(command) {
      if (command==='logout'){
        this.logout();
        return;
      }
      // this.$message('click on item ' + command);
      window.open(`/${command}`,'_blank');
    },
    logout(){
      this.$http.post("logout")
              .then(res=>{
                localStorage.clear();
                this.$message({
                  showClose: true,
                  message: '退出成功！',
                  type: 'success'
                });
                setTimeout("window.location = '/login.html'",1500);
              })
              .catch(err=>{
                console.log(err)
              });

    },
    toLogPage(){
      window.open('/login.html','_blank');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
