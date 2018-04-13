<template>
    <div class="jurisdictionManager">
        <div class="title-box">
            > 权限管理
        </div>
        <div class="opration-buttons-box">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary" @click="centerDialogVisible = true">新增权限</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" v-loading="tableLoading" border stripe height="500" style="width: 100%">
            <el-table-column prop="title" label="职称">
            </el-table-column>
            <el-table-column prop="module" label="模块">
            </el-table-column>
            <el-table-column prop="desc" label="备注">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editButton(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="新增权限" :visible.sync="centerDialogVisible" width="50%" center>
            <el-form ref="form" :model="addForm" label-width="80px">
                <el-form-item label="职称">
                    <el-select v-model="addForm.title" placeholder="请选择职称">
                        <el-option
                            v-for="item in titles"
                            :key="item._id"
                            :label="item.name"
                            :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="模块">
                    <el-checkbox-group v-model="addForm.module">
                        <el-checkbox
                            v-for="(md, key) in modules" 
                            :key="key"
                            :label="md._id"
                            :name="md._id"
                            >{{md.name}}
                        </el-checkbox>
                    </el-checkbox-group>
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
        <el-dialog title="修改权限" :visible.sync="editCenterDialogVisible" width="50%" center>
            <el-form ref="form" :model="editForm" label-width="80px">
                <el-form-item label="职称">
                    <el-select v-model="editForm.title" placeholder="请选择职称">
                        <el-option
                            v-for="item in titles"
                            :key="item._id"
                            :label="item.name"
                            :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="模块">
                    <el-checkbox-group v-model="editForm.module">
                        <el-checkbox
                            v-for="(md, key) in modules" 
                            :key="key"
                            :label="md._id"
                            :name="md._id"
                            >{{md.name}}
                        </el-checkbox>
                    </el-checkbox-group>
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
    name: 'JurisdictionManager',
    data () {
        return {
            addLoading: false,
            tableLoading: false,
            centerDialogVisible: false,
            editCenterDialogVisible: false,
            addForm: {
                title: '',
                module: [],
                desc: ''
            },
            editForm: {
                title: '',
                module: [],
                desc: ''
            },
            tableData: [],
            tableDataSource: [],
            titles: [],
            modules: []
        }
    },
    mounted () {
        this.selectTitles()
        this.selectModules()
        this.searchData()
    },
    methods: {
        cancelAddSubmit () {
            this.centerDialogVisible = false
            this.addForm.title = ''
            this.addForm.module = []
            this.addForm.desc = ''
        },
        addSubmit () {
            let _this = this
            _this.addLoading = true
            if (!(_this.addForm.title && (_this.addForm.module && _this.addForm.module.length > 0))) {
                return _this.$message.error('请将页面信息填写完整')
            }
            this.$http.axios({method: 'POST', url: '/api/addJurisdiction', data: _this.addForm}).then((result) => {
                if (result && result.data) {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        _this.$message({
                            message: '新增权限成功',
                            type: 'success'
                        })
                        _this.centerDialogVisible = false
                        _this.searchData()
                    } else {
                        let message = ''
                        if (result.message === 'params invalid') {
                            message = '请将页面信息填写完整'
                        } else if (result.message === 'jurisdiction repeat') {
                            message = '当前权限已存在，请填写其他'
                        } else if (result.message === 'addJurisdiction error') {
                            message = '添加权限错误'
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
            this.$http.axios({method: 'GET', url: '/api/getJurisdictionList'}).then((result) => {
                if (result && result.data) {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        _this.tableDataSource = result.result
                        _this.tableData = result.result.map((item, index) => {
                            const obj = {}
                            obj._id = item._id
                            obj.title = item.title.name
                            obj.module = ''
                            for (let i = 0; i < item.module.length; i++) {
                                obj.module += `${item.module[i].name},`
                                if (i === item.module.length - 1) {
                                    obj.module.sub(0, obj.module.length - 1)
                                }
                            }
                            obj.desc = item.desc
                            return obj
                        })
                        console.log(_this.tableData)
                        console.log(_this.tableDataSource)
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
        selectTitles () {
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
        selectModules () {
            let _this = this
            this.$http.axios({method: 'GET', url: '/api/getModuleList'}).then((result) => {
                if (result && result.data) {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        _this.modules = result.result
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
        cancelEditSubmit () {
            this.editCenterDialogVisible = false
            this.editForm._id = ''
            this.editForm.title = ''
            this.editForm.module = []
            this.editForm.desc = ''
        },
        editButton (row) {
            for (let obj of this.tableDataSource) {
                if (obj._id === row._id) {
                    this.editForm._id = obj._id
                    this.editForm.title = obj.title._id
                    this.editForm.module = obj.module.map((item, index) => {
                        let _id = item._id
                        return _id
                    })
                    this.editForm.desc = obj.desc
                    break
                }
            }
            console.log(this.editForm)
            this.editCenterDialogVisible = true
        },
        editSubmit () {
            let _this = this
            if (!(_this.editForm.title && _this.editForm.module && _this.editForm.module.length > 0)) {
                return _this.$message.error('请将页面信息填写完整')
            }
            this.addLoading = true
            this.$http.axios({method: 'POST', url: '/api/editJurisdiction', data: _this.editForm}).then((result) => {
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
                        if (result.message === 'jurisdiction repeat') {
                            message = '存在相同信息，请重新修改'
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
        }
    }
}
</script>

