const fs = require('fs')
// 定义一个路径，拼接文件
const path = require('path')
// const filePath = path.resolve(__dirname,'02.txt')

const inputFilePath = '01.复习.mp4'
const outputFilePath = '02.mp4'

// 创造一个可读流
const rs = fs.createReadStream(inputFilePath)
// 创造一个可写流
const ws = fs.createWriteStream(outputFilePath)
// 监听流的读取完毕
rs.on('data',(chunk)=>{
  ws.write(chunk)
}).on('end',()=>{
  console.log('写入成功');
})

