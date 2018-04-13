import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import UserManager from '@/components/UserManager'
import DepartmentManager from '@/components/DepartmentManager'
import TitleManager from '@/components/TitleManager'
import JurisdictionManager from '@/components/JurisdictionManager'
import MedicineManager from '@/components/MedicineManager'
import TestManager from '@/components/TestManager'
import ModuleManager from '@/components/ModuleManager'
import RegisterOperation from '@/components/RegisterOperation'
import RegisterListOperation from '@/components/RegisterListOperation'
import ReceptionOperation from '@/components/ReceptionOperation'
import TestOperation from '@/components/TestOperation'
import ChargeOperation from '@/components/ChargeOperation'
import PharmacyOperation from '@/components/PharmacyOperation'
import tools from '../lib/tools'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {   // 首页
            path: '/',
            name: 'Index',
            component: Index
        }, {
            path: '/index',
            name: 'Index',
            component: Index
        }, { // 用户管理
            path: '/userManager',
            name: 'UserManager',
            component: UserManager
        }, { // 科室管理
            path: '/departmentManager',
            name: 'DepartmentManager',
            component: DepartmentManager
        }, { // 职称管理
            path: '/titleManager',
            name: 'TitleManager',
            component: TitleManager
        }, { // 权限管理
            path: '/jurisdictionManager',
            name: 'JurisdictionManager',
            component: JurisdictionManager
        }, { // 药品管理
            path: '/medicineManager',
            name: 'MedicineManager',
            component: MedicineManager
        }, { // 体检项管理
            path: '/testManager',
            name: 'TestManager',
            component: TestManager
        }, { // 系统模块管理
            path: '/moduleManager',
            name: 'ModuleManager',
            component: ModuleManager
        }, { // 挂号
            path: '/registerOperation',
            name: 'RegisterOperation',
            component: RegisterOperation
        }, { // 退号
            path: '/registerListOperation',
            name: 'RegisterListOperation',
            component: RegisterListOperation
        }, { // 接诊
            path: '/receptionOperation',
            name: 'ReceptionOperation',
            component: ReceptionOperation
        }, { // 体检
            path: '/testOperation',
            name: 'TestOperation',
            component: TestOperation
        }, { // 收费
            path: '/chargeOperation',
            name: 'ChargeOperation',
            component: ChargeOperation
        }, { // 药房
            path: '/pharmacyOperation',
            name: 'PharmacyOperation',
            component: PharmacyOperation
        }
    ]
})

router.beforeEach((to, from, next) => {
    // to: Route: 即将要进入的目标 路由对象
    // from: Route: 当前导航正要离开的路由
    // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
    const nextRoute = ['Index', 'UserManager', 'DepartmentManager', 'TitleManager', 'JurisdictionManager', 'MedicineManager', 'TestManager', 'ModuleManager', 'RegisterOperation', 'RegisterListOperation', 'ReceptionOperation', 'TestOperation', 'ChargeOperation', 'PharmacyOperation']
    let isLogin = false
    let _id = tools.getCookie('_id')
    let username = tools.getCookie('username')
    if ((_id !== undefined && _id !== '' && _id !== 'undefined') && (username !== undefined && username !== '' && username !== 'undefined')) {
        isLogin = true
    }
    // console.log(isLogin)
    // 未登录状态；当路由到nextRoute指定页时，跳转至登陆页
    if (nextRoute.indexOf(to.name) >= 0) {
        if (!isLogin) {
            // router.push({ name: 'login' })
            alert('非法操作，请登陆后重试')
            window.location.href = '/signIn.html'
        }
    }
    // 已登录状态；当路由到login时，跳转至home
    // if (to.name === 'signIn') {
    //     if (isLogin) {
    //         router.push({ name: 'Index' })
    //     }
    // }
    next()
})

export default router
