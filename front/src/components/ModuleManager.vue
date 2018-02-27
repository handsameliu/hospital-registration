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
                        <el-option label="正常" value="0"></el-option>
                        <el-option label="废弃" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="searchLoading" @click="seachSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="centerDialogVisible = true">新增模块</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" border stripe height="500" style="width: 100%">
            <el-table-column prop="name" label="模块名称">
            </el-table-column>
            <el-table-column prop="status" label="模块状态">
            </el-table-column>
            <el-table-column prop="desc" label="备注">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="1000" class="pagination-box" @current-change="currentPageFn"></el-pagination>
        <el-dialog title="新增系统模块" :visible.sync="centerDialogVisible" width="50%" center>
            <el-form ref="form" :model="addForm" label-width="80px">
                <el-form-item label="模块名称">
                    <el-input v-model="addForm.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="当前状态">
                    <el-select placeholder="当前状态" v-model="addForm.status">
                        <el-option label="正常" value="0"></el-option>
                        <el-option label="废弃" value="1"></el-option>
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
    </div>
</template>

<script>
export default {
    name: 'ModuleManager',
    data () {
        return {
            addLoading: false,
            searchLoading: false,
            centerDialogVisible: false,
            searchForm: {
                name: '',
                status: '',
                desc: ''
            },
            addForm: {
                name: '',
                status: '',
                desc: ''
            },
            tableData: [
                {
                    name: '',
                    status: '',
                    desc: ''
                }, {
                    name: '',
                    status: '',
                    desc: ''
                }, {
                    name: '',
                    status: '',
                    desc: ''
                }, {
                    name: '',
                    status: '',
                    desc: ''
                }, {
                    name: '',
                    status: '',
                    desc: ''
                }, {
                    name: '',
                    status: '',
                    desc: ''
                }, {
                    name: '',
                    status: '',
                    desc: ''
                }, {
                    name: '',
                    status: '',
                    desc: ''
                }, {
                    name: '',
                    status: '',
                    desc: ''
                }, {
                    name: '',
                    status: '',
                    desc: ''
                }, {
                    name: '',
                    status: '',
                    desc: ''
                }, {
                    name: '',
                    status: '',
                    desc: ''
                }
            ]
        }
    },
    methods: {
        currentPageFn (val) {
            console.log(`当前页${val}`)
        },
        cancelAddSubmit () {
            this.centerDialogVisible = false
        },
        addSubmit () {
            let that = this
            that.addLoading = true
            setTimeout(function () {
                that.addLoading = false
                that.centerDialogVisible = false
            }, 1500)
        },
        seachSubmit () {
            this.searchLoading = true
            console.log(this.searchForm)
            let that = this
            setTimeout(function () {
                that.searchLoading = false
            }, 2000)
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

