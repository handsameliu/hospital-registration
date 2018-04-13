<template>
    <div class="registerOperation">
        <div class="title-box">
            > 患者挂号列表
        </div>
        <div class="register-left">
            <p>挂号基本信息</p>
            <el-form ref="form" :model="form" label-width="80px" >
                <el-form-item label="就诊科室">
                    <el-select v-model="form.departmentId" placeholder="请选择科室" @change="filterDoctor">
                        <el-option
                            v-for="item in departments"
                            :key="item._id"
                            :label="item.name"
                            :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="就诊医生">
                    <el-radio-group v-model="form.doctorId">
                        <el-radio border 
                        v-for="(showDepDoc, key) in showDepartmentDoctors" 
                        :key="key"
                        :label="showDepDoc._id"
                        @change="filterDoctorPrice(showDepDoc.title)">
                        {{showDepDoc.username}}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="就诊日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.visitDate" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="就诊时间">
                    <el-radio-group v-model="form.visitDateStage">
                        <el-radio label="0" >上午</el-radio>
                        <el-radio label="1" >下午</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="form.price" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="register-right">
            <p>
                患者信息
                <el-button type="primary" @click="addPatientInfo">添加患者信息</el-button>
            </p>
            <el-form ref="form" :model="form" label-width="80px" >
                <el-form-item label="患者姓名">
                    <el-input v-model="form.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="form.cardId" disabled></el-input>
                </el-form-item>
                <el-form-item label="社保卡号">
                    <el-input v-model="form.socialSecurityId" disabled></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="form.mobile" disabled></el-input>
                </el-form-item>
                <el-form-item label="联系地址">
                    <el-input type="textarea" v-model="form.address" disabled></el-input>
                </el-form-item>
            </el-form>   
        </div>
        <el-dialog title="添加患者信息" :visible.sync="addDialogVisible" center>
            <el-form :model="searchForm" :inline="true">
                <el-form-item label="患者身份证号">
                    <el-input v-model="searchForm.cardId" ></el-input>
                </el-form-item>
                <el-form-item label="患者社保卡号">
                    <el-input v-model="searchForm.socialSecurityId" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="searchLoading" @click="selectPatientInfo">查询</el-button>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="addForm" label-width="80px">
                <el-form-item label="患者姓名">
                    <el-input v-model="addForm.name" ></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="addForm.cardId" ></el-input>
                </el-form-item>
                <el-form-item label="社保卡号">
                    <el-input v-model="addForm.socialSecurityId" ></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="addForm.mobile" ></el-input>
                </el-form-item>
                <el-form-item label="联系地址">
                    <el-input v-model="addForm.address" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAddPatientSubmit">取 消</el-button>
                <el-button type="info" @click="addPatientSubmit" :loading="addLoading">添加新患者</el-button>
                <el-button type="primary" @click="getInfoToRegisterUse" :loading="addLoading">使 用</el-button>
            </span>
        </el-dialog>
        <el-button type="primary" @click="registerAddSubmit">立即创建</el-button>
    </div>
</template>

