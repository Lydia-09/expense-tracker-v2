const express = require('express')
const { engine } = require('express-handlebars')
const Record = require('./models/record')
const Category = require('./models/category')

require('./config/mongoose')
const app = express()
const port = 3000

app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .populate('categoryId')
    .then(records => res.render('index', { records }))
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})