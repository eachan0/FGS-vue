<template>
    <ul class="my-media-width my-list-ul">
        <li v-for="item in products" class="my-list-li posi-r">
            <div class="posi-r item-div">
                <img v-if="imgtype" :src="imgtype" class="sales-img">
                <img :src="item.photo" class="w-100-p"/>
                <div style="">
                    <div class="w-100-p h-30 lh-30 text-center">{{item.name}}</div>
                    <div class="w-100-p h-30 lh-30 text-center">
                        <strong>${{item.price}}</strong> /kg
                        <span class="fs-8 red">团购${{item.tuanPrice}}</span>
                    </div>
                    <div class="w-100-p h-40 lh-40 text-center">
                        <el-button type="warning" >加入拼团</el-button>
                        <el-button type="danger" @click="addToShopcar(item.id,item.price)">加入购物车</el-button>
                    </div>
                    <div class="fs-8 red">五人起购，已有4人加入</div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
    import storage from "@/storage";

    export default {
        name: "List",
        data(){
            return {
                products:[],
                imgtype:require("@/assets/hot_pro.jpg"),
                type:1,
                id:-1
            }
        },
        mounted(){
            this.getProductDta();
            this.id = storage.get("user").id;
        },
        methods:{
            getProductDta(){
                let _this = this;
                this.$http.get("/product/product",{
                    params:{
                        type:_this.type
                    }
                }).then(res=>{
                    _this.products.splice(0,_this.products.length);
                    res.data.data.forEach(item=>_this.products.push(item));
                }).catch(res=>{
                    console.log(res);
                });
            },
            addToShopcar(id,price){
                let data = {
                  userId:this.id,
                  proId:id,
                  cjPrice:price
                };
                this.$http.post("/shopcar/shopcar",data)
                    .then(res=>{
                        this.$message({
                            showClose: true,
                            message: '添加成功！',
                            type: 'success'
                        });
                    })
                    .catch(res=>{
                        console.log(res);
                    })
            }
        },
        watch:{
            $route:function(value){
                this.type  = value.params.type*1;
                if (this.type===1){
                    this.imgtype = require("@/assets/hot_pro.jpg");
                } else if(this.type===2){
                    this.imgtype = require("@/assets/new_pro.jpg");
                } else{
                    this.imgtype = false;
                }
                this.getProductDta();
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
