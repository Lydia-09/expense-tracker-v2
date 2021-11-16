const db = require('../../config/mongoose')
const Category = require('../category')
const { categorySeeds } = require('./category.json')

db.once('open', async() => {
  try {
    await Category.create(categorySeeds)
    console.log('category seed data create done!')
    console.log('database connection close.')
    return process.exit()
  } catch (e) {
    console.warn(e)
  } 
})