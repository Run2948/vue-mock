<template>
  <a-config-provider :locale="locale">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <a-layout>
      <a-layout-content style="height:100%;">
        <a-row type="flex" style="padding: 10px 0 10px 0;">
          <a-col :span="22" :offset="1">
            <a-row type="flex">
              <a-col :span="6">
                <a-input v-model="title" placeholder="请输入标题" />
              </a-col>
              <a-col :span="12" :offset="1">
                <a-input v-model="content" placeholder="请输入内容" />
              </a-col>
              <a-col :span="2" :offset="1">
                <a-button type="primary" @click="addNews">添加</a-button>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <a-row type="flex">
          <a-col :span="22" :offset="1">
            <a-table
              bordered
              :data-source="list"
              :columns="columns"
              :loading="loading"
              :pagination="pagination"
              :rowKey="list => list.id"
              @change="onTableChange"
            >
              <template slot="image" slot-scope="text, record">
                <img :src="record.image" alt="" title="" width="100" />
              </template>
              <template slot="operation" slot-scope="text, record">
                <a-popconfirm
                  v-if="list.length"
                  title="确定要删除该项吗?"
                  @confirm="() => delNews(record.id)"
                >
                  <a href="javascript:;">删除</a>
                </a-popconfirm>
              </template>
            </a-table>
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  name: 'App',
  components: {},
  data () {
    return {
      locale: zhCN,
      loading: true,
      list: [],
      title: null,
      content: null,
      columns: [
        {
          title: '图片',
          dataIndex: 'image',
          scopedSlots: { customRender: 'image' }
        },
        {
          title: '标题',
          dataIndex: 'title'
        },
        {
          title: '内容',
          dataIndex: 'content'
        },
        {
          title: '时间',
          dataIndex: 'addtime',
          width: '10%'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: '5%'
        }
      ],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showLessItems: true,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showTotal: (total, range) => `共有 ${total} 条数据`
        // onShowSizeChange: (current, size) => {
        //   // this.current = current
        //   this.pageSize = size
        // },
        // onChange: (page, pageSize) => {
        //   this.current = page
        //   // this.pageSize = pageSize
        // }
      }
    }
  },
  created () {
    this.getNewsList()
  },
  methods: {
    getNewsList () {
      this.$http
        .get('/api/news', {
          params: {
            pageIndex: this.pagination.current || this.pagination.defaultCurrent,
            pageSize: this.pagination.pageSize || this.pagination.defaultPageSize
          }
        })
        .then(({ data }) => {
          // console.log(data)
          this.list = data.list
          this.pagination.total = data.total
          this.loading = false
        })
    },
    addNews () {
      if (!this.title || !this.content) {
        return this.$message.warning('标题或内容不能为空')
      }
      this.$http
        .post('/api/add/news', {
          title: this.title,
          content: this.content
        })
        .then(({ data }) => {
          // console.log(data)
          if (data.status === 201) {
            this.title = null
            this.content = null
            this.list = data.list
            this.pagination.total = data.total
            return this.$message.success('添加成功')
          }
        })
    },
    delNews (id) {
      if (!id) {
        return this.$message.error('参数错误')
      }
      this.$http
        .post('/api/remove/news', {
          id: id
        })
        .then(({ data }) => {
          // console.log(data)
          if (data.status === 200) {
            this.title = null
            this.content = null
            this.list = data.list
            this.pagination.total = data.total
            return this.$message.success('删除成功')
          }
        })
    },
    onTableChange (pagination) {
      // console.log(pagination)
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      this.getNewsList()
    }
  }
}
</script>

<style></style>
