// 引入连接模块
require('./db(用来连接数据库)/index')
// 引入集合并增删改查
const supportModel = require('./scheme（约束对象并暴露）/support')
// 增删改查
supportModel.create({
  name:'gelaoshi',
  age:55,
  sex:'male',

})
.then(data => {
  console.log(data);
})
.catch(err => {
  console.log(err);
})