const express = require('express')
const app = express()

const fs = require('fs')
const path = require('path')

app.listen('3005', err => {
  if (err) {
    console.log(err);
    return
  }
  console.log('http://127.0.0.1:3005');
})


app.get('/login', (req, res) => {
  const {
    user,
    pass,
    callback
  } = req.query
  console.log(req.query);
  if (user === 'laowang' && pass === '122') {
    const data = {
      mes: 'ok',
      code: 1
    }
    res.set('content-type','application/javascript;charset=utf-8')
    return res.send(`${callback}(${JSON.stringify(data)})`)
  }
  const err = {
    mes: "no ok",
    code: 0
  }
  return res.json(err);

})
