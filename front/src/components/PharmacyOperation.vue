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
                <!-- <el-form-item label="就诊科室">
                    <el-input placeholder="科室" v-model="searchForm.department"></el-input>
                </el-form-item> -->
                <el-form-item label="就诊时间">
                    <el-radio-group v-model="searchForm.visitDateStage">
                        <el-radio label="0" >上午</el-radio>
                        <el-radio label="1" >下午</el-radio>
                        <el-radio label="999" >所有</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="就诊日期">
                    <el-col :span="10">
                        <el-date-picker type="date" placeholder="开始日期" v-model="searchForm.visitDateStart" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="10">
                        <el-date-picker type="date" placeholder="结束日期" v-model="searchForm.visitDateOver" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="">
                    <el-radio-group v-model="searchForm.status">
                        <el-radio label="2" >已取药</el-radio>
                        <el-radio label="1" >已缴费</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="searchLoading" @click="seachSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" border stripe height="450" style="width: 100%" v-loading="searchLoading">
            <el-table-column prop="createTime" label="创建时间">
                <template slot-scope="scope">
                    {{registerDate(scope.row.createTime, 'yyyy-MM-dd')}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="患者姓名">
            </el-table-column>
            <el-table-column prop="visitDate" label="就诊日期">
                <template slot-scope="scope">
                    {{registerDate(scope.row.visitDate, 'yyyy-MM-dd')}}
                </template>
            </el-table-column>
            <el-table-column prop="visitDateStage" label="就诊时间">
                <template slot-scope="scope">
                    {{scope.row.visitDateStage === 1 ? '下午' : '上午'}}
                </template>
            </el-table-column>
            <el-table-column prop="type" label="就诊状态">
                <template slot-scope="scope">
                    {{registerType(scope.row.type)}}
                </template>
            </el-table-column>
            <el-table-column prop="status" label="缴费情况">
                <template slot-scope="scope">
                    {{scope.row.status === 1 ? '已缴费' : scope.row.status === 2 ? '已取药' : '未缴费'}}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small"  @click="editById(scope.row)">配药</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="pagingObj.pageCount" :page-size="pagingObj.pageSize" class="pagination-box" @current-change="currentPageFn"></el-pagination>
        <el-dialog title="药品信息" :visible.sync="centerDialogVisible" width="60%" center :show-close="false">
            <el-table :data="medicineTableData" border show-summary :summary-method="getSummaries" stripe height="400" style="width: 100%" >
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column prop="name" label="药品名称">
                </el-table-column>
                <el-table-column prop="isOTC" label="药品类型">
                </el-table-column>
                <el-table-column prop="price" label="药品价格">
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
import tools from '../lib/tools'
export default {
    name: 'PharmacyOperation',
    data () {
        return {
            overLoading: false,
            searchLoading: false,
            centerDialogVisible: false,
            searchForm: {
                name: '',
                // department: '',
                visitDate: '',
                visitDateStage: '',
                type: '',
                status: 1
            },
            tableData: [],
            medicineTableData: [],
            pagingObj: {
                pageNumber: 1,
                pageSize: 10,
                pageCount: 1
            },
            registerId: ''
        }
    },
    mounted () {
        this.seachSubmit()
    },
    methods: {
        seachSubmit () {
            this.searchLoading = true
            let _this = this
            let url = '?type=4&'
            if (this.searchForm.name) {
                url += `name=${this.searchForm.name}&`
            }
            if (this.searchForm.visitDateStage) {
                url += `visitDateStage=${this.searchForm.visitDateStage}&`
            }
            if (this.searchForm.visitDateStart) {
                url += `visitDateStart=${this.searchForm.visitDateStart}&`
            }
            if (this.searchForm.visitDateOver) {
                url += `visitDateOver=${this.searchForm.visitDateOver}&`
            }
            if (!isNaN(this.searchForm.status)) {
                url += `status=${this.searchForm.status}&`
            }
            this.$http.axios({method: 'GET', url: '/api/getRegisterList' + url}).then((result) => {
                result = result.data
                if (result.error_code === 0 && result.message === 'SUCCESS') {
                    _this.tableData = result.result.data
                    _this.pagingObj.pageCount = result.result.pageCount
                    _this.centerDialogVisible = false
                } else {
                    console.log(result)
                    _this.$message.error(result.message)
                }
                _this.searchLoading = false
            }, (error) => {
                console.log(error)
                _this.searchLoading = false
            }).catch((error) => {
                console.log(error)
                _this.searchLoading = false
            })
        },
        currentPageFn (page) {
            console.log(`当前为第${page}页`)
            this.pagingObj.pageNumber = page
            this.seachSubmit()
        },
        editById (row) {
            console.log(row)
            let _this = this
            _this.medicineTableData = []
            row.medicine.forEach((item, index) => {
                _this.medicineTableData.push({name: item.name, isOTC: item.isOTC === 1 ? '是' : '否', price: item.price})
            })
            _this.registerId = row._id
            this.centerDialogVisible = true
        },
        overSubmit () {
            let _this = this
            this.$confirm('确认配药已完成并发放？')
            .then(_ => {
                _this.overLoading = true
                _this.$http.axios({method: 'POST', url: '/api/editRegister', data: {_id: _this.registerId, status: 2}}).then((result) => {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        _this.$message({
                            message: '取药成功，请提醒患者拿好所有物品',
                            type: 'success'
                        })
                        _this.seachSubmit()
                    }
                    _this.overLoading = false
                    _this.centerDialogVisible = false
                }, (error) => {
                    console.log(error)
                }).catch((error) => {
                    console.error(error)
                })
            })
            .catch(_ => {
                this.overLoading = false
            })
        },
        getSummaries (param) {
            const { columns, data } = param
            const sums = []
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总价'
                    return
                }
                const values = data.map(item => Number(item[column.property]))
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr)
                        if (!isNaN(value)) {
                            return prev + curr
                        } else {
                            return prev
                        }
                    }, 0)
                    sums[index] += ' 元'
                } else {
                    sums[index] = 'N/A'
                }
            })
            return sums
        },
        registerDate (date, type) {
            return tools.simpleDateFormat(date, type)
        },
        registerType (type) {
            let returnType = ''
            switch (type) {
            case 0 :
                returnType = '未分诊'
                break
            case 1 :
                returnType = '已分诊等待就诊'
                break
            case 2 :
                returnType = '就诊中'
                break
            case 3 :
                returnType = '挂起'
                break
            case 4 :
                returnType = '就诊完毕'
                break
            default : break
            }
            return returnType
        }
    }

}
</script>

