<template>
    <div class="titleManager">
        <div class="title-box">
            > 职称管理
        </div>
        <div class="opration-buttons-box">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary" @click="centerDialogVisible = true">新增职称</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" border stripe height="500" style="width: 100%">
            <el-table-column prop="name" label="职称名称">
            </el-table-column>
            <el-table-column prop="price" label="挂号价格">
            </el-table-column>
            <el-table-column prop="desc" label="备注">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editButton(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="新增职称" :visible.sync="centerDialogVisible" width="50%" center>
            <el-form ref="form" :model="addForm" label-width="80px">
                <el-form-item label="职称名称">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="挂号价格">
                    <el-input v-model="addForm.price"></el-input>
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
        <el-dialog title="修改职称信息" :visible.sync="editCenterDialogVisible" width="50%" center>
            <el-form ref="form" :model="editForm" label-width="80px">
                <el-form-item label="职称名称">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="挂号价格">
                    <el-input v-model="editForm.price"></el-input>
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
    name: 'TitleManager',
    data () {
        return {
            addLoading: false,
            centerDialogVisible: false,
            editCenterDialogVisible: false,
            addForm: {
                name: '',
                price: '',
                desc: ''
            },
            editForm: {
                _id: '',
                name: '',
                price: '',
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
            this.addForm.price = 0
            this.addForm.desc = ''
        },
        cancelEditSubmit () {
            this.editCenterDialogVisible = false
            this.editForm._id = ''
            this.editForm.name = ''
            this.editForm.price = 0
            this.editForm.desc = ''
        },
        addSubmit () {
            let _this = this
            _this.addLoading = true
            if (!(_this.addForm.name && _this.addForm.price)) {
                return _this.$message.error('请将职位名称及就诊金额填写完整')
            }
            this.$http.axios({method: 'POST', url: '/api/addTitle', data: _this.addForm}).then((result) => {
                if (result && result.data) {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        _this.$message({
                            message: '新增职称成功',
                            type: 'success'
                        })
                        _this.centerDialogVisible = false
                        _this.searchData()
                    } else {
                        let message = ''
                        if (result.message === 'params invalid') {
                            message = '请将页面信息填写完整'
                        } else if (result.message === 'title repeat') {
                            message = '职称重复，请填写其他名称'
                        } else if (result.message === 'addTitle error') {
                            message = '添加职称错误'
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
            let _this = this
            this.tableLoading = true
            this.$http.axios({method: 'GET', url: '/api/getTitleList'}).then((result) => {
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
        editButton (row) {
            this.editCenterDialogVisible = true
            this.editForm._id = row._id
            this.editForm.name = row.name
            this.editForm.price = row.price
            this.editForm.desc = row.desc
        },
        editSubmit () {
            let _this = this
            if (!(_this.editForm.name && !isNaN(_this.editForm.price))) {
                return _this.$message.error('请将页面信息填写完整')
            }
            this.addLoading = true
            this.$http.axios({method: 'POST', url: '/api/editTitle', data: _this.editForm}).then((result) => {
                if (result && result.data) {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        _this.$message({
                            message: '修改成功',
                            type: 'success'
                        })
                        _this.searchData()
                        _this.cancelEditSubmit()
                    } else {
                        let message = ''
                        if (result.message === 'title repeat') {
                            message = '科室重复，请填写其他'
                        }
                        _this.$message.error(message || result.message)
                    }
                    _this.addLoading = false
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
    .titleManager{
        width: 100%;
        height: 100%;
    }
</style>

