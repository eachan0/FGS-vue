<template>
    <div class="div-router">
        <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px">
            <el-form-item label="原密码" prop="oldPass">
                <el-input type="password" v-model="form.oldPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPass">
                <el-input type="password" v-model="form.newPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="rePass">
                <el-input v-model="form.rePass" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import storage from "@/storage";
    import PubSub from "pubsub-js";
    export default {
        name: "Pass",
        data() {
            const validateRepwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.newPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            const validatePwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else if (value === this.form.oldPass) {
                    callback(new Error('不能使用原密码'));
                } else if (value.length < 6 || value.length > 16) {
                    callback(new Error('长度在 6 到 16 个字符'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    id:'',
                    oldPass: '123456',
                    newPass: '123123',
                    rePass: '123123',
                },
                rules: {
                    oldPass: [
                        {required: true, message: '请输入原密码', trigger: 'blur'},
                        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
                    ],
                    newPass: [{validator: validatePwd, trigger: 'blur'}],
                    rePass: [
                        {validator: validateRepwd, trigger: 'blur'}
                    ]
                }
            };
        },
        mounted(){
            this.form.id = storage.get("user").id;
        },
        methods: {
            submitForm() {
                const data = this.form;
                this.$refs["form"].validate((valid) => {
                    if (valid) {
                        this.$http.post("user/changepwd",data)
                            .then(res=>{
                                this.$message({
                                    showClose: true,
                                    message: '修改成功！请重新登陆',
                                    type: 'success'
                                });
                                PubSub.publish("doLogout");
                            })
                            .catch(err=>{console.log(err);});
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm() {
                this.$refs["form"].resetFields();
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
