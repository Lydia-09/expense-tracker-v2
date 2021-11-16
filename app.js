const express = require('express')
const mongoose = require('mongoose')
const { engine } = require('express-handlebars')
const app = express()

mongoose.connect('mongodb://localhost/expense-tracker-v2')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})