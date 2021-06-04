const fs = require('fs')
// 定义一个路径，拼接文件
const path = require('path')
const filePath = path.resolve(__dirname,'02.txt')

// 创建一个可写流
const ws = fs.createWriteStream(filePath,{flag:'w'})

// 绑定事件监听流的开始和完成
ws.on('open',()=>{
  console.log('开始流式写入');
})
ws.on('close',()=>{
  console.log('流式写入完成');
})

// 可写流有一个write方法，每次调用会写入
ws.write('窗外的麻雀，在电线杆上多嘴，')
ws.write('你说这一句，很有夏天的感觉，')
ws.write('秋刀鱼的滋味，猫跟你都想了解。')
// 关闭流
ws.end()