const fs = require('fs')
fs.open('2.txt','w',function(err,fd){
  if(!err){
    fs.write(fd,'write something',function(err){
      if(!err){
        console.log('ok');
      }
    })
  }
})