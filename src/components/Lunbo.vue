<template>
    <el-row>
        <el-col :sm="24" :xs="24" :md="24" :lg="24" :xl="24">
            <el-carousel :interval="3000" arrow="always" :height="lunbo_height">
                <el-carousel-item v-for="item in 5" :key="item">
                    <img :src="getImgSrc(item)" alt="" class="w-100-p" ref="lunbo_img">
                </el-carousel-item>
            </el-carousel>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "Lunbo",
        data(){
            return {
                lunbo_height: '500px',
            }
        },
        mounted() {
            let lunbo_img = this.$refs.lunbo_img;
            window.onresize = () => {
                this.lunbo_height = `${lunbo_img[0].height}px`;
            };
        },
        methods: {
            getImgSrc(item) {
                return require(`@/assets/lunbo-${item}.jpg`);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
