const db = require('../../config/mongoose')
const Record = require('../record')
const Category = require('../category')
const { recordSeeds } = require('./record.json')

db.once('open', async() => {
  try {
    const categoryData = await Category.find().lean().select('name')
    recordSeeds.forEach(record => {
      record.categoryId = categoryData.find(category => record.category === category.name)._id
    })
    await Record.create(recordSeeds)
    console.log('record seed data create done!')
    console.log('database connection close.')
    return process.exit()
  } catch (e) {
    console.warn(e)
  } 
})