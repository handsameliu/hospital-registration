<template>
    <div id="app">
        <!-- <el-select v-model="value" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select> -->
        <el-table :data="tableData" style="width: 100%" border height="550">
            <el-table-column prop="date" label="日期" width="200" header-align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" width="200" header-align="center"></el-table-column>
            <el-table-column prop="address" label="地址" header-align="center"></el-table-column>
            <!-- <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column> -->
        </el-table>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data () {
            const item = {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }
            return {
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
                tableData: Array(20).fill(item)
            }
        },
        methods: {
            handleClick (row) {
                console.log(row)
            }
        }
    }
</script>
<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
    
    .el-aside {
        color: #333;
    }
</style>
