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
                    <el-button type="text" size="small"  @click="editById">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="1000" class="pagination-box" @current-change="currentPageFn"></el-pagination>
        <el-dialog title="接诊信息" :visible.sync="centerDialogVisible" width="60%" center top="3vh">
            <el-form :inline="true" :model="addForm" label-width="80px">
                <el-form-item label="患者姓名">
                    <el-input v-model="addForm.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="接诊日期">
                    <el-input v-model="addForm.visitDate" disabled></el-input>
                </el-form-item>
                <el-form-item label="接诊时间">
                    <el-input v-model="addForm.visitDateStage" disabled></el-input>
                </el-form-item>
                <el-form-item label="当前状态">
                    <el-input v-model="addForm.type" disabled></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="addForm" label-width="80px">
                <el-form-item label="药物">
                    <el-autocomplete class="inline-input" popper-class="my-autocomplete" :fetch-suggestions="queryMedicineSearch" placeholder="请输入内容" :trigger-on-focus="false" @select="medicineHandleSelect" >
                        <template slot-scope="props">
                            <div class="name">{{ props.item.value }}</div>
                            <span class="addr">类型：{{ props.item.desc }}</span>
                        </template>
                    </el-autocomplete>
                </el-form-item>
                <el-form-item label="">
                    <el-tag v-for="(tag, key) in addForm.medicine" :key="key" closable @close="closeMedicineTagFn(tag)">{{tag.value}}</el-tag>
                </el-form-item>
                <el-form-item label="症状">
                    <el-input type="textarea" v-model="addForm.symptom" ></el-input>
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
                    <el-tag v-for="(tag, key) in addForm.test" :key="key" closable @close="closeTestTagFn(tag)">{{tag.value}}</el-tag>
                </el-form-item>
                <el-form-item label="体检结果">
                    <el-input type="textarea" v-model="addForm.testResults" ></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="addForm.desc" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAddSubmit">取 消</el-button>
                <el-button type="primary" @click="addSubmit" :loading="addLoading">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'ReceptionOperation',
    data () {
        return {
            addLoading: false,
            searchLoading: false,
            centerDialogVisible: false,
            searchForm: {
                name: '',
                department: '',
                visitDate: '',
                visitDateStage: ''
            },
            addForm: {
                name: '',
                visitDate: '',
                visitDateStage: '',
                type: '',
                test: [],
                medicine: [],
                symptom: '',
                testResults: '',
                desc: ''
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
            medicineRestaurants: [],
            testRestaurants: []
        }
    },
    methods: {
        seachSubmit () {
            this.searchLoading = true
            let that = this
            setTimeout(function () {
                that.searchLoading = false
                that.centerDialogVisible = false
            }, 2000)
        },
        cancelAddSubmit () {
            this.centerDialogVisible = false
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
        },
        editById () {
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
            this.addForm.medicine.push(item)
        },
        testHandleSelect (item) {
            this.addForm.test.push(item)
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
            this.addForm.medicine = this.addForm.medicine.filter((item) => {
                return !(item._id === tag._id)
            })
        },
        closeTestTagFn (tag) {
            this.addForm.test = this.addForm.test.filter((item) => {
                return !(item._id === tag._id)
            })
        }
    },
    mounted () {
        this.medicineRestaurants = this.loadAllMedicines()
        this.testRestaurants = this.loadAllTests()
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


