<template>
    <div class="my-media-width">
        <div style="border-bottom:2px solid #e6e6e6;" class="w-100-p h-60">
            <h3 style="color: #ff3300" class="w-100-p h-60 lh-50">购物车 | 全部商品 3</h3>
        </div>
        <div class="w-100-p mt-30 posi-r h-30">
            <div style="width: 200px;top: 0;left: 200px" class="posi-a">商品信息</div>
            <div class="w-150  posi-a" style="top: 0; right: 450px">单价</div>
            <div class="w-150  posi-a" style="top: 0; right: 300px">数量</div>
            <div class="w-150  posi-a" style="top: 0; right: 150px">金额</div>
            <div class="w-150  posi-a" style="top: 0; right: 0">操作</div>
        </div>
        <div class="w-100-p posi-r mt-10" style="border: 1px solid #cccccc;background-color: #fcfcfc;height: 130px;" v-for="item in 5">
            <div style="position: absolute;top: 15px;left: 10px;"><el-checkbox/></div>
            <img src="@/assets/apple.jpg" alt="" class="w-100 h-100 posi-a" style="top: 10px;left: 50px">
            <div style="width: 200px;height: 100px;top: 10px;left: 200px" class="posi-a">
                <p>【直销-脆大甜苹果】</p>
                <p>描述：暂无</p>
            </div>
            <div class="w-150 h-30 posi-a" style="top: 50px; right: 450px">￥8.00</div>
            <div class="w-150 h-30 posi-a" style="top: 50px; right: 300px">
                <el-input-number size="mini" v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
            </div>
            <div class="w-150 h-30 posi-a" style="top: 50px; right: 150px"><h3 style="color: #ff3300">￥8.00</h3></div>
            <div class="w-150 h-30 posi-a" style="top: 50px; right: 0">
                <el-button type="danger" plain size="mini" @click="delAll">移除</el-button>
            </div>
        </div>
        <div class="w-100-p mt-30 posi-r h-50" style="background-color: #e5e5e5;margin-bottom: 10px">
            <div style="position: absolute;top: 15px;left: 10px;"><el-checkbox>全选</el-checkbox></div>
            <div style="width: 200px;top: 15px;left: 200px" class="posi-a"><p @click="delAll" style="cursor: pointer">删除</p></div>
            <div class="w-150  posi-a" style="top: 15px; right: 350px">已选商品<strong style="color: #ff3300"> 1 </strong>件</div>
            <div class="w-200  posi-a" style="top: 15px; right: 150px">合计(不含运费)：<strong style="color: #ff3300">￥8.00</strong></div>
            <div class="w-100  h-50 posi-a lh-50 text-center" style="top: 0; right: 0;background-color: #ff4400;cursor: pointer" @click="settlement">
                <strong style="color: white">结算</strong>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "list",
        data() {
            return {
                num1: 1
            };
        },
        methods:{
            delAll(){
                alert('del')
            },
            settlement(){
                alert('settlement')
            },
            handleChange(value) {
                console.log(value);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
