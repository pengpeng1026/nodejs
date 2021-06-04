// 引入crypto模块
const crypto = require('crypto')
// 设置加密算法
let sha512 = crypto.createHash('sha512')
// 密码
let screat = '961026'
/* 
为了防止被撞库，解决方法 1，对处理后的密文再进行加密
                       2，给密码加盐（顾名思义）
*/
// 对密码加密
let info = sha512.update(screat,'utf-8')
// 使用digest方法打印处理后的密文
console.log(info.digest('hex'));