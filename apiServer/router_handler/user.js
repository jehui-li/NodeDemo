/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
//导入数据库操作模块
const db = require('../db/index')
//对用户密码进行加密
const bcrypt = require('bcryptjs')

// 注册用户的处理函数
exports.regUser = (req, res) => {
  const userinfo = req.body
  const sqlStr = `select * from ev_users where username=?`

  db.query(sqlStr, [userinfo.username], function (err, results) {
  // 执行 SQL 语句失败
  if (err) {
    return res.cc(err)
  }
  // 用户名被占用
  if (results.length > 0) {
    return res.cc('用户名被占用，请更换其他用户名！')
  }
  })

  userinfo.password = bcrypt.hashSync(userinfo.password, 10)

  const sql = 'insert into ev_users set ?'
  db.query(sql, { username: userinfo.username, password: userinfo.password }, function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // SQL 语句执行成功，但影响行数不为 1
    if (results.affectedRows !== 1) {
      return res.cc('注册用户失败，请稍后再试！')
    }
    // 注册成功
    res.send('注册成功！', 0)
  })

}

// 登录的处理函数
exports.login = (req, res) => {
  res.send('login OK')
}