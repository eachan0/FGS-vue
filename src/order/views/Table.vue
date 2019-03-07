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
                            @click="handleEdit(scope.$index, scope.row)">取消</el-button>
                    <el-button v-if="showDel(scope.row.schedule)"
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
                    case 1:return "已付款";
                    case 2:return "已发货";
                    case 3:return "交易成功";
                    case 4:return "交易取消";
                }
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            showDel(val){
                const i = parseInt(val);
                return i > 2;

            },
            showCancel(val){
                const i = parseInt(val);
                return i < 3;

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
