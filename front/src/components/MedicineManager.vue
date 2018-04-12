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
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="0"></el-option>
                        <el-option label="所有" :value="999"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格">
                    <el-col :span="10">
                        <el-input placeholder="最低价" v-model="searchForm.priceGT"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="10">
                        <el-input placeholder="最高价" v-model="searchForm.priceLT"></el-input>
                    </el-col>
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
                    <el-button type="primary" :loading="searchLoading" @click="seachData">查询</el-button>
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
                    <el-button type="text" size="small" @click="editButton(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="pagingObj.pageCount" :page-size="pagingObj.pageSize" class="pagination-box" @current-change="currentPageFn"></el-pagination>
        <el-dialog title="新增药品" :visible.sync="centerDialogVisible" width="50%" center>
            <el-form ref="form" :model="addForm" label-width="80px">
                <el-form-item label="药品名称">
                    <el-input v-model="addForm.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="处方药">
                    <el-select placeholder="处方药" v-model="addForm.isOTC">
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="0"></el-option>
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
        <el-dialog title="修改药品信息" :visible.sync="editCenterDialogVisible" width="50%" center>
            <el-form ref="form" :model="editForm" label-width="80px">
                <el-form-item label="药品名称">
                    <el-input v-model="editForm.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="处方药">
                    <el-select placeholder="处方药" v-model="editForm.isOTC">
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input placeholder="价格" v-model="editForm.price" clearable></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select placeholder="状态" v-model="editForm.status">
                        <el-option label="正常" :value="0"></el-option>
                        <el-option label="下架" :value="1"></el-option>
                        <el-option label="缺货" :value="2"></el-option>
                        <el-option label="补货中" :value="3"></el-option>
                        <el-option label="限制售卖" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="editForm.desc" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editCancelAddSubmit">取 消</el-button>
                <el-button type="primary" @click="editSubmit" :loading="addLoading">保 存</el-button>
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
            editCenterDialogVisible: false,
            addLoading: false,
            addForm: {
                name: '',
                isOTC: 0,
                price: 0,
                status: 0,
                desc: ''
            },
            editForm: {
                name: '',
                isOTC: 0,
                price: 0,
                status: 0,
                desc: ''
            },
            searchForm: {
                name: '',
                isOTC: 999,
                priceGT: 0,
                priceLT: 99999,
                status: 0,
                desc: ''
            },
            tableDataSource: [],
            tableData: [],
            pagingObj: {
                pageNumber: 1,  // 当前页
                pageSize: 10,   // 显示个数
                pageCount: 1    // 总条数
            }
        }
    },
    mounted () {
        this.seachData()
    },
    methods: {
        seachData () {
            this.searchLoading = true
            this.tableLoading = true
            let _this = this
            let url = '?pageNumber=' + this.pagingObj.pageNumber + '&pageSize=' + this.pagingObj.pageSize + '&'
            if (this.searchForm.name) {
                url += 'name=' + this.searchForm.name + '&'
            }
            if (!isNaN(this.searchForm.isOTC)) {
                url += 'isOTC=' + this.searchForm.isOTC + '&'
            }
            if (!isNaN(this.searchForm.status)) {
                url += 'status=' + this.searchForm.status + '&'
            }
            if (!isNaN(this.searchForm.priceGT)) {
                url += 'priceGT=' + this.searchForm.priceGT + '&'
            }
            if (!isNaN(this.searchForm.priceLT)) {
                url += 'priceLT=' + this.searchForm.priceLT + '&'
            }
            this.$http.axios({method: 'GET', url: '/api/getMedicineList' + url}).then((result) => {
                if (result && result.data) {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        _this.tableDataSource = result.result.data
                        _this.tableData = result.result.data.map((item, index) => {
                            const obj = {}
                            obj._id = item._id
                            obj.name = item.name
                            obj.price = item.price
                            obj.desc = item.desc
                            obj.__v = item.__v
                            obj.updateTime = item.updateTime
                            obj.createTime = item.createTime
                            obj.isOTC = (item.isOTC === 1) ? '是' : '否'
                            switch (item.status) {
                            case 0 :
                                obj.status = '正常'
                                break
                            case 1 :
                                obj.status = '下架'
                                break
                            case 2 :
                                obj.status = '缺货'
                                break
                            case 3 :
                                obj.status = '补货中'
                                break
                            case 4 :
                                obj.status = '限制'
                                break
                            default :
                                obj.status = '正常'
                                break
                            }
                            return obj
                        })
                        _this.pagingObj.pageCount = result.result.pageCount
                    } else {
                        _this.$message.error(result.message, result.error_code)
                    }
                } else {
                    console.error(result)
                    _this.$message.error('发生错误，请稍后重试')
                }
                _this.searchLoading = false
                _this.tableLoading = false
            }).catch((error) => {
                console.log('我error了')
                console.error(error)
                _this.searchLoading = false
                _this.tableLoading = false
            })
        },
        currentPageFn (val) {
            console.log(`当前页${val}`)
            this.pagingObj.pageNumber = val
            this.seachData()
        },
        addSubmit () {
            let _this = this
            if (!(_this.addForm.name && !isNaN(_this.addForm.isOTC) && !isNaN(_this.addForm.price) && !isNaN(_this.addForm.status))) {
                return _this.$message.error('请将页面信息填写完整')
            }
            this.addLoading = true
            this.$http.axios({method: 'POST', url: '/api/addMedicine', data: _this.addForm}).then((result) => {
                if (result && result.data) {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        _this.$message({
                            message: '新增药品成功',
                            type: 'success'
                        })
                        _this.seachData()
                        _this.centerDialogVisible = false
                    } else {
                        let message = ''
                        if (result.message === 'params invalid') {
                            message = '请将页面信息填写完整'
                        } else if (result.message === 'user repeat') {
                            message = '当前药品已存在，请重新填写'
                        }
                        _this.$message.error(message)
                    }
                    _this.addLoading = false
                }
            }).catch((error) => {
                console.log('我error')
                console.log(error)
                _this.addLoading = false
            })
        },
        cancelAddSubmit () {
            this.centerDialogVisible = false
            this.addForm.name = ''
            this.addForm.isOTC = 0
            this.addForm.price = 0
            this.addForm.status = 0
            this.addForm.desc = ''
        },
        editButton (row) {
            for (let obj of this.tableDataSource) {
                if (obj._id === row._id) {
                    this.editForm._id = obj._id
                    this.editForm.name = obj.name
                    this.editForm.isOTC = obj.isOTC
                    this.editForm.price = obj.price
                    this.editForm.status = obj.status
                    this.editForm.desc = obj.desc
                    break
                }
            }
            this.editCenterDialogVisible = true
        },
        editSubmit () {
            let _this = this
            if (!(_this.editForm.name && !isNaN(_this.editForm.isOTC) && !isNaN(_this.editForm.price) && !isNaN(_this.editForm.status))) {
                return _this.$message.error('请将页面信息填写完整')
            }
            this.addLoading = true
            this.$http.axios({method: 'POST', url: '/api/editMedicine', data: _this.editForm}).then((result) => {
                if (result && result.data) {
                    result = result.data
                    if (result.error_code === 0 && result.message === 'SUCCESS') {
                        _this.$message({
                            message: '修改成功',
                            type: 'success'
                        })
                        _this.seachData()
                        _this.addLoading = false
                        _this.editCenterDialogVisible = false
                    } else {
                        let message = ''
                        if (result.message === 'medicine repeat') {
                            message = '存在相同药品，请重新修改'
                        }
                        _this.$message.error(message)
                        _this.addLoading = false
                    }
                }
            }).catch((error) => {
                console.log('我error')
                console.log(error)
                _this.addLoading = false
                _this.editCenterDialogVisible = false
            })
        },
        editCancelAddSubmit () {
            this.editCenterDialogVisible = false
            this.editForm.name = ''
            this.editForm.isOTC = 0
            this.editForm.price = 0
            this.editForm.status = 0
            this.editForm.desc = ''
        }
    }
}
</script>

