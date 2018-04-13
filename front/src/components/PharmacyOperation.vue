<template>
    <div class="pharmacyOperation">
        <div class="title-box">
            > 药师取药
        </div>
        <div class="opration-buttons-box">
            <el-form :inline="true">
                <el-form-item label="患者姓名">
                    <el-input placeholder="姓名" v-model="searchForm.name"></el-input>
                </el-form-item>
                <el-form-item label="就诊科室">
                    <el-input placeholder="科室" v-model="searchForm.department"></el-input>
                </el-form-item>
                <el-form-item label="就诊时间">
                    <el-radio-group v-model="searchForm.visitDateStage">
                        <el-radio label="上午" value="0"></el-radio>
                        <el-radio label="下午" value="1"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="就诊日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="searchForm.visitDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="是否已配药">
                    <el-switch v-model="searchForm.status">
                    </el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="searchLoading" @click="seachSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" border stripe height="450" style="width: 100%" v-loading="searchLoading">
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column prop="name" label="患者姓名">
            </el-table-column>
            <el-table-column prop="visitDate" label="就诊日期">
            </el-table-column>
            <el-table-column prop="visitDateStage" label="就诊时间">
            </el-table-column>
            <el-table-column prop="type" label="就诊状态">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small"  @click="editById">配药</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="1000" class="pagination-box" @current-change="currentPageFn"></el-pagination>
        <el-dialog title="药品信息" :visible.sync="centerDialogVisible" width="60%" center :show-close="false">
            <el-table :data="medicineTableData" border stripe height="400" style="width: 100%" >
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column prop="createTime" label="药品名称">
                </el-table-column>
                <el-table-column prop="createTime" label="药品类型">
                </el-table-column>
                <el-table-column prop="createTime" label="药品价格">
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false" :loading="overLoading">取 消</el-button>
                <el-button type="primary" @click="overSubmit" :loading="overLoading">完成配药</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'PharmacyOperation',
    data () {
        return {
            overLoading: false,
            searchLoading: false,
            centerDialogVisible: false,
            searchForm: {
                name: '',
                department: '',
                visitDate: '',
                visitDateStage: '',
                type: ''
            },
            tableData: [],
            medicineTableData: []
        }
    },
    methods: {
        seachSubmit () {
            this.searchLoading = true
            let that = this
            setTimeout(function () {
                that.searchLoading = false
                that.centerDialogVisible = false
            }, 1000)
        },
        currentPageFn (page) {
            console.log(`当前为第${page}页`)
        },
        editById () {
            this.centerDialogVisible = true
        },
        overSubmit () {
            let that = this
            this.$confirm('确认配药已完成？')
            .then(_ => {
                that.overLoading = true
                // done()
                setTimeout(function () {
                    this.overLoading = false
                    that.centerDialogVisible = false
                }, 1000)
            })
            .catch(_ => {
                this.overLoading = false
            })
        }
    }

}
</script>

