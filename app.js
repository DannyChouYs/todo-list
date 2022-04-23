const express = require('express')
const app = express()

app.use('/', (req, res) => {
  res.send('Hello world')
})

app.listen(3000, () => {
  console.log('App is Run on Port: 3000')
})