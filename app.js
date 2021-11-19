const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')

const app = express()
require('./config/mongoose')

const port = 3000

app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs', helpers: require('./config/helpers') }))
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})