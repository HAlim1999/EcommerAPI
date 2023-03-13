const {Schema, model} = require('mongoose')

const productSchema = new Schema({
  name: String, 
  imgURL: String,
  price: Number,
  countInStock: Number,
  category: String,
user:{
  type: String,
  require: true,
}
},{
  timestamps: true,
  versionKey: false
})

module.exports = model('Products', productSchema)