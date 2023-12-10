const express = require('express')
// 创建 express 的服务器实例
const app = express()

const joi = require('joi')

//cors跨域
const cors = require('cors')
app.use(cors())

//解析表单数据
app.use(express.urlencoded({ extended: false }))

// 响应数据的中间件
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 未知错误
  res.cc(err)
})

//导入注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function () {
  console.log('api server running at http://192.168.1.189:3007')
})
