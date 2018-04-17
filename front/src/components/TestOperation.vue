<template>
    <div class="testOperation">
        <div class="title-box">
            > 体检医师接诊操作
        </div>
        <div class="opration-buttons-box">
            <el-form :inline="true">
                <el-form-item label="患者姓名">
                    <el-input placeholder="姓名" v-model="searchForm.name"></el-input>
                </el-form-item>
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
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small"  @click="editById(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="pagingObj.pageCount" :page-size="pagingObj.pageSize" class="pagination-box" @current-change="currentPageFn"></el-pagination>
        <el-dialog title="接诊信息" :visible.sync="centerDialogVisible" width="60%" center >
            <el-form :inline="true" :model="infoForm" label-width="80px">
                <el-form-item label="患者姓名">
                    <el-input v-model="infoForm.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="接诊日期">
                    <el-input v-model="infoForm.visitDate" disabled></el-input>
                </el-form-item>
                <el-form-item label="接诊时间">
                    <el-input v-model="infoForm.visitDateStage" disabled></el-input>
                </el-form-item>
                <el-form-item label="当前状态">
                    <el-input v-model="infoForm.type" disabled></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="infoForm" label-width="80px">
                <el-form-item label="体检结果">
                    <el-input type="textarea" v-for="(test, key) in infoForm.testResults" :key="key" v-model="test.result"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAddSubmit">取 消</el-button>
                <el-button type="primary" @click="addTestResult" :loading="addLoading">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import tools from '../lib/tools'
export default {
    name: 'TestOperation',
    data () {
        return {
            doctorId: '',
            addLoading: false,
            searchLoading: false,
            centerDialogVisible: false,
            searchForm: {
                name: '',
                visitDate: '',
                visitDateStage: '999'
            },
            infoForm: {
                testResults: ''
            },
            tableData: [],
            testData: [],
            medicineRestaurants: [],
            testRestaurants: [],
            pagingObj: {
                pageCount: 1,
                pageNumber: 1,
                pageSize: 10
            }
        }
    },
    methods: {
        seachSubmit () {
            this.searchLoading = true
            let _this = this
            const query = {}
            if (this.searchForm.name) {
                query.name = this.searchForm.name
            }
            if (this.searchForm.visitDateStage) {
                query.visitDateStage = this.searchForm.visitDateStage
            }
            if (this.searchForm.visitDateStart) {
                query.visitDateStart = this.searchForm.visitDateStart
            }
            if (this.searchForm.visitDateOver) {
                query.visitDateOver = this.searchForm.visitDateOver
            }
            query.doctorId = this.doctorId
            this.$http.axios({method: 'POST', url: '/api/getRegisterByTestAndDoctor', data: query}).then((result) => {
                result = result.data
                if (result.error_code === 0 && result.message === 'SUCCESS') {
                    _this.tableData = result.result.data
                    _this.pagingObj.pageCount = result.result.pageCount
                    _this.testData = result.result.testData
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
        cancelAddSubmit () {
            this.centerDialogVisible = false
        },
        addTestResult () {
            this.addLoading = true
            // let that = this
            // setTimeout(function () {
            //     that.addLoading = false
            //     that.centerDialogVisible = false
            // }, 2000)
            console.log(this.infoForm)
            let _this = this
            this.$http.axios({method: 'POST', url: '/api/editRegister', data: {_id: this.infoForm._id, testResults: this.infoForm.testResults}}).then((result) => {
                result = result.data
                if (result.error_code === 0 && result.message === 'SUCCESS') {
                    _this.$message({
                        message: '保存成功',
                        type: 'success'
                    })
                    _this.centerDialogVisible = false
                    _this.addLoading = false
                    _this.seachSubmit()
                } else {
                    console.warn(result)
                    _this.$message.error(result.message)
                    _this.addLoading = false
                }
            }, (error) => {
                console.warn(error)
                _this.addLoading = false
            }).catch((error) => {
                console.warn(error)
                _this.addLoading = false
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
            this.infoForm._id = row._id
            this.infoForm.name = row.name
            this.infoForm.visitDate = this.registerDate(row.visitDate, 'yyyy-MM-dd')
            this.infoForm.visitDateStage = row.visitDateStage === '0' ? '上午' : '下午'
            this.infoForm.type = this.registerType(row.type)
            if (row.testResults && row.testResults.length > 0) {
                this.infoForm.testResults = row.testResults
            } else {
                const repeats = []
                row.test.forEach((item, index) => {
                    _this.testData.forEach((test, index) => {
                        if (item._id === test._id) {
                            repeats.push({_id: item._id, result: item.name + ' : '})
                        }
                    })
                })
                this.infoForm.testResults = repeats
            }
            this.centerDialogVisible = true
        },
        // 过滤药物
        queryMedicineSearch (queryString, cb) {
            var restaurants = this.medicineRestaurants
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
            // 调用 callback 返回建议列表的数据
            cb(results)
        },
        // 过滤体检项
        queryTestSearch (queryString, cb) {
            var restaurants = this.testRestaurants
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
            // 调用 callback 返回建议列表的数据
            cb(results)
        },
        createFilter (queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
            }
        },
        medicineHandleSelect (item) {
            this.infoForm.medicine.push(item)
        },
        testHandleSelect (item) {
            this.infoForm.test.push(item)
        },
        loadAllMedicines () {
            return [
                { _id: 1, value: '阿莫西林', desc: 'otc' },
                { _id: 2, value: '阿司匹林', desc: 'otc' },
                { _id: 3, value: '逍遥丸', desc: 'otc' },
                { _id: 4, value: '六味地黄丸', desc: 'otc' },
                { _id: 5, value: '板蓝根', desc: 'otc' }
            ]
        },
        loadAllTests () {
            return [
                { _id: 1, value: '鼻腔镜', desc: 'otc' },
                { _id: 2, value: '胃镜', desc: 'otc' },
                { _id: 3, value: '过敏原', desc: 'otc' },
                { _id: 4, value: '血脂六项', desc: 'otc' },
                { _id: 5, value: 'CT', desc: 'otc' }
            ]
        },
        closeMedicineTagFn (tag) {
            this.infoForm.medicine = this.infoForm.medicine.filter((item) => {
                return !(item._id === tag._id)
            })
        },
        closeTestTagFn (tag) {
            this.infoForm.test = this.infoForm.test.filter((item) => {
                return !(item._id === tag._id)
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
    },
    mounted () {
        this.medicineRestaurants = this.loadAllMedicines()
        this.testRestaurants = this.loadAllTests()
        this.doctorId = tools.getCookie('_id')
        this.seachSubmit()
    }
}
</script>
<style scoped>
    .my-autocomplete li {
        line-height: normal;
        padding: 7px;
    }
    .my-autocomplete li .name{
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .my-autocomplete li .addr {
        font-size: 12px;
        color: #b4b4b4;
    }
    .my-autocomplete li .highlighted .addr {
        color: #ddd;
    }
</style>

