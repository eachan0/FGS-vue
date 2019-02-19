<template>
    <div class="my-media-width posi-r">
        <div style="width: 20%;height: 700px;">
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo">
            <el-menu-item index="1">
                <span slot="title">账户信息</span>
            </el-menu-item>
                <el-menu-item index="2">
                    <span slot="title">地址管理</span>
                </el-menu-item>
            <el-menu-item index="3">
                <span slot="title">修改密码</span>
            </el-menu-item>
        </el-menu>
        </div>
        <div class="posi-a" style="width: 80%;height: 700px;background-color: #000;top: 0;left: 200px;"></div>
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
