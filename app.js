const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const app = express()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use('/', (req, res) => {
  res.render('index')
})

app.listen(3000, () => {
  console.log('App is Run on Port: 3000')
})