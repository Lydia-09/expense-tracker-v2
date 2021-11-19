const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const record = require('../../models/record')

router.get('/', (req, res) => {
  // 取得排序選項
  const sortValueString = req.query.sort
  // 排序選項對應查詢
  const sortOption = {
    amount: {amount: 'desc'},
    lessAmount: {amount: 'asc'},
    newDate: {date: 'desc'},
    oldDate: {date: 'asc'},
    name: {name: 'asc'},
    category: {categoryId: 'asc'}
  }
  // 提供 boolean 資訊給 handlebars helper, 設定 sort 選項
  const sort = sortValueString ? { [sortValueString]: true } : { 'id': true }

  Record.find()
    .lean()
    .populate('categoryId')
    .sort(sortOption[sortValueString])
    .then(records => {
      const totalAmount = records.map(record => record.amount).reduce((a, b) => a + b)
      res.render('index', { records, sort, totalAmount })
    })
    .catch(error => console.error(error))
})

module.exports = router