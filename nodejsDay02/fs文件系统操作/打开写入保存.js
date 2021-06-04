// 操作之前先引入fs模块
const fs = require('fs')
// 打开文件，会返回一个标识符，保存标识符
let fd = fs.openSync('./1.txt','w')
//文件内写入内容
fs.writeSync(fd,'您好呀')
// 保存并关闭文件
fs.closeSync(fd)