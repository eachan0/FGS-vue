<template>
    <div class="div-router"  style="margin-left: 40px;">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="form.nickname" required="true"></el-input>
            </el-form-item>
            <el-form-item label="性别" >
                <el-radio-group v-model="tempsex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import storage from "@/storage";

    export default {
        name: "User",
        data() {
            return {
                rules: {
                    nickname: [{ required: true, message: '昵称不能为空', trigger: 'blur' }]
                },
                form: {
                    id:'',
                    username: '',
                    nickname: '',
                    sex: '',
                }
            }
        },
        mounted(){
            const user = storage.get("user");
            this.form.username = user.username;
            this.form.nickname = user.nickname;
            this.form.sex = user.sex;
            this.form.id = user.id;
        },
        computed:{
            tempsex:{
                get(){
                    return this.form.sex?"男":"女";
                },
                set(val){
                    if (val==="男"){
                        this.form.sex = 1;
                    } else{
                        this.form.sex = 0;
                    }
                }
            }
        },
        methods: {
            onSubmit() {
                this.$refs["form"].validate((valid) => {
                    if (valid) {
                        this.$http.post("/shop/putinfo",this.form)
                            .then(res=>{
                                this.setUser();
                                this.$message({
                                    showClose: true,
                                    message: '修改成功！',
                                    type: 'success'
                                });
                            })
                            .catch(err=>{
                                console.log(err);
                            });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            setUser(){
                const user = storage.get("user");
                user.nickname = this.form.nickname;
                user.sex = this.form.sex;
                storage.set("user",user);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
