<template>
    <el-container>
        <el-header height="40">
            <MyHeader></MyHeader>
        </el-header>
        <LogAndSearch></LogAndSearch>
        <el-main>
            <Lunbo></Lunbo>
            <Nav></Nav>
            <list></list>
        </el-main>
        <el-footer height="150px">
            <Footer></Footer>
        </el-footer>
    </el-container>
</template>

<script>
    import MyHeader from '@/components/MyHeader';
    import LogAndSearch from "@/components/LogAndSearch";
    import Lunbo from "@/components/Lunbo";
    import Nav from "@/components/Nav";
    import List from "@/components/List";
    import Footer from "@/components/Footer";
    export default {
        name: "app",
        data() {
            return {
            }
        },
        components: {Footer, List, Nav, Lunbo, LogAndSearch, MyHeader},
        methods: {
        }
    };
</script>

<style lang="scss">

</style>
