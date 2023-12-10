const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'node',
})
// 尝试连接并执行查询
db.query('SELECT 1', (error, results, fields) => {
  if (error) {
    console.error('Database connection error:', error);
  } else {
    console.log('Database connection successful');
  }
});
// 向外共享 db 数据库连接对象
module.exports = db