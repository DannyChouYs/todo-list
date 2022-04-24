const express = require('express')

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')

const { redirect } = require('express/lib/response')

const app = express()



app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended: true}))

app.use(methodOverride('_method')) // 設定每一筆請求都會透過 methodOverride 進行前置處理

app.use(routes)


app.listen(3000, () => {
  console.log('App is Run on http://localhost:3000/')
})