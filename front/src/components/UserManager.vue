<template>
    <div class="userManager">
        <div class="title-box">
            > 用户管理
        </div>
        <div class="opration-buttons-box">
            <el-form :inline="true">
                <el-form-item label="姓名">
                    <el-input placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="科室">
                    <el-input placeholder="科室"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select placeholder="状态">
                        <el-option label="封禁" :value="-1"></el-option>
                        <el-option label="正常" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" >查询</el-button>
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
        <el-pagination background layout="prev, pager, next" :total="1000" class="pagination-box"></el-pagination>
        <el-dialog title="新增用户" :visible.sync="centerDialogVisible" width="60%" center>
            <span>需要注意的是内容是默认不居中的</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
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
    }
}
</script>
<style scoped>
    .userManager{
        width: 100%;
        height: 100%;
    }
</style>
