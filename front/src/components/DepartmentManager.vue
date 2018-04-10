<template>
    <div class="departmentManager">
        <div class="title-box">
            > 科室管理
        </div>
        <div class="opration-buttons-box">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary" @click="centerDialogVisible = true">新增科室</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" v-loading="tableLoading" border stripe height="500" style="width: 100%">
            <el-table-column prop="name" label="科室名称">
            </el-table-column>
            <el-table-column prop="address" label="科室所在位置">
            </el-table-column>
            <el-table-column prop="desc" label="备注">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editButton(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="新增科室" :visible.sync="centerDialogVisible" width="50%" center>
            <el-form ref="form" :model="addForm" label-width="80px">
                <el-form-item label="科室名称">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="所在位置">
                    <el-input v-model="addForm.address"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="addForm.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAddSubmit">取 消</el-button>
                <el-button type="primary" @click="addSubmit" :loading="addLoading">创 建</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改科室信息" :visible.sync="editCenterDialogVisible" width="50%" center>
            <el-form ref="form" :model="editForm" label-width="80px">
                <el-form-item label="科室名称">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="所在位置">
                    <el-input v-model="editForm.address"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="editForm.desc"></el-input>
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
export default {
    name: 'DepartmentManager',
    data () {
        return {
            tableLoading: false,
            addLoading: false,
            centerDialogVisible: false,
            editCenterDialogVisible: false,
            addForm: {
                name: '',
                address: '',
                desc: ''
            },
            editForm: {
                name: '',
                address: '',
                desc: ''
            },
            tableData: []
        }
    },
    mounted () {
        this.searchData()
    },
    methods: {
        cancelAddSubmit () {
            this.centerDialogVisible = false
            this.addForm.name = ''
            this.addForm.address = ''
            this.addForm.desc = ''
        },
        addSubmit () {
            let _this = this
            _this.addLoading = true
            if (!(_this.addForm.name && _this.addForm.address)) {
                return _this.$message.error('请将科室名称及地址填写完整')
            }
            this.$http.axios({method: 'POST', url: '/api/addDepartment', data: _this.addForm}).then((result) => {
                if (result && result.data) {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        _this.$message({
                            message: '新增科室成功',
                            type: 'success'
                        })
                        _this.centerDialogVisible = false
                        _this.searchData()
                    } else {
                        let message = ''
                        if (result.message === 'params invalid') {
                            message = '请将页面信息填写完整'
                        } else if (result.message === 'department repeat') {
                            message = '当前部门中已存在添加用户，请填写其他用户'
                        } else if (result.message === 'addDepartment error') {
                            message = '添加科室错误'
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
        searchData () {
            this.tableLoading = true
            let _this = this
            this.$http.axios({method: 'GET', url: '/api/getDepartmentList'}).then((result) => {
                if (result && result.data) {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        _this.tableData = result.result
                        console.log(_this.tableData)
                    } else {
                        _this.$message.error(result.message, result.error_code)
                    }
                    _this.tableLoading = false
                } else {
                    console.error(result)
                    _this.$message.error('发生错误，请稍后重试')
                    _this.tableLoading = false
                }
            }).catch((error) => {
                console.log('我error了')
                console.error(error)
                _this.tableLoading = false
            })
        },
        cancelEditSubmit () {
            this.editCenterDialogVisible = false
            this.editForm.name = ''
            this.editForm.address = ''
            this.editForm.desc = ''
        },
        editButton (row) {
            this.editCenterDialogVisible = true
            this.editForm._id = row._id
            this.editForm.name = row.name
            this.editForm.address = row.address
            this.editForm.desc = row.desc
        },
        editSubmit () {
            let _this = this
            if (!(_this.editForm.name && _this.editForm.address)) {
                return _this.$message.error('请将科室名称及地址填写完整')
            }
            this.addLoading = true
            this.$http.axios({method: 'POST', url: '/api/editDepartment', data: _this.editForm}).then((result) => {
                if (result && result.data) {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        _this.$message({
                            message: '修改成功',
                            type: 'success'
                        })
                        _this.searchData()
                        _this.addLoading = false
                        _this.editCenterDialogVisible = false
                    } else {
                        let message = ''
                        if(result.message === 'department repeat'){
                            message = '科室重复，请填写其他'
                        }
                        _this.$message.error(message || result.message)
                        _this.addLoading = false
                    }
                }
            }).catch((error) => {
                console.log('我error')
                console.log(error)
                _this.addLoading = false
                _this.editCenterDialogVisible = false
            })
        }
    }
}
</script>
<style scoped>
    .departmentManager{
        width: 100%;
        height: 100%;
    }
</style>