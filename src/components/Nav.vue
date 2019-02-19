<template>
    <el-row class="my-media-width">
        <el-col :sm="16" :xs="16" :md="16" :lg="16" :xl="16" class="w-100-p">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                     @select="handleSelect">
                <el-menu-item index="1">首页</el-menu-item>
                <el-menu-item index="2">热销</el-menu-item>
                <el-menu-item index="3">新品</el-menu-item>
                <el-menu-item index="4">全部</el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "Nav",
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
