const http = require('http')

const url = 'http://192.168.17.54:8800'
const request = http.request(url,(response) => {
  // 客户端从服务端请求回来的数据是可读流，可以通过绑定data事件来监听流的读取以及成功
  response.on('data',(chunk) => {
    console.log(chunk.toString());
    console.log(response.statusCode);
  })
  response.on('end',() => {
    console.log('数据请求完毕');
  })

})

request.end()