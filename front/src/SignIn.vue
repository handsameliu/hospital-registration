<template>
    <div id="signIn">
        <el-container style="height:100%;">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>医院挂号系统登录</span>
                </div>
                <el-form ref="form" :model="form" :rules="rules" status-icon label-width="80px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="form.username" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="密 码" prop="password">
                        <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item style="padding-left:19%;">
                        <el-button @click="resetForm('form')">重置</el-button>
                        <el-button type="primary" @click="loading">登 录</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'signIn',
        data () {
            // var validatePass = (rule, value, callback) => {
            //     console.log(value)
            //     if (value === '') {
            //         callback(new Error('请输入密码'))
            //     } else {
            //         callback()
            //     }
            // }
            return {
                form: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入正确的用户名', trigger: 'blur' }
                    ],
                    password: [
                        // { validator: validatePass, trigger: 'blur' }
                        { required: true, message: '请输入正确的密码', trigger: 'blur' },
                        { min: 6, max: 18, message: '长度在6-18位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            resetForm (formName) {
                this.$refs[formName].resetFields()
            },
            loading () {
                this.$message.error('用户名或密码错误，请重新输入')
            }
        }
    }
</script>

<style src="../static/css/reset.css" ></style>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
        height: 230px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }

</style>
