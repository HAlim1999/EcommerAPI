const {Schema, model} = require('mongoose')

const orderConfirmSchema = new Schema({
  name: String, 
  price: Number,
  quantity: Number,
  user: String,
},{
  timestamps: true,
  versionKey: false
}) 

module.exports = model('OrderConfirm', orderConfirmSchema)