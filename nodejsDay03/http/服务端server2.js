const http = require('http')
const resever = http.createServer((request,response) => {
  response.setHeader('Content-Type','text/plain;charset=utf-8')

  response.end('halo')
})
resever.listen('8800','192.168.17.54',() => {
  console.log('服务启动中');
})