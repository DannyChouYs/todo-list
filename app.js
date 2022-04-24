const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Todo = require('./models/todo') //import Todo model

const routes = require('./routes')

const { redirect } = require('express/lib/response')

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

app.use(bodyParser.urlencoded({extended: true}))

app.use(methodOverride('_method')) // 設定每一筆請求都會透過 methodOverride 進行前置處理

app.use(routes)


app.listen(3000, () => {
  console.log('App is Run on http://localhost:3000/')
})