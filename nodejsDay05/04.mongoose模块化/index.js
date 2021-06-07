// 引入模块
require('./db/index')
const peopleModel = require('./schema/people')
peopleModel.create({
  name:'laowang',
  age:111
})
.then(data => {
  console.log(data);
})
.catch(err => {
  console.log(err);
})