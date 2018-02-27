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
                    <el-input placeholder="科室" v-model="searchForm.department"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select placeholder="状态" v-model="searchForm.title">
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
        <el-table :data="tableData" border stripe height="500" style="width: 100%">
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
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="1000" class="pagination-box" @current-change="currentPageFn"></el-pagination>
        <el-dialog title="新增用户" :visible.sync="centerDialogVisible" width="50%" center>
            <el-form ref="form" :model="addForm" label-width="80px">
                <el-form-item label="用户名称">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="科室">
                    <el-select v-model="addForm.department" placeholder="请选择所在科室">
                        <el-option label="妇科" value="shanghai"></el-option>
                        <el-option label="耳鼻喉" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职称">
                    <el-select v-model="addForm.title" placeholder="请选择当前职称">
                        <el-option label="主治医师" value="shanghai"></el-option>
                        <el-option label="药师" value="beijing"></el-option>
                    </el-select>
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
    name: 'UserManager',
    data () {
        return {
            centerDialogVisible: false,
            searchLoading: false,
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
            tableData: [{
                username: '王小虎',
                department: '耳鼻喉',
                title: '主治医师',
                status: '在职',
                createTime: '2016-05-02'
            }, {
                username: '王小虎',
                department: '耳鼻喉',
                title: '主治医师',
                status: '在职',
                createTime: '2016-05-02'
            }, {
                username: '王小虎',
                department: '耳鼻喉',
                title: '主治医师',
                status: '在职',
                createTime: '2016-05-02'
            }, {
                username: '王小虎',
                department: '耳鼻喉',
                title: '主治医师',
                status: '在职',
                createTime: '2016-05-02'
            }, {
                username: '王小虎',
                department: '耳鼻喉',
                title: '主治医师',
                status: '在职',
                createTime: '2016-05-02'
            }, {
                username: '王小虎',
                department: '耳鼻喉',
                title: '主治医师',
                status: '在职',
                createTime: '2016-05-02'
            }, {
                username: '王小虎',
                department: '耳鼻喉',
                title: '主治医师',
                status: '在职',
                createTime: '2016-05-02'
            }, {
                username: '王小虎',
                department: '耳鼻喉',
                title: '主治医师',
                status: '在职',
                createTime: '2016-05-02'
            }, {
                username: '王小虎',
                department: '耳鼻喉',
                title: '主治医师',
                status: '在职',
                createTime: '2016-05-02'
            }, {
                username: '王小虎',
                department: '耳鼻喉',
                title: '主治医师',
                status: '在职',
                createTime: '2016-05-02'
            }, {
                username: '王小虎',
                department: '耳鼻喉',
                title: '主治医师',
                status: '在职',
                createTime: '2016-05-02'
            }, {
                username: '王小虎',
                department: '耳鼻喉',
                title: '主治医师',
                status: '在职',
                createTime: '2016-05-02'
            }, {
                username: '王小虎',
                department: '耳鼻喉',
                title: '主治医师',
                status: '在职',
                createTime: '2016-05-02'
            }, {
                username: '王小虎',
                department: '耳鼻喉',
                title: '主治医师',
                status: '在职',
                createTime: '2016-05-02'
            }]
        }
    },
    methods: {
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
        },
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
