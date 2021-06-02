//内置了os模块，可以直接引入
const os = require('os')
const free = os.freemem()
const total = os.totalmem()
const scale = free / total
console.log((scale * 100).toFixed(2) + '%');