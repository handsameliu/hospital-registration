<template>
    <div class="registerListOperation">
        <div class="title-box">
            > 患者管理列表
        </div>
        <div class="opration-buttons-box">
            <el-form :inline="true">
                <el-form-item label="患者姓名">
                    <el-input placeholder="姓名" v-model="searchForm.name"></el-input>
                </el-form-item>
                <el-form-item label="就诊科室">
                    <el-input placeholder="科室" v-model="searchForm.department"></el-input>
                </el-form-item>
                <el-form-item label="主治医师">
                    <el-input placeholder="主治医师" v-model="searchForm.doctorId"></el-input>
                </el-form-item>
                <el-form-item label="就诊时间">
                    <el-radio-group v-model="searchForm.visitDateStage">
                        <el-radio label="上午" value="0"></el-radio>
                        <el-radio label="下午" value="1"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="就诊日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="searchForm.visitDate" style="width: 100%;"></el-date-picker>
                    </el-col>
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
            <el-table-column prop="cardId" label="身份证号">
            </el-table-column>
            <el-table-column prop="socialSecurityId" label="社保卡号">
            </el-table-column>
            <el-table-column prop="department" label="就诊科室">
            </el-table-column>
            <el-table-column prop="doctorId" label="主治医师">
            </el-table-column>
            <el-table-column prop="address" label="联系地址">
            </el-table-column>
            <el-table-column prop="mobile" label="联系方式">
            </el-table-column>
            <el-table-column prop="visitDate" label="就诊日期">
            </el-table-column>
            <el-table-column prop="visitDateStage" label="就诊时间">
            </el-table-column>
            <el-table-column prop="type" label="就诊状态">
            </el-table-column>
            <el-table-column prop="price" label="挂号付款">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small"  @click="editById">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="1000" class="pagination-box" @current-change="currentPageFn"></el-pagination>
        <el-dialog title="编辑用户挂号基本信息" :visible.sync="centerDialogVisible" width="50%" center>
            <el-form ref="form" :model="addForm" label-width="80px">
                <el-form-item label="患者姓名">
                    <el-input v-model="addForm.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="addForm.cardId" disabled></el-input>
                </el-form-item>
                <el-form-item label="社保卡号">
                    <el-input v-model="addForm.socialSecurityId" disabled></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="addForm.mobile" disabled></el-input>
                </el-form-item>
                <el-form-item label="联系地址">
                    <el-input v-model="addForm.address" disabled></el-input>
                </el-form-item>
                <el-form-item label="接诊科室">
                    <el-input v-model="addForm.departmentId" disabled></el-input>
                </el-form-item>
                <el-form-item label="接诊医生">
                    <el-input v-model="addForm.doctorId" disabled></el-input>
                </el-form-item>
                <el-form-item label="接诊日期">
                    <el-input v-model="addForm.visitDate" disabled></el-input>
                </el-form-item>
                <el-form-item label="接诊阶段">
                    <el-input v-model="addForm.visitDateStage" disabled></el-input>
                </el-form-item>
                <el-form-item label="当前状态">
                    <el-input v-model="addForm.type" disabled></el-input>
                </el-form-item>
                <el-form-item label="挂号价格">
                    <el-input v-model="addForm.price" disabled></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="addForm.desc" disabled></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAddSubmit">取 消</el-button>
                <el-button type="primary" @click="addSubmit" :loading="addLoading">退 号</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'RegisterListOperation',
    data () {
        return {
            addLoading: false,
            searchLoading: false,
            centerDialogVisible: false,
            searchForm: {
                name: '',
                department: '',
                doctorId: '',
                visitDate: '',
                visitDateStage: ''
            },
            addForm: {
                name: '',
                cardId: '',
                socialSecurityId: '',
                mobile: '',
                address: '',
                departmentId: '',
                doctorId: '',
                visitDate: '',
                visitDateStage: '',
                type: '',
                price: '',
                desc: ''
            },
            tableData: [
                {
                    createTime: '',
                    name: '',
                    cardId: '',
                    socialSecurityId: '',
                    department: '',
                    doctorId: '',
                    address: '',
                    mobile: '',
                    visitDate: '',
                    visitDateStage: '',
                    type: '',
                    price: ''
                }, {
                    createTime: '',
                    name: '',
                    cardId: '',
                    socialSecurityId: '',
                    department: '',
                    doctorId: '',
                    address: '',
                    mobile: '',
                    visitDate: '',
                    visitDateStage: '',
                    type: '',
                    price: ''
                }, {
                    createTime: '',
                    name: '',
                    cardId: '',
                    socialSecurityId: '',
                    department: '',
                    doctorId: '',
                    address: '',
                    mobile: '',
                    visitDate: '',
                    visitDateStage: '',
                    type: '',
                    price: ''
                }, {
                    createTime: '',
                    name: '',
                    cardId: '',
                    socialSecurityId: '',
                    department: '',
                    doctorId: '',
                    address: '',
                    mobile: '',
                    visitDate: '',
                    visitDateStage: '',
                    type: '',
                    price: ''
                }, {
                    createTime: '',
                    name: '',
                    cardId: '',
                    socialSecurityId: '',
                    department: '',
                    doctorId: '',
                    address: '',
                    mobile: '',
                    visitDate: '',
                    visitDateStage: '',
                    type: '',
                    price: ''
                }, {
                    createTime: '',
                    name: '',
                    cardId: '',
                    socialSecurityId: '',
                    department: '',
                    doctorId: '',
                    address: '',
                    mobile: '',
                    visitDate: '',
                    visitDateStage: '',
                    type: '',
                    price: ''
                }
            ]
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
        }
    }
}
</script>

