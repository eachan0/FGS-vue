<template>
    <el-container>
        <el-header height="40">
            <MyHeader></MyHeader>
        </el-header>
        <el-main>
            <List></List>
        </el-main>
        <el-footer height="150px">
            <Footer></Footer>
        </el-footer>
    </el-container>
</template>

<script>
    import MyHeader from '@/components/MyHeader';
    import Footer from "@/components/Footer";
    import List from "@/shopcar/views/List";
    export default {
        name: "app",
        data() {
            return {
            }
        },
        components: {List, MyHeader,Footer},
        methods: {
        }
    };
</script>

<style lang="scss">

</style>
