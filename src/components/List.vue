<template>
    <ul class="my-media-width my-list-ul">
        <li v-for="item in 10" class="my-list-li posi-r">
            <div class="posi-r item-div">
                <img src="@/assets/hot_pro.jpg" class="sales-img">
                <img src="@/assets/pic2.jpg" class="w-100-p"/>
                <div style="">
                    <div class="w-100-p h-30 lh-30 text-center">name</div>
                    <div class="w-100-p h-30 lh-30 text-center">
                        <strong>$9.99</strong> /kg
                        <span class="fs-8 red">团购$ 8.88</span>
                    </div>
                    <div class="w-100-p h-40 lh-40 text-center">
                        <el-button type="warning" >加入拼团</el-button>
                        <el-button type="danger" >加入购物车</el-button>
                    </div>
                    <div class="fs-8 red">五人起购，已有4人加入</div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "List"
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
