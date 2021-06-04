const fs = require('fs')
// 定义一个路径，拼接文件
const path = require('path')
// const { resolve } = require('path/posix')
const filePath = path.resolve(__dirname, '01.txt');

// 这种方式写入解决回调地狱没有毛病，但是async函数内写入内容太多不好维护，可以优化该方法
(async () => {
  const fd = await new Promise((resolve, reject) => {
    fs.open(filePath, 'a', (err, fd) => {
      if (err) {
        reject(err)
        return
      }
      resolve(fd)
    })
  })
  await new Promise((resolve, reject) => {
    fs.write(fd, '你是一个好人', (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
  const re = await new Promise((resolve, reject) => {
    fs.close(fd, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve('写入成功，已关闭文件')
    })
  })
  return re
})()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  })

/* fs.open(filePath,'a',(err,fd)=>{
  if(err){
    return
  }
  fs.write(fd,',你说这一句，很有夏天的感觉',(err)=>{
    if(err){
      return
    }
    fs.close(fd,(err)=>{
      console.log('成功保存并关闭');
    })
  })
}) */