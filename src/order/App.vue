<template>
    <el-container>
        <el-header height="40">
            <MyHeader></MyHeader>
        </el-header>
        <el-main>
            <Table></Table>
        </el-main>
        <el-footer height="150px">
            <Footer></Footer>
        </el-footer>
    </el-container>
</template>

<script>
    import MyHeader from '@/components/MyHeader';
    import Footer from "@/components/Footer";
    import Table from "@/order/views/Table";
    export default {
        name: "app",
        data() {
            return {
            }
        },
        components: {Table, MyHeader,Footer},
        methods: {
        }
    };
</script>

<style lang="scss">

</style>
