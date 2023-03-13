const {Schema, model} = require('mongoose')

const orderSchema = new Schema({
  name: String, 
  price: Number,
  quantity: Number,
  user: String,
},{
  timestamps: true,
  versionKey: false
})

module.exports = model('Order', orderSchema)