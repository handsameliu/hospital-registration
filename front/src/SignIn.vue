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
    import tools from './lib/tools'
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
                let _this = this
                this.$http.axios({method: 'POST', url: '/api/signIn', data: {username: _this.form.username, password: _this.form.password}}).then((result) => {
                    if (result && result.data) {
                        let data = result.data
                        if (data.error_code === 0 && data.message === 'SUCCESS') {
                            _this.meta(data.result)
                        } else {
                            _this.$message.error(data.message, data.error_code)
                        }
                    } else {
                        console.error(result)
                        _this.$message.error('发生错误，请稍后重试')
                    }
                }).catch((error) => {
                    console.log('我error了')
                    console.error(error)
                })
                // this.$message.error('用户名或密码错误，请重新输入')
            },
            meta (data) {
                let _this = this
                this.$http.axios({method: 'GET', url: '/api/logingMate?_id=' + data._id + '&title=' + data.title}).then((result) => {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        console.log(result.result)
                        tools.setCookie('username', data.username)
                        tools.setCookie('_id', data._id)
                        sessionStorage.setItem('meta', JSON.stringify(result.result))
                        tools.next('/')
                    } else {
                        _this.$message.error(result.message, result.error_code)
                    }
                }).catch((error) => {
                    console.log('我error了')
                    console.error(error)
                })
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
