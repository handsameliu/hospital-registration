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
import UnSubscribeOperation from '@/components/UnSubscribeOperation'
import ReceptionOperation from '@/components/ReceptionOperation'
import TestOperation from '@/components/TestOperation'
import ChargeOperation from '@/components/ChargeOperation'
import PharmacyOperation from '@/components/PharmacyOperation'

Vue.use(Router)

export default new Router({
    routes: [
        {   // 首页
            path: '/',
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
            path: '/unsubscribeOperation',
            name: 'UnSubscribeOperation',
            component: UnSubscribeOperation
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
