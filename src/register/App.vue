<template>
    <div>
        <LogAndSearch></LogAndSearch>
    <div class="mt-10" style="width: 460px;margin: 0 auto;">
        <el-form ref="ruleform" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="form.nickname"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repwd">
                <el-input v-model="form.repwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="tempSex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('ruleform')">立即创建</el-button>
                <el-button @click="backLog">返回登陆</el-button>
            </el-form-item>
        </el-form>
    </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Footer from "@/components/Footer";
    import LogAndSearch from "@/components/LogAndSearch";
    export default {
        name: "App",
        components: {LogAndSearch, Footer},
        data() {
            const validateRepwd = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请再次输入密码'));
                    } else if (value !== this.form.password) {
                        callback(new Error('两次输入密码不一致!'));
                    } else {
                        callback();
                    }
                };
            return {
                form: {
                    nickname: 'shoptest',
                    username: 'shop1',
                    password: 'shop123',
                    repwd: 'shop123',
                    sex: 1,
                },
                rules: {
                    nickname: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                        { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ],
                    repwd: [
                        { validator: validateRepwd, trigger: 'blur' }
                    ]
                }
            }
        },
        computed:{
            tempSex: {
                get(){
                   return this.form.sex?"男":"女";
                },
                set(value){
                    if (value==="男"){
                        this.form.sex =1;
                    } else {
                        this.form.sex =0;
                    }
                }
            }
        },
        methods: {
            onSubmit(formName) {
                const data = this.form;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('/shop/register',data,)
                            .then((res)=>{
                                this.$message({
                                    showClose: true,
                                    message: '操作成功，去登陆吧！',
                                    type: 'success',
                                    duration:1500,
                                    onClose:window.location = '/login.html'
                                });
                            })
                            .catch((err)=>{
                            console.log(err);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            backLog(){
                window.location = "/login.html"
            }
        }

    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
