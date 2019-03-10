<template>
    <div class="my-media-width" style="margin-bottom: 20px;">
        <el-table
                ref="multipleTable"
                :data="orderData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="index"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="orderNo"
                    label="订单号"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="日期"
                    width="150">
                <template slot-scope="scope">{{ scope.row.createTime | formatDate }}</template>
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="单价"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="num"
                    label="数量"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="amount"
                    label="总价"
                    width="70">
            </el-table-column>
            <el-table-column
                    label="进度"
                    width="100">
                <template slot-scope="scope">{{ scope.row.schedule | formatSchedule }}</template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button v-if="showCancel(scope.row.schedule)"
                            size="mini"
                            @click="handleEdit(scope.row.orderNo, '4')">取消</el-button>
                    <el-button v-if="scope.row.schedule==='2'"
                               size="mini"
                               type="primary"
                               @click="handleEdit(scope.row.orderNo, '3')">确认收货</el-button>
                    <el-button v-if="showDel(scope.row.schedule)"
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.orderNo)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import storage from "@/storage";

    export default {
        name: "Table",
        data() {
            return {
                id:-1,
                orderData:[],
                multipleSelection: [],
            }
        },
        mounted(){
            this.id = storage.get("user").id;
            this.getData();
        },
        filters:{
            formatDate(val){
                return val.substring(0,10);
            },
            formatSchedule(val){
                const i = parseInt(val);
                switch (i) {
                    case 1:return "待发货";
                    case 2:return "已发货";
                    case 3:return "交易成功";
                    case 4:return "交易取消";
                    default:return "数据错误";
                }
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleEdit(id, no) {
                let msg = "确认取消交易吗？";
                (no==="3")&&(msg="是否确认收货?");
                this.confirmMsg(msg,this.putAction,{orderNo:id,schedule:no});
            },
            handleDelete(id) {
                this.confirmMsg("是否删除此订单!",this.delAction,id);
            },
            putAction(data){
                let msg = "取消成功！请联系商家退款";
                (data.schedule==="3")&&(msg="收货成功！");
                this.$http.put("/order/order",data)
                    .then(res=>{
                        this.showSuccessMsg(msg);
                    })
                    .catch(res=>console.log(res));
            },
            delAction(id){
                this.$http.delete("/order/order?orderNo="+id,{data:{orderNo:id}})
                    .then(()=>this.showSuccessMsg("删除成功!"))
                    .catch(res=>console.log(res));
            },
            showSuccessMsg(msg){
                this.$message({
                    showClose: true,
                    message: msg||'操作成功！',
                    type: 'success',
                    duration:1500,
                    onClose:this.getData
                });
            },
            showDel(val){
                const i = parseInt(val);
                return i > 2;

            },
            showCancel(val){
                const i = parseInt(val);
                return i < 3;

            },
            confirmMsg(msg,callback,data) {
                this.$confirm(msg||'此操作是敏感行为, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    (typeof callback === 'function')&&(callback(data));
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '操作已取消'
                    });
                });
            },
            getData(){
                this.$http.get("/order/order",{
                    params:{
                        uid:this.id
                    }
                })
                    .then(res=>{
                        this.orderData.splice(0,this.orderData.length);
                        res.data.data.forEach(item=>{
                            this.orderData.push(item);
                        });
                    })
                    .catch(res=>{console.log(res);});
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
