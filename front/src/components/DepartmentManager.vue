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
        <el-table :data="tableData" border stripe height="500" style="width: 100%">
            <el-table-column prop="name" label="科室名称">
            </el-table-column>
            <el-table-column prop="address" label="科室所在位置">
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
    </div>
</template>

<script>
export default {
    name: 'DepartmentManager',
    data () {
        return {
            addLoading: false,
            centerDialogVisible: false,
            addForm: {
                name: '',
                address: '',
                desc: ''
            },
            tableData: [
                {
                    name: '',
                    address: '',
                    desc: ''
                }, {
                    name: '',
                    address: '',
                    desc: ''
                }, {
                    name: '',
                    address: '',
                    desc: ''
                }, {
                    name: '',
                    address: '',
                    desc: ''
                }, {
                    name: '',
                    address: '',
                    desc: ''
                }, {
                    name: '',
                    address: '',
                    desc: ''
                }, {
                    name: '',
                    address: '',
                    desc: ''
                }, {
                    name: '',
                    address: '',
                    desc: ''
                }, {
                    name: '',
                    address: '',
                    desc: ''
                }, {
                    name: '',
                    address: '',
                    desc: ''
                }, {
                    name: '',
                    address: '',
                    desc: ''
                }, {
                    name: '',
                    address: '',
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