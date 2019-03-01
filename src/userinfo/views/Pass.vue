<template>
    <div class="div-router">
        <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px">
            <el-form-item label="原密码" prop="pwd">
                <el-input type="password" v-model="form.pwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
                <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repass">
                <el-input v-model="form.repass" type="password"></el-input>
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

    export default {
        name: "Pass",
        data() {
            const validateRepwd = (rule, value, callback) => {
                console.log("re",value);
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            const validatePwd = (rule, value, callback) => {
                console.log("p",value);
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else if (value === this.form.pwd) {
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
                    pwd: '',
                    password: '',
                    repass: '',
                },
                rules: {
                    pwd: [
                        {required: true, message: '请输入原密码', trigger: 'blur'},
                        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
                    ],
                    password: [{validator: validatePwd, trigger: 'blur'}],
                    repass: [
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
                        this.$http.post("/shop/testurl2",data)
                            .then(res=>{console.log(res);})
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
