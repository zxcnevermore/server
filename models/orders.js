const { Schema, model } = require('mongoose')


const Orders = new Schema({
  name: { type: String, requried: true },
  nomer: { type: Number, requried: true, unique: true }
})

module.exports = model('Orders', Orders)
