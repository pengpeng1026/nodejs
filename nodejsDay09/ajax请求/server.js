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

app.get('/', (req, res) => {
  const filePath = path.resolve(__dirname, './index.html')
  res.sendFile(filePath)
})

app.get('/login', (req, res) => {
  const {
    user,
    pass
  } = req.query
  console.log(req.query);
  if (user === 'laowang' && pass === '122') {
    const data = {
      mes: 'ok',
      code: 1
    }
    return res.json(data)
  }
  const err = {
    mes: "no ok",
    code: 0
  }
  return res.json(err);

})
app.post('/login', (req, res) => {

})