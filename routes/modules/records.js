const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const record = require('../../models/record')

// 新增支出
router.get('/new', async (req, res) => {
  const category = await Category.find().lean()
  return res.render('new', { category })
})

// 資料庫新增資料
router.post('/', async (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  const CategoryIcon = await Category.findOne({ name: category }).lean().exec()
  const categoryId = CategoryIcon._id
  await Record.create({
    name, date, category, amount, categoryId, userId
  })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// Read - 瀏覽特定支出
router.get('/:id', async (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  await Record.findOne({ _id, userId })
    .lean()
    .then(record => res.render('detail', { record }))
    .catch((error) => console.log(error))
})

// Update - 修改特定支出
router.get('/:id/edit', async (req, res) => {
  const userId = req.user._id
  const _id = req.params.id  
  const record = await Record.findOne({ _id, userId }).lean()
  const categoryData = await Category.find().select('name').lean() 
  return res.render('edit', { record,  categoryData})
})

router.put('/:id', (req, res) => {  
  const userId = req.user._id
  const _id = req.params.id
  Record.findByIdAndUpdate({ _id, userId }, { $set: req.body })
    .then(()=> res.redirect('/'))
})

// Delete - 刪除特定支出
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router