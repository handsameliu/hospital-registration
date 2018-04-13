<template>
    <div class="moduleManager">
        <div class="title-box">
            > 系统模块管理
        </div>
        <div class="opration-buttons-box">
            <el-form :inline="true">
                <el-form-item label="模块名称">
                    <el-input placeholder="模块名称" v-model="searchForm.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="当前状态">
                    <el-select placeholder="当前状态" v-model="searchForm.status">
                        <el-option label="所有" :value="999"></el-option>
                        <el-option label="正常" :value="0"></el-option>
                        <el-option label="废弃" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="searchLoading" @click="searchData">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="centerDialogVisible = true">新增模块</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" v-loading="tableLoading" border stripe height="500" style="width: 100%">
            <el-table-column prop="name" label="模块名称">
            </el-table-column>
            <el-table-column prop="status" label="模块状态">
            </el-table-column>
            <el-table-column prop="desc" label="备注">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editButton(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="新增系统模块" :visible.sync="centerDialogVisible" width="50%" center>
            <el-form ref="form" :model="addForm" label-width="80px">
                <el-form-item label="模块名称">
                    <el-input v-model="addForm.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="当前状态">
                    <el-select placeholder="当前状态" v-model="addForm.status">
                        <el-option label="正常" :value="0"></el-option>
                        <el-option label="废弃" :value="1"></el-option>
                    </el-select>
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
        <el-dialog title="修改系统模块信息" :visible.sync="editCenterDialogVisible" width="50%" center>
            <el-form ref="form" :model="editForm" label-width="80px">
                <el-form-item label="模块名称">
                    <el-input v-model="editForm.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="当前状态">
                    <el-select placeholder="当前状态" v-model="editForm.status">
                        <el-option label="正常" :value="0"></el-option>
                        <el-option label="废弃" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="editForm.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editCancelAddSubmit">取 消</el-button>
                <el-button type="primary" @click="editSubmit" :loading="addLoading">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'ModuleManager',
    data () {
        return {
            addLoading: false,
            tableLoading: false,
            searchLoading: false,
            centerDialogVisible: false,
            editCenterDialogVisible: false,
            searchForm: {
                name: '',
                status: 999,
                desc: ''
            },
            addForm: {
                name: '',
                status: 0,
                desc: ''
            },
            editForm: {
                _id: '',
                name: '',
                status: '',
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
            this.addForm.status = ''
            this.addForm.desc = ''
        },
        addSubmit () {
            let _this = this
            if (!(_this.addForm.name && !isNaN(_this.addForm.status))) {
                return _this.$message.error('请将页面信息填写完整')
            }
            _this.addLoading = true
            this.$http.axios({method: 'POST', url: '/api/addModule', data: _this.addForm}).then((result) => {
                if (result && result.data) {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        _this.$message({
                            message: '新增模块成功',
                            type: 'success'
                        })
                        _this.centerDialogVisible = false
                        _this.searchData()
                    } else {
                        let message = ''
                        if (result.message === 'params invalid') {
                            message = '请将页面信息填写完整'
                        } else if (result.message === 'module repeat') {
                            message = '模块重复，请重新填写'
                        }
                        _this.$message.error(message || result.message)
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
            let url = ''
            if (this.searchForm.name) {
                url += 'name=' + this.searchForm.name + '&'
            }
            if (!isNaN(this.searchForm.status)) {
                url += 'status=' + this.searchForm.status + '&'
            }
            // if (this.searchForm.desc) {
            //     url += 'desc=' + this.searchForm.desc + '&'
            // }
            this.$http.axios({method: 'GET', url: '/api/getModuleList?' + url}).then((result) => {
                if (result && result.data) {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        _this.tableData = result.result.map((item, index) => {
                            const obj = {}
                            obj._id = item._id
                            obj.name = item.name
                            obj.status = item.status === 0 ? '正常' : '屏蔽'
                            obj.desc = item.desc
                            obj.updateTime = item.updateTime
                            obj.createTime = item.createTime
                            return obj
                        })
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
        editButton (row) {
            console.log(row)
            this.editForm._id = row._id
            this.editForm.name = row.name
            this.editForm.status = row.status === '正常' ? 0 : 1
            this.editForm.desc = row.desc
            this.editCenterDialogVisible = true
        },
        editCancelAddSubmit () {
            this.editCenterDialogVisible = false
            this.editForm._id = ''
            this.editForm.name = ''
            this.editForm.status = 0
            this.editForm.desc = ''
        },
        editSubmit () {
            let _this = this
            if (!(_this.editForm.name && !isNaN(_this.editForm.status))) {
                return _this.$message.error('请将页面信息填写完整')
            }
            this.addLoading = true
            this.$http.axios({method: 'POST', url: '/api/editModule', data: _this.editForm}).then((result) => {
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
                        if (result.message === 'department repeat') {
                            message = '科室重复，请填写其他'
                        } else if (result.message === 'module repeat') {
                            message = '模块重复，请重新填写'
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
    .moduleManager{
        width: 100%;
        height: 100%;
    }
</style>

