<template>
    <div class="registerOperation">
        <div class="title-box">
            > 患者挂号列表
        </div>
        <div class="register-left">
            <p>挂号基本信息</p>
            <el-form ref="form" :model="form" label-width="80px" >
                <el-form-item label="就诊科室">
                    <el-select v-model="form.region" placeholder="请选择科室">
                        <el-option label="科室一" value="shanghai"></el-option>
                        <el-option label="科室二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="就诊医生">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="李医生"></el-radio>
                        <el-radio label="王医生"></el-radio>
                        <el-radio label="张医生"></el-radio>
                        <el-radio label="赵医生"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="就诊日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="就诊时间">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="上午" value="0"></el-radio>
                        <el-radio label="下午" value="1"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="form.price" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="register-right">
            <p>患者信息</p>
            <el-form ref="form" :model="form" label-width="80px" >
                <el-form-item label="患者姓名">
                    <el-input v-model="form.name" ></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="form.cardId" ></el-input>
                </el-form-item>
                <el-form-item label="社保卡号">
                    <el-input v-model="form.socialSecurityId" ></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="form.mobile" ></el-input>
                </el-form-item>
                <el-form-item label="联系地址">
                    <el-input type="textarea" v-model="form.address" ></el-input>
                </el-form-item>
            </el-form>   
        </div>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
    </div>
</template>

<script>
export default {
    name: 'RegisterOperation',
    data () {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        }
    },
    mounted () {},
    methods: {
        onSubmit () {
            console.log('submit!')
        }
    }
}
</script>
<style scoped>
    .registerOperation{
        width: 100%;
        height: 100%;
    }
    .register-left,.register-right{
        display: inline-block;
        width: 50%;
    }
    .register-left>p,.register-right>p{
        font-size: 18px;
        color: #606266;
        /* text-align: left; */
        /* padding-left: 11px; */
        padding-bottom: 15px;
    }
    .register-left{
        vertical-align: top;
    }
    .register-right{
        width: 48%;
        border-left: 1px solid #e6e6e6;
    }
</style>


