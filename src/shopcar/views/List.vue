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
        <div class="w-100-p posi-r mt-10" style="border: 1px solid #cccccc;background-color: #fcfcfc;height: 130px;"
             v-for="item in shopcars">
            <div style="position: absolute;top: 15px;left: 10px;">
                <el-checkbox v-model="item.checked" @change="checkboxItem"/>
            </div>
            <img :src="item.photo" alt="" class="w-100 h-100 posi-a" style="top: 10px;left: 50px">
            <div style="width: 200px;height: 100px;top: 10px;left: 200px" class="posi-a">
                <p>【{{item.name}}】</p>
                <p>描述：{{item.desc}}</p>
            </div>
            <div class="w-150 h-30 posi-a" style="top: 50px; right: 450px">￥{{item.cjPrice}}</div>
            <div class="w-150 h-30 posi-a" style="top: 50px; right: 300px">
                <el-input-number size="mini" v-model="item.cjNum" @change="handleChange" :min="1" :max="10"
                                 label="描述文字"></el-input-number>
            </div>
            <div class="w-150 h-30 posi-a" style="top: 50px; right: 150px"><h3 style="color: #ff3300">
                ￥{{getAmount(item.cjPrice,item.cjNum)}}</h3></div>
            <div class="w-150 h-30 posi-a" style="top: 50px; right: 0">
                <el-button type="danger" plain size="mini" @click.stop="del(item.proId)">移除</el-button>
            </div>
        </div>
        <div class="w-100-p mt-30 posi-r h-50" style="background-color: #e5e5e5;margin-bottom: 10px">
            <div style="position: absolute;top: 15px;left: 10px;">
                <el-checkbox @change="selectAll" v-model="selectAllInput">全选</el-checkbox>
            </div>
            <div style="width: 200px;top: 15px;left: 200px" class="posi-a"><p @click="delAll" style="cursor: pointer">
                删除</p></div>
            <div class="w-150  posi-a" style="top: 15px; right: 350px">已选商品<strong style="color: #ff3300">
                {{getSelectNum}} </strong>件
            </div>
            <div class="w-200  posi-a" style="top: 15px; right: 150px">合计(不含运费)：<strong
                    style="color: #ff3300">￥{{getSelectAmount}}</strong></div>
            <div class="w-100  h-50 posi-a lh-50 text-center"
                 style="top: 0; right: 0;background-color: #ff4400;cursor: pointer" @click="settlement">
                <strong style="color: white">结算</strong>
            </div>
        </div>
        <el-dialog
                title="提示"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
            <div style="width: 100%;text-align: center;">
                <img src="@/assets/pay.png" alt="" style="width: 100%;max-width: 298px;margin: auto">
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="subPay">我已支付</el-button>
  </span>
        </el-dialog>

    </div>
</template>

<script>
    import storage from "@/storage";

    export default {
        name: "list",
        mounted() {
            this.id = storage.get("user").id;
            this.getData();
        },
        data() {
            return {
                id: -1,
                shopcars: [],
                selectAllInput: false,
                centerDialogVisible:false
            };
        },
        computed: {
            getSelectNum() {
                let len = this.shopcars.filter(item => item.checked).length;
                if (len === this.shopcars.length) {
                    if (len !== 0) {
                        this.selectAllInput = true;
                    }
                }
                return len;
            },
            getSelectAmount() {
                let sum = 0;
                this.shopcars.filter(item => item.checked).forEach(item => {
                    sum += (item.cjPrice * item.cjNum)
                });
                return sum;
            }
        },
        methods: {
            delAll() {
                let arr = [];
                this.shopcars.forEach(item=>item.checked?arr.push(item.proId):"");
                if (this.showNoProMsg()){
                    this.delAction(arr);
                }
            },
            del(proId){
                let arr = [];
                arr.push(proId);
                this.delAction(arr);
            },
            delAction(arr){
                arr.unshift(this.id);
                this.$http.delete("/shopcar/shopcar",{
                    data:arr
                })
                    .then(res=>{
                        this.showSuccessMsg();
                        this.getData();
                    })
                    .catch(res=>{console.log(res);});
            },
            showNoProMsg(){
                if (this.getSelectNum === 0){
                    this.$message({
                        showClose: true,
                        message: '请选择商品！',
                        type: 'warning'
                    });
                    return false;
                }
                return true;
            },
            showSuccessMsg(msg){
                if (!msg){
                    msg = '移除成功！'
                }
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'success'
                });
            },
            settlement() {
                if (this.showNoProMsg()){
                    this.centerDialogVisible = true;
                }
            },
            subPay(){
                this.centerDialogVisible = false;
                let arr = [];
                this.shopcars.forEach(item=>{
                    if (item.checked){
                        let temp = {};
                        temp.userId = this.id;
                        temp.proId = item.proId;
                        temp.num = item.cjNum;
                        temp.price = item.cjPrice;
                        temp.amount = item.cjNum*item.cjPrice;
                        arr.push(temp);
                    }
                });
                this.$http.post("/order/order",arr)
                    .then(res=>{
                        this.showSuccessMsg("购买成功！");
                        this.getData();
                    })
                    .catch(res=>{console.log(res)});
            },
            checkboxItem(val){
                if (!val){
                    this.selectAllInput =false;
                }
            },
            handleChange(value) {
            },
            getData() {
                if (this.id > 0) {
                    this.$http.get("/shopcar/shopcar", {
                        params: {
                            uid: this.id
                        }
                    })
                        .then(res => {
                            this.shopcars.splice(0,this.shopcars.length);
                            res.data.data.forEach(item => {
                                item.cjNum = 1;
                                item.checked = false;
                                this.shopcars.push(item)
                            });
                        })
                        .catch(res => {
                            console.log(res);
                        });
                }
            },
            getAmount(price, num) {
                return num * price;
            },
            selectAll(val) {
                this.shopcars.forEach(item => item.checked = val);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
