const mongoose = require('mongoose')
const Todo = require('../todo.js')

mongoose.connect(process.env.MONGODB_URI, {newUserUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', () => {
  console.log('Error!')
})

db.once('open', () => {
  console.log('MongoDB connected!')

  for (let i = 0; i < 10; i++) {
    Todo.create({name: `name-${i}`})
  }

  console.log('done!')
})