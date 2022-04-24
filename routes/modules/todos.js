// todos路由模組

const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo.js')

router.get('/new', (req, res) => {
  return res.render('new')
})

// insert new data
router.post('/', (req, res) => {
  const name = req.body.name
  return Todo.create({name})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// render individual todo
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => {
      res.render('detail', {todo})
    })
    .catch(error => console.lpg(error))
})

// render edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => {
      res.render('edit', {todo})
    })
    .catch(error => console.lpg(error))
})

// update data
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router