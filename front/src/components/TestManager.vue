<template>
    <div class="testManager">
         <div class="title-box">
            > 体检项管理
        </div>
        <div class="opration-buttons-box">
            <el-form :inline="true" label-position="left">
                <el-form-item label="体检项名称">
                    <el-input placeholder="体检项名称" v-model="searchForm.name"></el-input>
                </el-form-item>
                <el-form-item label="所在科室">
                    <el-select placeholder="所在科室" v-model="searchForm.departmentId">
                        <el-option label="是" value="0"></el-option>
                        <el-option label="否" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input placeholder="价格" v-model="searchForm.price"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select placeholder="状态" v-model="searchForm.status">
                        <el-option label="正常" :value="0"></el-option>
                        <el-option label="暂停" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input placeholder="备注" v-model="searchForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="searchLoading" @click="seachSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="centerDialogVisible = true">新增体检项</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" border stripe height="450" style="width: 100%">
            <el-table-column prop="name" label="体检项名称">
            </el-table-column>
            <el-table-column prop="departmentId" label="所在科室">
            </el-table-column>
            <el-table-column prop="price" label="价格">
            </el-table-column>
            <el-table-column prop="status" label="状态">
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
        <el-dialog title="新增体检项目" :visible.sync="centerDialogVisible" width="50%" center>
            <el-form ref="form" :model="addForm" label-width="80px">
                <el-form-item label="项目名称">
                    <el-input placeholder="体检项名称" v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="所在科室">
                    <el-select placeholder="所在科室" v-model="addForm.departmentId">
                        <el-option label="是" :value="true"></el-option>
                        <el-option label="否" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input placeholder="价格" v-model="addForm.price"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select placeholder="状态" v-model="addForm.status">
                        <el-option label="正常" :value="0"></el-option>
                        <el-option label="暂停" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input placeholder="备注" v-model="addForm.desc"></el-input>
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
    name: 'TestManager',
    data () {
        return {
            searchLoading: false,
            centerDialogVisible: false,
            addLoading: false,
            addForm: {
                name: '',
                departmentId: false,
                price: 0,
                status: 0,
                desc: ''
            },
            searchForm: {
                name: '',
                departmentId: false,
                price: 0,
                status: 0,
                desc: ''
            },
            tableData: [
                {
                    name: '',
                    departmentId: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }, {
                    name: '',
                    departmentId: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }, {
                    name: '',
                    departmentId: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }, {
                    name: '',
                    departmentId: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }, {
                    name: '',
                    departmentId: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }, {
                    name: '',
                    departmentId: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }, {
                    name: '',
                    departmentId: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }, {
                    name: '',
                    departmentId: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }, {
                    name: '',
                    departmentId: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }, {
                    name: '',
                    departmentId: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }, {
                    name: '',
                    departmentId: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }, {
                    name: '',
                    departmentId: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }
            ]
        }
    },
    methods: {
        seachSubmit () {
            this.searchLoading = true
            console.log(this.searchForm)
            let that = this
            setTimeout(function () {
                that.searchLoading = false
            }, 2000)
        },
        currentPageFn (val) {
            console.log(`当前页${val}`)
        },
        addSubmit () {
            this.addLoading = true
            console.log(this.addForm)
            let that = this
            setTimeout(function () {
                that.addLoading = false
                that.centerDialogVisible = false
            }, 2000)
        },
        cancelAddSubmit () {
            this.centerDialogVisible = false
            this.addForm.username = ''
            this.addForm.department = ''
            this.addForm.title = ''
        }
    }
}
</script>

