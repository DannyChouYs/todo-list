const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const Todo = require('./models/todo') //import Todo model
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

// render index
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => {
      res.render('index', {todos})
    })
    .catch(error => console.log(error))
})

// render new page
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

// insert new data
app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({name})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// render individual todo
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => {
      res.render('detail', {todo})
    })
    .catch(error => console.lpg(error))
})

// render edit page
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => {
      res.render('edit', {todo})
    })
    .catch(error => console.lpg(error))
})

// update data
app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const {name, isDone} = req.body
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.lpg(error))
})

// delete data
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('App is Run on http://localhost:3000/')
})