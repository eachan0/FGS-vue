<template>
    <div class="my-media-width posi-r">
        <div style="width: 20%;height: 700px;">
            <el-menu
                default-active="/user"
                class="el-menu-vertical-demo"
            router>
            <el-menu-item index="/user">
                <span slot="title">账户信息</span>
            </el-menu-item>
                <el-menu-item index="/address">
                    <span slot="title">地址管理</span>
                </el-menu-item>
            <el-menu-item index="/pass">
                <span slot="title">修改密码</span>
            </el-menu-item>
        </el-menu>
        </div>
        <div class="posi-a" style="width: 80%;height: 700px;top: 0;left: 200px;">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Info"
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
