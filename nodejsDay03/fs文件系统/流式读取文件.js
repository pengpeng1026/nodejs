const fs = require('fs')
// 定义一个路径，拼接文件
const path = require('path')
const filePath = path.resolve(__dirname,'02.txt')

const rs = fs.createReadStream(filePath)
let str = '';
rs.on('data',(chunk)=>{
  str += chunk.toString();
}).on('end',()=>{
  // console.log('读取完毕');
  console.log(str);
})
