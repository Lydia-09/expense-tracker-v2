const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// 新增支出
router.get('/new', async (req, res) => {
   const category = await Category.find().lean()
  return res.render('new', { category })
})

// 資料庫新增資料
router.post('/', async (req, res) => {
  const { name, date, category, amount } = req.body
  const CategoryIcon = await Category.findOne({ name: category }).lean().exec()
  const categoryId = CategoryIcon._id
  await Record.create({
    name, date, category, amount, categoryId
  })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router