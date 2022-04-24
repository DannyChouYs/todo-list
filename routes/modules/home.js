// home路由模組
// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo.js')

// 定義首頁路由
router.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({_id: 'asc'})
    .then(todos => {
      res.render('index', {todos})
    })
    .catch(error => console.log(error))
})
// 匯出路由模組
module.exports = router