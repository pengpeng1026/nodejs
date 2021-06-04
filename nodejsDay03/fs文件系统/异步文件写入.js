const fs = require('fs')
// 定义一个路径，拼接文件
const path = require('path')
const filePath = path.resolve(__dirname,'01.txt')

fs.open(filePath,'a',(err,fd)=>{
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
})