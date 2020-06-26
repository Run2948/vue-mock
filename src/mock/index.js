import Mock from 'mockjs'
const querystring = require('querystring')

const { newsList } = Mock.mock({
  'newsList|50-100': [
    {
      id: '@increment(1)',
      title: '@ctitle',
      content: '@cparagraph',
      image: "@image('200x100', '#894FC4', '#FFF', 'png', 'Yusi')",
      addtime: "@date('yyyy-MM-dd hh:mm:ss')"
    }
  ]
})

function getUrlParams (path, name) {
  var arg = path.split('?')
  if (arg.length > 1) {
    var params = querystring.parse(arg[1])
    return parseInt(params[name])
  }
  return null
}

Mock.mock(/\/api\/news/, 'get', req => {
  // console.log(req)
  const pageIndex = getUrlParams(req.url, 'pageIndex') || 1
  // console.log(pageIndex)
  const pageSize = getUrlParams(req.url, 'pageSize') || 10
  // console.log(pageSize)
  const totalPage = Math.ceil(newsList.length / pageSize)
  const list =
    pageIndex > totalPage
      ? []
      : newsList.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
  return {
    status: 200,
    message: '获取新闻列表成功',
    list: list,
    total: newsList.length
  }
})

Mock.mock('/api/add/news', 'post', req => {
  console.log(req)
  console.log(req.body)
  const item = JSON.parse(req.body)
  newsList.push(
    Mock.mock({
      id: '@increment(1)',
      title: item.title,
      content: item.content,
      image: "@image('200x100', '#894FC4', '#FFF', 'png', 'Yusi')",
      addtime: "@date('yyyy-MM-dd hh:mm:ss')"
    })
  )
  return {
    status: 201,
    message: '新闻创建成功',
    list: newsList,
    total: newsList.length
  }
})

Mock.mock('/api/remove/news', 'post', req => {
  // console.log(req.body)
  const item = JSON.parse(req.body)
  const index = newsList.findIndex(x => x.id === item.id)
  if (index !== -1) {
    newsList.splice(index, 1)
  }
  return {
    status: 200,
    message: '新闻删除成功',
    list: newsList,
    total: newsList.length
  }
})
