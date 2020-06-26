import Vue from 'vue'
import { Input, Button, Table, Popconfirm, Pagination, Layout, Row, Col, Message, ConfigProvider } from 'ant-design-vue'

Vue.use(Input)
Vue.use(Button)
Vue.use(Table)
Vue.use(Popconfirm)
Vue.use(Pagination)
Vue.use(Layout)
Vue.use(Row)
Vue.use(Col)
Vue.prototype.$message = Message
Vue.use(ConfigProvider)
