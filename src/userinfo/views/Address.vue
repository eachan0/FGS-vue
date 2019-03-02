<template>
    <div class="div-router">
        <el-form :model="addr_form" ref="addr_form" label-width="100px">
            <el-form-item
                    v-for="(address, index) in addr_form.addreses"
                    :label="`地址${index+1}`">
                <el-input v-model="address.value"></el-input>
                <el-button v-if="index" @click.prevent="removeaddress(address)">删除</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('addr_form')">提交</el-button>
                <el-button @click="addaddress">新增地址</el-button>
                <el-button @click="resetForm('addr_form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import storage from "@/storage";

    export default {
        name: "Address",
        data() {
            return {
                addr_form: {
                    addreses: []
                },
                id:-1
            };
        },
        mounted(){
            this.id = storage.get("user").id;
            if (this.id>0){
                this.getAddressInfo();
            }
        },
        methods: {
            submitForm(formName) {
                const arr = this.addr_form.addreses;
                if(arr.every(item=>item.value)){
                    let str = arr.reduce(function (a,b) {return {value:a.value+"<>"+b.value}}).value;
                    this.$http.post("/shop/address",{
                        userId:this.id,
                        address:str
                    })
                        .then(res=>{
                            this.$message({
                                showClose: true,
                                message: '修改成功！',
                                type: 'success'
                            });
                        })
                        .catch(err=>{
                            console.log(err);
                        });
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            removeaddress(item) {
                var index = this.addr_form.addreses.indexOf(item)
                if (index !== -1) {
                    this.addr_form.addreses.splice(index, 1)
                }
            },
            addaddress() {
                this.addr_form.addreses.push({
                    value: ''
                });
            },
            getAddressInfo(){
                this.$http.get("/shop/address/"+this.id).then(res=>{
                    let _this = this;
                    let arr_add = res.data.data.address.split("<>");
                    if (arr_add.length ===0){
                        this.addr_form.addreses.push({"value":""});
                        return true;
                    }
                    const fn = function(val){
                        _this.addr_form.addreses.push({"value":val});
                    };
                    let arr = arr_add.map(fn);
                }).catch(res=>{
                    this.addr_form.addreses.push({"value":""});
                    console.log(res);
                });
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
