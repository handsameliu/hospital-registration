<template>
    <div class="userManager">
        <div class="title-box">
            > 用户管理
        </div>
        <div class="opration-buttons-box">
            <el-form :inline="true">
                <el-form-item label="姓名">
                    <el-input placeholder="姓名" v-model="searchForm.username"></el-input>
                </el-form-item>
                <el-form-item label="科室">
                    <el-select placeholder="科室" v-model="searchForm.department">
                        <el-option
                            v-for="item in departments"
                            :key="item._id"
                            :label="item.name"
                            :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职称">
                    <el-select placeholder="职称" v-model="searchForm.title">
                        <el-option
                            v-for="item in titles"
                            :key="item._id"
                            :label="item.name"
                            :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select placeholder="状态" v-model="searchForm.status">
                        <el-option label="封禁" :value="-1"></el-option>
                        <el-option label="正常" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="searchLoading" @click="seachSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="centerDialogVisible = true">新增用户</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" v-loading="tableLoading" border stripe height="500" style="width: 100%">
            <el-table-column prop="username" label="姓名">
            </el-table-column>
            <el-table-column prop="department" label="科室">
            </el-table-column>
            <el-table-column prop="title" label="职称">
            </el-table-column>
            <el-table-column prop="status" label="状态">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editButton(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="pagingObj.pageCount" :page-size="pagingObj.pageSize" class="pagination-box" @current-change="currentPageFn"></el-pagination>
        <el-dialog title="新增用户" :visible.sync="centerDialogVisible" width="50%" center>
            <el-form ref="form" :model="addForm" label-width="80px">
                <el-form-item label="用户名称">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="科室">
                    <el-select v-model="addForm.department" placeholder="请选择所在科室">
                        <el-option
                            v-for="(item, key) in departments"
                            :key="key"
                            :label="item.name"
                            :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职称">
                    <el-select v-model="addForm.title" placeholder="请选择当前职称">
                        <el-option
                            v-for="item in titles"
                            :key="item._id"
                            :label="item.name"
                            :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="状态">
                    <el-select v-model="addForm.status" placeholder="请选择当前状态">
                        <el-option label="封禁" :value="-1"></el-option>
                        <el-option label="正常" :value="0"></el-option>
                    </el-select>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAddSubmit">取 消</el-button>
                <el-button type="primary" @click="addSubmit" :loading="addLoading">创 建</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改用户信息" :visible.sync="editCenterDialogVisible" width="50%" center>
            <el-form ref="form" :model="editForm" label-width="80px">
                <el-form-item label="用户名称">
                    <el-input v-model="editForm.username"></el-input>
                </el-form-item>
                <el-form-item label="科室">
                    <el-select v-model="editForm.department" placeholder="请选择所在科室">
                        <el-option
                            v-for="(item, key) in departments"
                            :key="key"
                            :label="item.name"
                            :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职称">
                    <el-select v-model="editForm.title" placeholder="请选择当前职称">
                        <el-option
                            v-for="item in titles"
                            :key="item._id"
                            :label="item.name"
                            :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="editForm.status" placeholder="请选择当前状态">
                        <el-option label="封禁" :value="-1"></el-option>
                        <el-option label="正常" :value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelEditSubmit">取 消</el-button>
                <el-button type="primary" @click="editSubmit" :loading="addLoading">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import tools from '../lib/tools'
export default {
    name: 'UserManager',
    data () {
        return {
            centerDialogVisible: false,
            editCenterDialogVisible: false,
            searchLoading: false,
            tableLoading: false,
            addLoading: false,
            searchForm: {
                username: '',
                department: '',
                title: ''
            },
            addForm: {
                username: '',
                department: '',
                title: ''
            },
            editForm: {
                _id: '',
                username: '',
                department: '',
                title: '',
                status: ''
            },
            tableDataSource: [],
            tableData: [],
            departments: [],
            titles: [],
            pagingObj: {
                pageCount: 1,
                pageSize: 10,
                pageNumber: 1
            }
        }
    },
    mounted () {
        // let userId = tools.getCookie('_id')
        // let _this = this
        this.selectDepartment()
        this.selectTitle()
        this.seachSubmit()
    },
    methods: {
        addSubmit () {
            let _this = this
            if (!(_this.addForm.username && _this.addForm.department && _this.addForm.title)) {
                return _this.$message.error('请将页面信息填写完整')
            }
            this.addLoading = true
            this.$http.axios({method: 'POST', url: '/api/signUp', data: _this.addForm}).then((result) => {
                if (result && result.data) {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        _this.$message({
                            message: '新增用户成功',
                            type: 'success'
                        })
                        _this.centerDialogVisible = false
                        _this.seachSubmit()
                    } else {
                        let message = ''
                        if (result.message === 'params invalid') {
                            message = '请将页面信息填写完整'
                        } else if (result.message === 'user repeat') {
                            message = '当前部门中已存在添加用户，请填写其他用户'
                        }
                        _this.$message.error(message)
                    }
                    _this.addLoading = false
                }
            }).catch((error) => {
                console.log('我error')
                console.log(error)
                _this.addLoading = false
            })
        },
        cancelAddSubmit () {
            this.centerDialogVisible = false
            this.addForm.username = ''
            this.addForm.department = ''
            this.addForm.title = ''
        },
        seachSubmit () {
            this.searchLoading = true
            this.tableLoading = true
            let _this = this
            let url = '?pageNumber=' + this.pagingObj.pageNumber + '&pageSize=' + this.pagingObj.pageSize + '&'
            if (this.searchForm.username) {
                url += 'username=' + this.searchForm.username + '&'
            }
            if (this.searchForm.department) {
                url += 'department=' + this.searchForm.department + '&'
            }
            if (this.searchForm.title) {
                url += 'title=' + this.searchForm.title + '&'
            }
            if (!isNaN(this.searchForm.status)) {
                url += 'status=' + this.searchForm.status + '&'
            }
            this.$http.axios({method: 'GET', url: '/api/searchUser' + url}).then((result) => {
                if (result && result.data) {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        _this.tableDataSource = result.result.data
                        _this.tableData = result.result.data.map((item, index) => {
                            let obj = {}
                            obj._id = item._id
                            obj.username = item.username
                            obj.department = (item.department && item.department !== null) ? item.department.name : ''
                            obj.title = (item.title && item.title !== null) ? item.title.name : ''
                            obj.status = item.status === 0 ? '正常' : '封禁'
                            obj.createTime = tools.simpleDateFormat(item.createTime, 'yyyy-MM-dd')
                            return obj
                        })
                        _this.pagingObj.pageCount = result.result.pageCount
                        console.log(_this.tableDataSource)
                        console.log(_this.tableData)
                    } else {
                        _this.$message.error(result.message, result.error_code)
                    }
                    _this.searchLoading = false
                    _this.tableLoading = false
                } else {
                    console.error(result)
                    _this.$message.error('发生错误，请稍后重试')
                    _this.searchLoading = false
                    _this.tableLoading = false
                }
            }).catch((error) => {
                console.log('我error了')
                console.error(error)
                _this.searchLoading = false
                _this.tableLoading = false
            })
        },
        currentPageFn (val) {
            console.log(`当前页${val}`)
            this.pagingObj.pageNumber = val
            this.seachSubmit()
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
        selectTitle () {
            let _this = this
            this.$http.axios({method: 'GET', url: '/api/getTitleList'}).then((result) => {
                if (result && result.data) {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        _this.titles = result.result
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
        editButton (rowData) {
            for (let obj of this.tableDataSource) {
                if (obj._id === rowData._id) {
                    this.editForm._id = obj._id
                    this.editForm.username = obj.username
                    this.editForm.department = obj.department._id
                    this.editForm.title = obj.title._id
                    this.editForm.status = obj.status
                    break
                }
            }
            this.editCenterDialogVisible = true
        },
        editSubmit () {
            let _this = this
            if (!(_this.editForm.username && _this.editForm.department && _this.editForm.title && !isNaN(_this.editForm.status))) {
                return _this.$message.error('请将页面信息填写完整')
            }
            this.addLoading = true
            this.$http.axios({method: 'POST', url: '/api/updateUser', data: _this.editForm}).then((result) => {
                if (result && result.data) {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        _this.$message({
                            message: '修改成功',
                            type: 'success'
                        })
                        _this.seachSubmit()
                        _this.addLoading = false
                        _this.editCenterDialogVisible = false
                    } else {
                        let message = ''
                        if (result.message === 'infomation repeat') {
                            message = '存在相同信息人员，请重新修改'
                        }
                        _this.$message.error(message)
                        _this.addLoading = false
                    }
                }
            }).catch((error) => {
                console.log('我error')
                console.log(error)
                _this.addLoading = false
                _this.editCenterDialogVisible = false
            })
        },
        cancelEditSubmit () {
            this.editCenterDialogVisible = false
            this.editForm._id = ''
            this.editForm.username = ''
            this.editForm.department = ''
            this.editForm.title = ''
            this.editForm.status = ''
        }
    }
}
</script>
<style scoped>
    .userManager{
        width: 100%;
        height: 100%;
    }
</style>