<script>
import tools from '../lib/tools'
export default {
    name: 'RegisterOperation',
    data () {
        return {
            addLoading: false,
            searchLoading: false,
            addDialogVisible: false,
            departments: [],
            departmentDoctors: [],
            showDepartmentDoctors: [],
            form: {
                departmentId: '',
                visitDate: '',
                visitDateStage: '',
                doctorId: '',
                price: 0,
                name: '',
                cardId: '',
                socialSecurityId: '',
                mobile: '',
                address: ''

            },
            searchForm: {
                cardId: '',
                socialSecurityId: ''
            },
            addForm: {
                name: '',
                cardId: '',
                socialSecurityId: '',
                mobile: '',
                address: ''
            }
        }
    },
    mounted () {
        this.selectDepartment()
        this.selectDepartmentDoctor()
    },
    methods: {
        selectDepartment () {
            let _this = this
            this.$http.axios({method: 'GET', url: '/api/getDepartmentList'}).then((result) => {
                if (result && result.data) {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        _this.departments = result.result
                    } else {
                        _this.$message.error(result.message, result.error_code)
                    }
                } else {
                    console.error(result)
                    _this.$message.error('发生错误，请稍后重试')
                }
            }).catch((error) => {
                console.log('我error了')
                console.error(error)
            })
        },
        selectDepartmentDoctor () {
            let _this = this
            this.$http.axios({method: 'GET', url: '/api/searchUser?pageNum=1&pageSize=100'}).then((result) => {
                if (result && result.data) {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        _this.departmentDoctors = result.result.data
                    } else {
                        _this.$message.error(result.message, result.error_code)
                    }
                } else {
                    console.error(result)
                    _this.$message.error('发生错误，请稍后重试')
                }
            }).catch((error) => {
                console.log('我error了')
                console.error(error)
            })
        },
        filterDoctor () {
            let _this = this
            let departmentId = _this.form.departmentId
            _this.showDepartmentDoctors = []
            _this.departmentDoctors.forEach((item, index) => {
                if (item.department._id === departmentId) {
                    _this.showDepartmentDoctors.push(item)
                }
            })
        },
        filterDoctorPrice (title) {
            this.form.price = title.price || 50
        },
        addPatientInfo () {
            this.addDialogVisible = true
        },
        cancelAddPatientSubmit () {
            this.addDialogVisible = false
        },
        addPatientSubmit () {
            let _this = this
            // && this.addForm.socialSecurityId    社保卡号 可以没有
            this.addForm.userId = tools.getCookie('_id')
            if (!(this.addForm.name && this.addForm.cardId && this.addForm.mobile && this.addForm.address)) {
                return this.$message.error('请将页面信息填写完整')
            }
            this.addLoading = true
            this.$http.axios({method: 'POST', url: '/api/addPatient', data: this.addForm}).then((result) => {
                result = result.data
                if (result.error_code === 0 && result.message === 'SUCCESS') {
                    // _this.form.name = _this.addForm.name
                    // _this.form.cardId = _this.addForm.cardId
                    // _this.form.socialSecurityId = _this.addForm.socialSecurityId
                    // _this.form.mobile = _this.addForm.mobile
                    // _this.form.address = _this.addForm.address
                    // _this.form.userId = _this.addForm.userId
                    this.addForm._id = result.result
                    _this.$message({
                        message: '添加患者成功',
                        type: 'success'
                    })
                    _this.getInfoToRegister()
                } else {
                    _this.$message.error(result.message, result.error_code)
                }
                _this.addLoading = false
            }).catch((error) => {
                console.log('我error')
                console.error(error)
                _this.addLoading = false
                _this.addDialogVisible = false
            })
        },
        selectPatientInfo () {
            let _this = this
            if (!this.searchForm.cardId || !this.searchForm.socialSecurityId) {
                if (!(this.searchForm.cardId || this.searchForm.socialSecurityId)) {
                    return this.$message.error('请填写搜索条件')
                }
            }
            let url = '?'
            if (this.searchForm.cardId) {
                url += `cardId=${this.searchForm.cardId}&`
            }
            if (this.searchForm.socialSecurityId) {
                url += `socialSecurityId=${this.searchForm.socialSecurityId}&`
            }
            this.$http.axios({method: 'GET', url: '/api/getPatientList' + url}).then((result) => {
                result = result.data
                if (result.error_code === 0 && result.message === 'SUCCESS') {
                    console.log(result.result)
                    if (result.result && result.result.length > 0) {
                        _this.addForm._id = result.result[0]._id
                        _this.addForm.name = result.result[0].name
                        _this.addForm.cardId = result.result[0].cardId
                        _this.addForm.socialSecurityId = result.result[0].socialSecurityId
                        _this.addForm.mobile = result.result[0].mobile
                        _this.addForm.address = result.result[0].address
                        _this.addForm.userId = result.result[0].userId
                    }
                } else {
                    console.error(result.message)
                    _this.$message.error(result.message, result.error_code)
                }
            }).catch((error) => {
                console.log('我error了')
                console.error(error)
            })
        },
        registerAddSubmit () {
            let _this = this
            if (!(this.form.name && this.form.cardId && this.form.mobile && this.form.address && this.form.departmentId && this.form.visitDate && this.form.visitDateStage && this.form.doctorId && this.form.price)) {
                return this.$message.error('请将页面信息填写完整')
            }
            this.addLoading = true
            this.$http.axios({
                method: 'POST',
                url: '/api/addRegister',
                data: {
                    patient: {
                        name: this.form.name,
                        cardId: this.form.cardId,
                        socialSecurityId: this.form.socialSecurityId,
                        address: this.form.address,
                        mobile: this.form.mobile,
                        userId: this.form.userId
                    },
                    register: {
                        patientId: this.form.patientId,
                        departmentId: this.form.departmentId,
                        doctorId: this.form.doctorId,
                        visitDate: this.form.visitDate,
                        visitDateStage: this.form.visitDateStage,
                        type: 0,
                        price: this.form.price
                    }
                }
            }).then((result) => {
                result = result.data
                if (result.error_code === 0 && result.message === 'SUCCESS') {
                    _this.$message({
                        message: '挂号登记成功',
                        type: 'success'
                    })
                    _this.form.name = ''
                    _this.form.cardId = ''
                    _this.form.socialSecurityId = ''
                    _this.form.mobile = ''
                    _this.form.address = ''
                    _this.form.departmentId = ''
                    _this.form.visitDate = ''
                    _this.form.visitDateStage = ''
                    _this.form.doctorId = []
                    _this.form.price = 0
                } else {
                    _this.$message.error(result.message, result.error_code)
                }
            }).catch((error) => {
                console.log('error')
                console.error(error)
            })
        },
        getInfoToRegisterUse () {
            console.log(this.addForm._id)
            if (!this.addForm._id) {
                return this.$message.error('无当前用户，请点击新增患者')
            }
            this.form.patientId = this.addForm._id
            this.form.name = this.addForm.name
            this.form.cardId = this.addForm.cardId
            this.form.socialSecurityId = this.addForm.socialSecurityId
            this.form.mobile = this.addForm.mobile
            this.form.address = this.addForm.address
            this.form.userId = this.addForm.userId
            this.addDialogVisible = false
        }
    }
}
</script>
<style scoped>
    .registerOperation{
        width: 100%;
        height: 100%;
    }
    .register-left,.register-right{
        display: inline-block;
        width: 50%;
    }
    .register-left>p,.register-right>p{
        font-size: 18px;
        color: #606266;
        /* text-align: left; */
        /* padding-left: 11px; */
        padding-bottom: 15px;
    }
    .register-left{
        vertical-align: top;
    }
    .register-right{
        width: 48%;
        border-left: 1px solid #e6e6e6;
    }
</style>


