const {Schema, model} = require('mongoose')

const marketSchema = new Schema(
  {
  name: String, 
  imgURL: String,
  price: Number,
  countInStock: Number,
  category: String,
  Id: String,
user:{
  type: String,
  require: true,
}},
{
  timestamps: true,
  versionKey: false
})

module.exports = model('Market', marketSchema)