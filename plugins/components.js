import Vue from 'vue'
import Toast from '../components/Toast.vue'
import iView from 'iview'
import { Header, Content, Table, Button, Layout, Sider, Menu, MenuItem, Icon ,Row ,Col } from 'iview'
//iview 组件
Vue.use(iView)

const components = {
	Toast,
	Header,
	Content,
	Table,
	Button,
	Layout,
	Sider,
	Menu,
	MenuItem,
	Icon,
	Row ,
	Col
}

Object.keys(components).forEach(key => {
	Vue.component(key, components[key])
})