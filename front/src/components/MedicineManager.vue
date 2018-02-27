<template>
    <div class="medicineManager">
        <div class="title-box">
            > 药品库存管理
        </div>
        <div class="opration-buttons-box">
            <el-form :inline="true" label-position="left">
                <el-form-item label="药品名称">
                    <el-input placeholder="药品名称" v-model="searchForm.name"></el-input>
                </el-form-item>
                <el-form-item label="处方药">
                    <el-select placeholder="处方药" v-model="searchForm.isOTC">
                        <el-option label="是" :value="true"></el-option>
                        <el-option label="否" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input placeholder="价格" v-model="searchForm.price"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select placeholder="状态" v-model="searchForm.status">
                        <el-option label="正常" :value="0"></el-option>
                        <el-option label="下架" :value="1"></el-option>
                        <el-option label="缺货" :value="2"></el-option>
                        <el-option label="补货中" :value="3"></el-option>
                        <el-option label="限制售卖" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input placeholder="描述" v-model="searchForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="searchLoading" @click="seachSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="centerDialogVisible = true">新增药品</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" border stripe height="450" style="width: 100%">
            <el-table-column prop="name" label="药品名称">
            </el-table-column>
            <el-table-column prop="isOTC" label="处方药">
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
        <el-dialog title="新增药品" :visible.sync="centerDialogVisible" width="50%" center>
            <el-form ref="form" :model="addForm" label-width="80px">
                <el-form-item label="药品名称">
                    <el-input v-model="addForm.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="处方药">
                    <el-select placeholder="处方药" v-model="addForm.isOTC">
                        <el-option label="是" :value="true"></el-option>
                        <el-option label="否" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input placeholder="价格" v-model="addForm.price" clearable></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select placeholder="状态" v-model="addForm.status">
                        <el-option label="正常" :value="0"></el-option>
                        <el-option label="下架" :value="1"></el-option>
                        <el-option label="缺货" :value="2"></el-option>
                        <el-option label="补货中" :value="3"></el-option>
                        <el-option label="限制售卖" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="addForm.desc" clearable></el-input>
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
    name: 'MedicineManager',
    data () {
        return {
            searchLoading: false,
            centerDialogVisible: false,
            addLoading: false,
            addForm: {
                name: '',
                isOTC: false,
                price: 0,
                status: 0,
                desc: ''
            },
            searchForm: {
                name: '',
                isOTC: false,
                price: 0,
                status: 0,
                desc: ''
            },
            tableData: [
                {
                    name: '',
                    isOTC: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }, {
                    name: '',
                    isOTC: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }, {
                    name: '',
                    isOTC: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }, {
                    name: '',
                    isOTC: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }, {
                    name: '',
                    isOTC: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }, {
                    name: '',
                    isOTC: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }, {
                    name: '',
                    isOTC: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }, {
                    name: '',
                    isOTC: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }, {
                    name: '',
                    isOTC: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }, {
                    name: '',
                    isOTC: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }, {
                    name: '',
                    isOTC: false,
                    price: 0,
                    status: 0,
                    desc: ''
                }, {
                    name: '',
                    isOTC: false,
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

