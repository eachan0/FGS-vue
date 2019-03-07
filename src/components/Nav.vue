<template>
    <div>
    <el-row class="my-media-width">
        <el-col :sm="16" :xs="16" :md="16" :lg="16" :xl="16" class="w-100-p">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                     @select="handleSelect" router>
                <el-menu-item index="/list/1"><span id="test">热销</span></el-menu-item>
                <el-menu-item index="/list/2">新品</el-menu-item>
                <el-menu-item index="/list/3">全部</el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
    <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "Nav",
        data() {
            return {
                activeIndex: '/list/1',
            }
        },
        mounted(){
           document.getElementById("test").click();
        },
        methods: {
            handleSelect(key, keyPath) {
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
