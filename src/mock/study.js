// Mock.js http://mockjs.com/examples.html
import Mock from 'mockjs'

const data =

// 1.生成字符串
// Mock.mock({
//   'string|1-10': '★'
// })

// 2.生成随机文本
// Mock.mock({
//   string: '@cword()'
// })

// Mock.mock({
//   string: '@cword(3)'
// })

// Mock.mock({
//   string: '@cword(3,10)'
// })

// 3.生成标题和句子
// Mock.mock({
//   title: '@title',
//   sentence: '@sentence'
// })

// Mock.mock({
//   title: '@title(8)',
//   sentence: '@sentence(30)'
// })

// 4.生成段落
// Mock.mock({
//   content: '@cparagraph()'
// })

// Mock.mock({
//   content: '@cparagraph(5)'
// })

// 5.生成数字
// Mock.mock({
//   number: 10
// })

// Mock.mock({
//   'number|1-100': 10
// })

// 6.生成增量id
// Mock.mock({
//   id: '@increment()'
// })

// Mock.mock({
//   id: '@increment(1)'
// })

// 7.生成姓名-地址-身份证号
// Mock.mock({
//   name: '@cname()',
//   idcard: '@id()',
//   address: '@city(true)'
// })

// 8.生成随机图片 Random.image( size, background, foreground, format, text )
// Mock.mock({
//   url: "@image('200x100', '#894FC4', '#FFF', 'png', '!')"
// })

// 9.生成随机时间 Random.date( format? )
// Mock.mock({
//   date: '@date()'
// })

// Mock.mock({
//   date: "@date('yyyy-MM-dd hh:mm:ss.sss')"
// })

// 10.生成随机数组
// Mock.mock({
//   'list|10': [
//     {
//       id: '@increment(1)',
//       name: '@cname()',
//       idcard: '@id()',
//       address: '@city(true)'
//     }
//   ]
// })

// Mock.mock({
//   'list|1-100': [
//     {
//       id: '@increment(1)',
//       name: '@cname()',
//       idcard: '@id()',
//       address: '@city(true)'
//     }
//   ]
// })

undefined
console.log(data)

// 11.拦截请求 get-post

// Mock.mock('/api/news', 'get', {
//   status: 200,
//   msg: '获取数据成功'
// })

Mock.mock('/api/news', 'get', () => {
  return {
    status: 200,
    msg: '获取数据成功'
  }
})

// Mock.mock('/api/news', 'post', {
//   status: 201,
//   msg: '创建数据成功'
// })

Mock.mock('/api/news', 'post', () => {
  return {
    status: 201,
    msg: '创建数据成功'
  }
})
