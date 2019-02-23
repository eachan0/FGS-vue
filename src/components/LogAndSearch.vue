<template>
    <div class="my-media-width">
        <el-row>
            <el-col :sm="8" :xs="8" :md="8" :lg="8" :xl="8">
                <img src="@/assets/log.png" alt="" class="w-100-p my-log-img">
            </el-col>
            <el-col :sm="16" :xs="16" :md="16" :lg="16" :xl="16" class="mt-30">
                <!--<el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="全部" value="1"></el-option>
                        <el-option label="热销" value="2"></el-option>
                        <el-option label="新品" value="3"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>-->
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "LogAndSearch",
        data(){
            return {
                select:null,
                input5:null
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
