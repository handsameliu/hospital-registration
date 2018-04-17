<template>
    <div class="receptionOperation">
        <div class="title-box">
            > 医师接诊操作
        </div>
        <div class="opration-buttons-box">
            <el-form :inline="true">
                <el-form-item label="患者姓名">
                    <el-input placeholder="姓名" v-model="searchForm.name"></el-input>
                </el-form-item>
                <el-form-item label="就诊时间">
                    <el-radio-group v-model="searchForm.visitDateStage">
                        <el-radio label="0">上午</el-radio>
                        <el-radio label="1">下午</el-radio>
                        <el-radio label="999">所有</el-radio>
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
        <el-dialog title="接诊信息" :visible.sync="centerDialogVisible" width="60%" center top="3vh" @close="closeEditDialog">
            <el-form :inline="true" :model="editForm" label-width="80px">
                <el-form-item label="患者姓名">
                    <el-input v-model="editForm.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="接诊日期">
                    <el-input v-model="editForm.visitDate" disabled></el-input>
                </el-form-item>
                <el-form-item label="接诊时间">
                    <el-input v-model="editForm.visitDateStage" disabled></el-input>
                </el-form-item>
                <el-form-item label="当前状态">
                    <el-input v-model="editForm.type" disabled></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="editForm" label-width="80px">
                <el-form-item label="药物">
                    <el-autocomplete class="inline-input" popper-class="my-autocomplete" :fetch-suggestions="queryMedicineSearch" placeholder="请输入内容" :trigger-on-focus="false" @select="medicineHandleSelect" >
                        <template slot-scope="props">
                            <div class="name">{{ props.item.value }}</div>
                            <span class="addr">类型：{{ props.item.desc }}</span>
                        </template>
                    </el-autocomplete>
                </el-form-item>
                <el-form-item label="">
                    <el-tag v-for="(tag, key) in editForm.medicine" :key="key" closable @close="closeMedicineTagFn(tag)">{{tag.value}}</el-tag>
                </el-form-item>
                <el-form-item label="体检项">
                    <el-autocomplete class="inline-input" popper-class="my-autocomplete" :fetch-suggestions="queryTestSearch" placeholder="请输入内容" :trigger-on-focus="false" @select="testHandleSelect">
                        <template slot-scope="props">
                            <div class="name">{{ props.item.value }}</div>
                            <span class="addr">类型：{{ props.item.desc }}</span>
                        </template>
                    </el-autocomplete>
                </el-form-item>
                <el-form-item label="">
                    <el-tag v-for="(tag, key) in editForm.test" :key="key" closable @close="closeTestTagFn(tag)">{{tag.value}}</el-tag>
                </el-form-item>
                <el-form-item label="体检结果">
                    <!-- <i class="el-icon-circle-plus-outline" @click="appendTestResult"></i> -->
                    <el-input type="textarea" v-for="(tr, key) in editForm.testResults" :key="key" :value="tr.result"></el-input>
                </el-form-item>
                <el-form-item label="症状">
                    <el-input type="textarea" v-model="editForm.symptom" ></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="editForm.desc" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="editSubmit" :loading="addLoading">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import tools from '../lib/tools'
