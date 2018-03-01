<template>
    <div class="index">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="就诊人数" name="first">
                <ve-line :data="chartData" :settings="chartSettings"></ve-line>
            </el-tab-pane>
            <!-- <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
        </el-tabs>
    </div>
</template>

<script>
export default {
    name: 'Index',
    data () {
        return {
            activeName: 'first',
            chartData: {},
            chartSettings: {}
        }
    },
    methods: {
        handleClick (tab, event) {
            console.log(tab, event)
        }
    },
    mounted () {
        this.chartData = {
            columns: ['日期', '心内', '心外', '妇科', '耳鼻喉'],
            rows: [
                { '日期': '1月1日', '心内': 152, '心外': 153, '妇科': 12, '耳鼻喉': 100 },
                { '日期': '1月2日', '心内': 122, '心外': 123, '妇科': 345, '耳鼻喉': 100 },
                { '日期': '1月3日', '心内': 212, '心外': 153, '妇科': 7, '耳鼻喉': 100 },
                { '日期': '1月4日', '心内': 412, '心外': 123, '妇科': 31, '耳鼻喉': 100 },
                { '日期': '1月5日', '心内': 312, '心外': 153, '妇科': 12, '耳鼻喉': 100 },
                { '日期': '1月6日', '心内': 712, '心外': 152, '妇科': 65, '耳鼻喉': 200 }
            ]
        }
        this.chartSettings = {}
    }

}
</script>

