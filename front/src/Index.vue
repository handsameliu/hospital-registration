<template>
    <div id="app">
        <el-container style="height:100%;">
            <el-header>
                <h1 style="float: left;">医院挂号系统</h1>
                <div style="text-align: right;">
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link" style="color: #409EFF;">
                            当前用户：王小虎<i class="el-icon-setting" style="margin: 0 15px"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                    <el-menu router>
                        <el-submenu index="1" class="el-menu-text-left">
                            <template slot="title"><i class="el-icon-menu"></i><span>挂号</span></template>
                            <el-menu-item index="1-1" :route="{path:'/registerOperation'}">患者挂号</el-menu-item>
                            <el-menu-item index="1-2" :route="{path:'/registerListOperation'}">患者列表</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="2" :route="{path:'/receptionOperation'}" class="el-menu-text-left"><i class="el-icon-menu"></i><span slot="title">医师接诊</span></el-menu-item>
                        <el-menu-item index="3" :route="{path:'/testOperation'}" class="el-menu-text-left"><i class="el-icon-menu"></i><span slot="title">体检项接诊</span></el-menu-item>
                        <el-menu-item index="4" :route="{path:'/chargeOperation'}" class="el-menu-text-left"><i class="el-icon-menu"></i><span slot="title">划价/收费</span></el-menu-item>
                        <el-menu-item index="5" :route="{path:'/pharmacyOperation'}" class="el-menu-text-left"><i class="el-icon-menu"></i><span slot="title">药房</span></el-menu-item>
                        <el-submenu index="6" class="el-menu-text-left">
                            <template slot="title"><i class="el-icon-setting"></i><span>系统设置</span></template>
                            <el-menu-item index="6-1" :route="{path:'/userManager'}">用户管理</el-menu-item>
                            <el-menu-item index="6-2" :route="{path:'/departmentManager'}">科室管理</el-menu-item>
                            <el-menu-item index="6-3" :route="{path:'/titleManager'}">职称管理</el-menu-item>
                            <el-menu-item index="6-4" :route="{path:'/jurisdictionManager'}">权限管理</el-menu-item>
                            <el-menu-item index="6-5" :route="{path:'/medicineManager'}">药品管理</el-menu-item>
                            <el-menu-item index="6-6" :route="{path:'/testManager'}">体检项管理</el-menu-item>
                            <el-menu-item index="6-7" :route="{path:'/moduleManager'}">系统模块管理</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style src="../static/css/reset.css" ></style>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
    }
    
    .pagination-box{
        padding: 10px 0;
    }
    .opration-buttons-box{
        width: 100%;
        padding: 15px 15px 0px 0px;
        /* text-align: right; */
        box-sizing: border-box;
    }
    .title-box{
        width: 100%;
        text-align: left;
        color: #333;
        font-weight: 600;
        text-decoration: underline;
    }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-header, .el-footer {
        /* background-color: #B3C0D1; */
        /* background-color: #409EFF; */
        color: #409EFF;
        /* color: #333; */
        text-align: center;
        line-height: 60px;
        border-bottom: 1px solid #e6e6e6;
    }
  
    .el-aside {
        /* background-color: #D3DCE6; */
        color: #333;
        text-align: center;
        line-height: 200px;
    }
  
    .el-main {
        /* background-color: #E9EEF3; */
        color: #333;
        text-align: center;
        /* line-height: 160px; */
    }
  
    body > .el-container {
        margin-bottom: 40px;
    }
  
    .el-container:nth-child(5) .el-aside, .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
  
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .el-menu-text-left {
        text-align: left;
    }
</style>
