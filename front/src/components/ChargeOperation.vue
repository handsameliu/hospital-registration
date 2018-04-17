<template>
    <div class="chargeOpration">
        <div class="title-box">
            > 划价/收费
        </div>
        <div class="opration-buttons-box">
            <el-form :inline="true">
                <el-form-item label="患者姓名">
                    <el-input placeholder="姓名" v-model="searchForm.name"></el-input>
                </el-form-item>
                <!-- <el-form-item label="就诊科室">
                    <el-select placeholder="就诊科室" v-model="searchForm.department">
                        <el-option
                            v-for="item in departments"
                            :key="item._id"
                            :label="item.name"
                            :value="item._id">
                        </el-option>
                    </el-select>
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
                <el-form-item label="是否已收费">
                    <el-radio-group v-model="searchForm.status">
                        <el-radio label="0" >未缴费</el-radio>
                        <el-radio label="1" >已缴费</el-radio>
                        <el-radio label="999" >所有</el-radio>
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
                    {{scope.row.status === 1 ? '已缴费' : '未缴费'}}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small"  @click="editById(scope.row)">划价</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="pagingObj.pageCount" :page-size="pagingObj.pageSize" class="pagination-box" @current-change="currentPageFn"></el-pagination>
        <el-dialog title="费用信息" :visible.sync="centerDialogVisible" width="60%" center :show-close="false">
            <el-table :data="priceTableData" border stripe show-summary :summary-method="getSummaries" height="400" style="width: 100%" >
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column prop="name" label="收费项目">
                </el-table-column>
                <el-table-column prop="price" label="价格">
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false" :loading="overLoading">取 消</el-button>
                <el-button type="primary" @click="overSubmit" :loading="overLoading">确认收费</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import tools from '../lib/tools'
export default {
    name: 'ChargeOpration',
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
                status: 0
            },
            pagingObj: {
                pageNumber: 1,
                pageSize: 10,
                pageCount: 1
            },
            tableData: [
                {
                    createTime: '',
                    name: '',
                    visitDate: '',
                    visitDateStage: '',
                    type: ''
                }, {
                    createTime: '',
                    name: '',
                    visitDate: '',
                    visitDateStage: '',
                    type: ''
                }, {
                    createTime: '',
                    name: '',
                    visitDate: '',
                    visitDateStage: '',
                    type: ''
                }, {
                    createTime: '',
                    name: '',
                    visitDate: '',
                    visitDateStage: '',
                    type: ''
                }, {
                    createTime: '',
                    name: '',
                    visitDate: '',
                    visitDateStage: '',
                    type: ''
                }, {
                    createTime: '',
                    name: '',
                    visitDate: '',
                    visitDateStage: '',
                    type: ''
                }
            ],
            priceTableData: [],
            departments: [],
            registerId: ''
        }
    },
    mounted () {
        this.doctorId = tools.getCookie('_id')
        this.seachSubmit()
        this.selectDepartment()
    },
    methods: {
        seachSubmit () {
            this.searchLoading = true
            let _this = this
            let url = '?type=4&'
            if (this.searchForm.name) {
                url += `name=${this.searchForm.name}&`
            }
            if (this.searchForm.department) {
                url += `department=${this.searchForm.department}&`
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
            if (row.status === 1) {
                return this.$message.error('已缴费，无法操作')
            }
            this.centerDialogVisible = true
            this.registerId = row._id
            console.log(row)
            let _this = this
            _this.priceTableData = []
            row.test.forEach((testItem, index) => {
                _this.priceTableData.push({name: testItem.name, price: testItem.price})
            })
            row.medicine.forEach((mdcItem, index) => {
                _this.priceTableData.push({name: mdcItem.name, price: mdcItem.price})
            })
        },
        overSubmit () {
            let _this = this
            this.$confirm('确认完成收费？')
            .then(_ => {
                _this.overLoading = true
                _this.$http.axios({method: 'POST', url: '/api/editRegister', data: {_id: _this.registerId, status: 1}}).then((result) => {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        _this.$message({
                            message: '缴费成功',
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
            }).catch(_ => {
                _this.overLoading = false
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
        selectDepartment () {
            let _this = this
            this.$http.axios({method: 'GET', url: '/api/getDepartmentList'}).then((result) => {
                if (result && result.data) {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        _this.departments = result.result
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