export default {
    name: 'ReceptionOperation',
    data () {
        return {
            addLoading: false,
            searchLoading: false,
            centerDialogVisible: false,
            searchForm: {
                name: '',
                visitDateStart: '',
                visitDateOver: '',
                visitDateStage: ''
            },
            editForm: {
                // name: '',
                // visitDate: '',
                // visitDateStage: '',
                // type: '',
                test: [],
                medicine: []
                // symptom: '',
                // testResults: []
                // desc: ''
            },
            tableData: [],
            medicineRestaurants: [],
            testRestaurants: [],
            doctorId: '',
            pagingObj: {
                pageNumber: 1,
                pageSize: 10,
                pageCount: 1
            }
        }
    },
    methods: {
        seachSubmit () {
            this.searchLoading = true
            let _this = this
            let url = `?pageNumber=${this.pagingObj.pageNumber}&pageSize=${this.pagingObj.pageSize}&doctorId=${this.doctorId}&`
            // url += `type=1&`
            if (this.searchForm.name) {
                url += `name=${this.searchForm.name}&`
            }
            if (this.searchForm.visitDateStart) {
                url += `visitDateStart=${this.searchForm.visitDateStart}&`
            }
            if (this.searchForm.visitDateOver) {
                url += `visitDateOver=${this.searchForm.visitDateOver}&`
            }
            if (this.searchForm.visitDateStage) {
                url += `visitDateStage=${this.searchForm.visitDateStage}&`
            }
            this.$http.axios({method: 'GET', url: '/api/getRegisterList' + url}).then((result) => {
                result = result.data
                if (result.error_code === 0 && result.message === 'SUCCESS') {
                    _this.tableData = result.result.data
                    _this.pagingObj.pageCount = result.result.pageCount
                    _this.centerDialogVisible = false
                } else {
                    console.log(result.message)
                    _this.$message.error(result.message, result.error_code)
                }
                _this.searchLoading = false
            }, (error) => {
                console.log('error')
                console.error(error)
                _this.searchLoading = false
                _this.$message.error(error)
            }).catch((error) => {
                console.log('catch error')
                console.error(error)
                _this.searchLoading = false
                _this.$message.error(error)
            })
        },
        cancel () {
            this.centerDialogVisible = false
            this.editForm._id = ''
            this.editForm.name = ''
            this.editForm.visitDate = ''
            this.editForm.visitDateStage = ''
            this.editForm.type = 1
            this.editForm.medicine = []
            this.editForm.test = []
            this.editForm.testResults = []
            this.editForm.symptom = ''
            this.editForm.desc = ''
        },
        addSubmit () {
            this.addLoading = true
            let that = this
            setTimeout(function () {
                that.addLoading = false
                that.centerDialogVisible = false
            }, 2000)
        },
        currentPageFn (page) {
            console.log(`当前为第${page}页`)
            this.pagingObj.pageNumber = page
            this.seachSubmit()
        },
        editById (row) {
            console.log(row)
            this.editForm._id = row._id
            this.editForm.name = row.name
            this.editForm.visitDate = this.registerDate(row.visitDate, 'yyyy-MM-dd')
            this.editForm.visitDateStage = row.visitDateStage === 1 ? '下午' : '上午'
            this.editForm.type = this.registerType(row.type)
            if (row.medicine && row.medicine.length) {
                this.editForm.medicine = row.medicine.map((item, index) => {
                    return {_id: item._id, value: item.name, desc: item.desc}
                })
            }
            if (row.test && row.test.length) {
                this.editForm.test = row.test.map((item, index) => {
                    return {_id: item._id, value: item.name, desc: item.desc}
                })
            }
            if (row.testResults && row.testResults.length) {
                this.editForm.testResults = row.testResults
            }
            this.editForm.symptom = row.symptom
            this.editForm.desc = row.desc
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
            this.editForm.medicine.push(item)
        },
        testHandleSelect (item) {
            this.editForm.test.push(item)
        },
        loadAllMedicines () {
            let _this = this
            this.$http.axios({method: 'GET', url: '/api/getMedicineList?pageNumber=1&pageSize=1000'}).then((result) => {
                result = result.data
                if (result.error_code === 0 && result.message === 'SUCCESS') {
                    _this.medicineRestaurants = result.result.data.map((item, index) => {
                        return {_id: item._id, value: item.name, desc: item.desc}
                    })
                }
            }, (error) => {
                console.log('error')
                console.error(error)
            }).catch((error) => {
                console.log('error')
                console.error(error)
            })
            // return [
            //     { _id: 1, value: '阿莫西林', desc: 'otc' },
            //     { _id: 2, value: '阿司匹林', desc: 'otc' },
            //     { _id: 3, value: '逍遥丸', desc: 'otc' },
            //     { _id: 4, value: '六味地黄丸', desc: 'otc' },
            //     { _id: 5, value: '板蓝根', desc: 'otc' }
            // ]
        },
        loadAllTests () {
            let _this = this
            this.$http.axios({method: 'GET', url: '/api/getTestList?pageNumber=1&pageSize=1000'}).then((result) => {
                result = result.data
                if (result.error_code === 0 && result.message === 'SUCCESS') {
                    _this.testRestaurants = result.result.data.map((item, index) => {
                        return {_id: item._id, value: item.name, desc: item.desc}
                    })
                }
            }, (error) => {
                console.log('error')
                console.error(error)
            }).catch((error) => {
                console.log('error')
                console.error(error)
            })
            // return [
            //     { _id: 1, value: '鼻腔镜', desc: 'otc' },
            //     { _id: 2, value: '胃镜', desc: 'otc' },
            //     { _id: 3, value: '过敏原', desc: 'otc' },
            //     { _id: 4, value: '血脂六项', desc: 'otc' },
            //     { _id: 5, value: 'CT', desc: 'otc' }
            // ]
        },
        closeMedicineTagFn (tag) {
            this.editForm.medicine = this.editForm.medicine.filter((item) => {
                return !(item._id === tag._id)
            })
        },
        closeTestTagFn (tag) {
            this.editForm.test = this.editForm.test.filter((item) => {
                return !(item._id === tag._id)
            })
        },
        filterDoctor () {},
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
        },
        registerDate (date, type) {
            return tools.simpleDateFormat(date, type)
        },
        editSubmit () {
            let _this = this
            if (!(this.editForm.type === 1 || this.editForm.type === 2)) {
                this.$message.error('当前状态已无法处理')
            }
            console.log(this.editForm)
            if (this.editForm.type) {
                switch (this.editForm.type) {
                case '未分诊' :
                    this.editForm.type = 0
                    break
                case '已分诊等待就诊' :
                    this.editForm.type = 1
                    break
                case '就诊中' :
                    this.editForm.type = 2
                    break
                case '挂起' :
                    this.editForm.type = 3
                    break
                case '就诊完毕' :
                    this.editForm.type = 4
                    break
                default : break
                }
            }
            if (this.editForm.visitDateStage) {
                this.editForm.visitDateStage = (this.editForm.visitDateStage === '上午') ? 0 : 1
            }
            this.editForm.type = 2
            this.$http.axios({method: 'POST', url: '/api/editRegister', data: this.editForm}).then((result) => {
                result = result.data
                if (result.error_code === 0 && result.message === 'SUCCESS') {
                    _this.editForm._id = ''
                    _this.editForm.name = ''
                    _this.editForm.visitDate = ''
                    _this.editForm.visitDateStage = ''
                    _this.editForm.type = 1
                    _this.editForm.medicine = []
                    _this.editForm.test = []
                    _this.editForm.testResults = []
                    _this.editForm.symptom = ''
                    _this.editForm.desc = ''
                    _this.$message({
                        message: '保存成功',
                        type: 'success'
                    })
                    _this.seachSubmit()
                }
            }, (error) => {
                console.log(error)
            }).catch((error) => {
                console.error(error)
            })
        },
        appendTestResult () {
            // this.editForm.testResults.push({_id: '', result: ''})

        },
        closeEditDialog () {
            this.editForm._id = ''
            this.editForm.name = ''
            this.editForm.visitDate = ''
            this.editForm.visitDateStage = ''
            this.editForm.type = 1
            this.editForm.medicine = []
            this.editForm.test = []
            this.editForm.testResults = []
            this.editForm.symptom = ''
            this.editForm.desc = ''
        }
    },
    mounted () {
        this.doctorId = tools.getCookie('_id')
        this.seachSubmit()
        this.loadAllMedicines()
        this.loadAllTests()
        // this.medicineRestaurants = this.loadAllMedicines()
        // this.testRestaurants = this.loadAllTests()
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


