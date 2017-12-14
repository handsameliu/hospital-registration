// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button, Select, Option, Container, Header, Aside, Main, Footer, Menu, Submenu, MenuItem, MenuItemGroup, Dropdown, DropdownMenu, DropdownItem, Table, TableColumn} from 'element-ui'

Vue.config.productionTip = false

Vue.component(Container.name, Container)
Vue.component(Header.name, Header)
Vue.component(Aside.name, Aside)
Vue.component(Main.name, Main)
Vue.component(Footer.name, Footer)
Vue.component(Submenu.name, Submenu)
Vue.component(Menu.name, Menu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(MenuItemGroup.name, MenuItemGroup)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)

/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
