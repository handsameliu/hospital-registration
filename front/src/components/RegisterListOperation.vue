<template>
    <div class="registerListOperation">
        <div class="title-box">
            > 患者管理列表
        </div>
        <div class="opration-buttons-box">
            <el-form :inline="true">
                <el-form-item label="患者姓名">
                    <el-input placeholder="姓名" v-model="searchForm.name"></el-input>
                </el-form-item>
                <el-form-item label="就诊科室">
                    <el-select placeholder="就诊科室" v-model="searchForm.department" @change="filterDoctor">
                        <el-option
                            v-for="item in departments"
                            :key="item._id"
                            :label="item.name"
                            :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="主治医师">
                    <el-select placeholder="主治医师" v-model="searchForm.doctorId">
                        <el-option
                            v-for="showDepDoc in showDepartmentDoctors" 
                            :key="showDepDoc._id"
                            :label="showDepDoc.username"
                            :value="showDepDoc._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="就诊时间">
                    <el-radio-group v-model="searchForm.visitDateStage">
                        <el-radio label="0" >上午</el-radio>
                        <el-radio label="1" >下午</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="就诊日期">
                    <el-col :span="10">
                        <el-date-picker type="date" placeholder="开始日期" v-model="searchForm.visitDateStart" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="10">
                        <el-date-picker type="date" placeholder="结束日期" v-model="searchForm.visitDateOver" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="searchLoading" @click="seachSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" border stripe height="450" style="width: 100%" v-loading="searchLoading">
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column prop="name" label="患者姓名">
            </el-table-column>
            <el-table-column prop="cardId" label="身份证号">
            </el-table-column>
            <el-table-column prop="socialSecurityId" label="社保卡号">
            </el-table-column>
            <el-table-column prop="department" label="就诊科室">
                <template slot-scope="scope">
                    {{scope.row.departmentId.name}}
                </template>
            </el-table-column>
            <el-table-column prop="doctorId" label="主治医师">
                <template slot-scope="scope">
                    {{scope.row.doctorId.username}}
                </template>
            </el-table-column>
            <el-table-column prop="address" label="联系地址">
            </el-table-column>
            <el-table-column prop="mobile" label="联系方式">
            </el-table-column>
            <el-table-column prop="visitDate" label="就诊日期">
                <template slot-scope="scope">
                    {{registerDate(scope.row.visitDate, 'yyyy-MM-dd')}}
                </template>
            </el-table-column>
            <el-table-column prop="visitDateStage" label="就诊时间">
                <template slot-scope="scope">
                    {{scope.row.visitDateStage === 1 ? '下午' : '上午'}}
                </template>
            </el-table-column>
            <el-table-column prop="type" label="就诊状态">
                <template slot-scope="scope">
                    {{registerType(scope.row.type)}}
                </template>
            </el-table-column>
            <el-table-column prop="price" label="挂号付款">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small"  @click="editById(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="pagingObj.pageCount" :page-size="pagingObj.pageSize" class="pagination-box" @current-change="currentPageFn"></el-pagination>
        <el-dialog title="编辑用户挂号基本信息" :visible.sync="centerDialogVisible" width="50%" center>
            <span class="dialog-footer" style="text-align: center;display: block;padding-bottom: 20px;">
                <el-button @click="cancelCallbak">取 消</el-button>
                <el-button type="primary" @click="callbackNumber" :loading="addLoading">退 号</el-button>
            </span>
            <el-form ref="form" :model="editForm" label-width="80px">
                <el-form-item label="患者姓名">
                    <el-input v-model="editForm.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="editForm.cardId" disabled></el-input>
                </el-form-item>
                <el-form-item label="社保卡号">
                    <el-input v-model="editForm.socialSecurityId" disabled></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="editForm.mobile" disabled></el-input>
                </el-form-item>
                <el-form-item label="联系地址">
                    <el-input v-model="editForm.address" disabled></el-input>
                </el-form-item>
                <el-form-item label="接诊科室">
                    <el-input v-model="editForm.departmentId" disabled></el-input>
                </el-form-item>
                <el-form-item label="接诊医生">
                    <el-input v-model="editForm.doctorId" disabled></el-input>
                </el-form-item>
                <el-form-item label="接诊日期">
                    <el-input v-model="editForm.visitDate" disabled></el-input>
                </el-form-item>
                <el-form-item label="接诊时间">
                    <el-input v-model="editForm.visitDateStage" disabled></el-input>
                </el-form-item>
                <el-form-item label="当前状态">
                    <el-input v-model="editForm.type" disabled></el-input>
                </el-form-item>
                <el-form-item label="挂号价格">
                    <el-input v-model="editForm.price" disabled></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="editForm.desc" disabled></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import tools from '../lib/tools'
export default {
    name: 'RegisterListOperation',
    data () {
        return {
            addLoading: false,
            searchLoading: false,
            centerDialogVisible: false,
            searchForm: {
                name: '',
                department: '',
                doctorId: '',
                visitDateStart: '',
                visitDateOver: '',
                visitDateStage: ''
            },
            editForm: {
                name: '',
                cardId: '',
                socialSecurityId: '',
                mobile: '',
                address: '',
                departmentId: '',
                doctorId: '',
                visitDate: '',
                visitDateStage: '',
                type: '',
                price: '',
                desc: ''
            },
            tableData: [],
            pagingObj: {
                pageCount: 1,
                pageSize: 10,
                pageNumber: 1
            },
            departments: [],
            departmentDoctors: [],
            showDepartmentDoctors: [],
            outNumber: 4
        }
    },
    mounted () {
        this.selectDepartment()
        this.selectDepartmentDoctor()
        this.seachSubmit()
    },
    methods: {
        seachSubmit () {
            this.searchLoading = true
            let _this = this
            let url = '?pageNumber=' + this.pagingObj.pageNumber + '&pageSize=' + this.pagingObj.pageSize + '&'
            url += `name=${this.searchForm.name}&`
            url += `department=${this.searchForm.department}&`
            url += `doctorId=${this.searchForm.doctorId}&`
            url += `visitDateStart=${this.searchForm.visitDateStart}&`
            url += `visitDateOver=${this.searchForm.visitDateOver}&`
            url += `visitDateStage=${this.searchForm.visitDateStage}&`
            this.$http.axios({method: 'GET', url: '/api/getRegisterList' + url}).then((result) => {
                result = result.data
                if (result.error_code === 0 && result.message === 'SUCCESS') {
                    _this.tableData = result.result.data
                    _this.pagingObj.pageCount = result.result.pageCount
                    _this.centerDialogVisible = false
                } else {
                    console.log(result.message)
                    _this.$message.error(result.message, result.error_code)
                }
                _this.searchLoading = false
            }, (error) => {
                console.log('error')
                console.error(error)
                _this.searchLoading = false
                _this.$message.error(error)
            }).catch((error) => {
                console.log('catch error')
                console.error(error)
                _this.searchLoading = false
                _this.$message.error(error)
            })
        },
        cancelCallbak () {
            this.editForm._id = ''
            this.editForm.name = ''
            this.editForm.cardId = ''
            this.editForm.socialSecurityId = ''
            this.editForm.mobile = ''
            this.editForm.address = ''
            this.editForm.departmentId = ''
            this.editForm.doctorId = ''
            this.editForm.visitDate = ''
            this.editForm.visitDateStage = ''
            this.outNumber = ''
            this.editForm.type = ''
            this.editForm.price = ''
            this.editForm.desc = ''
            this.centerDialogVisible = false
        },
        currentPageFn (page) {
            console.log(`当前为第${page}页`)
            this.pagingObj.pageNumber = page
            this.seachSubmit()
        },
        editById (row) {
            this.editForm._id = row._id
            this.editForm.name = row.name
            this.editForm.cardId = row.cardId
            this.editForm.socialSecurityId = row.socialSecurityId
            this.editForm.mobile = row.mobile
            this.editForm.address = row.address
            this.editForm.departmentId = row.departmentId.name || ''
            this.editForm.doctorId = row.doctorId.username || ''
            this.editForm.visitDate = this.registerDate(row.visitDate, 'yyyy-MM-dd')
            this.editForm.visitDateStage = row.visitDateStage === 0 ? '上午' : '下午'
            this.outNumber = row.type
            this.editForm.type = this.registerType(row.type)
            this.editForm.price = row.price
            this.editForm.desc = row.desc
            this.centerDialogVisible = true
        },
        registerType (type) {
            let returnType = ''
            switch (type) {
            case 0 :
                returnType = '未分诊'
                break
            case 1 :
                returnType = '已分诊等待就诊'
                break
            case 2 :
                returnType = '就诊中'
                break
            case 3 :
                returnType = '挂起'
                break
            case 4 :
                returnType = '就诊完毕'
                break
            default : break
            }
            return returnType
        },
        registerDate (date, type) {
            return tools.simpleDateFormat(date, type)
        },
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
            let department = _this.searchForm.department
            _this.showDepartmentDoctors = []
            _this.departmentDoctors.forEach((item, index) => {
                if (item.department._id === department) {
                    _this.showDepartmentDoctors.push(item)
                }
            })
        },
        callbackNumber () {
            let _this = this
            console.log(this.outNumber, this.outNumber === 0)
            if (this.outNumber * 1 === 0) {
                this.$confirm('确认退号？')
                .then(_ => {
                    _this.$http.axios({method: 'POST', url: '/api/editRegister', data: {_id: _this.editForm._id, type: 1}}).then((result) => {
                        result = result.data
                        if (result.error_code === 0 && result.message === 'SUCCESS') {
                            for (let i = 0; i < _this.tableData.length; i++) {
                                if (_this.tableData[i]._id === _this.editForm._id) {
                                    _this.tableData[i].type = 4
                                    _this.centerDialogVisible = false
                                    _this.outNumber = 4
                                    _this.$message({
                                        message: '退号成功，可退款',
                                        type: 'success'
                                    })
                                    _this.editForm._id = ''
                                    _this.editForm.name = ''
                                    _this.editForm.cardId = ''
                                    _this.editForm.socialSecurityId = ''
                                    _this.editForm.mobile = ''
                                    _this.editForm.address = ''
                                    _this.editForm.departmentId = ''
                                    _this.editForm.doctorId = ''
                                    _this.editForm.visitDate = ''
                                    _this.editForm.visitDateStage = ''
                                    _this.outNumber = ''
                                    _this.editForm.type = ''
                                    _this.editForm.price = ''
                                    _this.editForm.desc = ''
                                    return
                                }
                            }
                        } else {
                            console.log(result)
                            _this.$message.error(result.message)
                        }
                    }).catch((error) => {
                        console.log(error)
                        console.log('error')
                    })
                }).catch(_ => {
                    // 取消的方法
                })
            } else {
                this.$message.error('当前状态已无法退号')
            }
        }
    }
}
</script>

