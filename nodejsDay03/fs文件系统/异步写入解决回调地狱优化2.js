const fs = require('fs')
// 定义一个路径，拼接文件
const path = require('path')
// const { resolve } = require('path/posix')
const filePath = path.resolve(__dirname, '01.txt');

// 优化方法
/* 
将open，write，close都分别封装，后续改动的化只用改动相应的函数内代码
*/
function open() {
  // 一定要将函数内的promise返回，否则await无法等待promise对象
  return new Promise((resolve, reject) => {
    fs.open(filePath, 'a', (err, fd) => {
      if (err) {
        reject(err)
        return
      }
      resolve(fd)
    })
  })
}

function write(fd) {
  return new Promise((resolve, reject) => {
    fs.write(fd, '你是一个好人', (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

function close(fd) {
  return new Promise((resolve, reject) => {
    fs.close(fd, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve('写入成功，已关闭文件')
    })
  })
  
}
(async () => {
  const fd = await open()
  await write(fd)
  // await等待的一定是promise，
  const re = await close(fd)
  // async函数的函数也是promise，async返回值是函数最后return出去的值 
  return re
})()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  })

