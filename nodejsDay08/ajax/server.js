const express = require('express')

const app = express()
const path = require('path')
// const fs = require('fs')



app.listen('3002', err => {
  if (err) {
    console.log(err);
    return
  }
  console.log('访问http://127.0.0.1:3002');
})

app.get('/', (req, res) => {
  const filePath = path.resolve(__dirname, "./01.ajax基础应用.html");
  res.sendFile(filePath)
})
app.get('/login', (req, res) => {
  const data = {
    code: 1,
    mes: 'ok'
  }
  res.json(data)
})