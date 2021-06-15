const express = require('express')

const app = express()
const path = require('path')
const fs = require('fs')
// 引入压缩
const zlib = require('zlib')


app.listen('3002',err => {
  if(err){
    console.log(err);
    return
  }
  console.log('访问http://127.0.0.1:3002');
})

app.get('/',(req,res) => {
  // 获取请求中accept-encoding可以接受的类型
  console.log(req.headers['accept-encoding']);
  const acceptEncoding = req.headers["accept-encoding"];
  const filePath = path.resolve(__dirname,'./index.html')
  const rs = fs.createReadStream(filePath)
  if(acceptEncoding.includes('gzip')){

    // 返回一个压缩后的文件
    const zlibFile = rs.pipe(zlib.createGzip())
    // 需要在响应头中设置压缩类型
    res.set("Content-Encoding", "gzip")
    return zlibFile.pipe(res)
  }
  if(acceptEncoding.includes('deflate')){
    const zlibFile = rs.pipe(zlib.createDeflate())
    res.set("Content-Encoding", "deflate")
    return zlibFile.pipe(res)
  }
  if(acceptEncoding.includes('BrotliCompress')){
    const zlibFile = rs.pipe(zlib.createBrotliCompress())
    res.set("Content-Encoding", "br")
    return zlibFile.pipe(res)
  }
  // 如果都不符合，直接返回res
  rs.pipe(res)

  
})