const prodcutCtrls = {};

const Product = require('../models/Product.js');
const Market = require('../models/Market.js');
const { request } = require('../server.js');



prodcutCtrls.renderProductMarket = async (req, res) => {
  const markets = await Market.find()

  console.log(markets)
   res.render('products/market-products', { markets });
 }




prodcutCtrls.renderProductForm = (req, res) => {
  res.render('products/new-product')  
}

prodcutCtrls.createNewProduct = async (req, res) => {

  
  const {name,imgURL,price,countInStock,category} = req.body;
  const  newProduct = new Product({  name,imgURL,price,countInStock,category})
  const  newProductMarket = new Market({  name,imgURL,price,countInStock,category})
  newProduct.user = req.user.id;
  newProductMarket.user = req.user.id;
  await newProduct.save();
  await newProductMarket.save();

  req.flash('success_msg', 'Producto agragado correctamente')
  res.redirect('/products') 
}; 


prodcutCtrls.renderProducts = async (req, res) => {
 const products = await Product.find({user: req.user.id}).sort({createAt:"desc"});
  res.render('products/all-products', { products });
}

prodcutCtrls.renderEditProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if(product.user != req.user.id){
    req.flash('error_msg', 'Error Usuario no Autorizado')
    return res.redirect('/products');
  }
  res.render('products/edit-product', { product })
}

prodcutCtrls.updateProduct = async (req, res) => {
  const {name,imgURL,price,countInStock,category} = req.body;
  await Product.findByIdAndUpdate(req.params.id, {name,imgURL,price,countInStock,category})
  req.flash('success_msg', 'Producto actualizado correctamente')
  res.redirect('/products')
}

prodcutCtrls.deleteProduct = async (req, res) =>{

  const productEliminado = await Product.findByIdAndRemove(req.params.id);
  console.log(productEliminado)


  req.flash('success_msg', 'Porducto Eliminado correctamente')
  res.redirect('/products')
}





module.exports = prodcutCtrls;