const fs = require('fs')
// 定义一个路径，拼接文件
const path = require('path')
const filePath = path.resolve(__dirname,'01.txt')
const fd = fs.openSync(filePath,'a')
fs.writeSync(fd,'窗外的麻雀，在电线杆上多嘴')
fs.closeSync(fd)