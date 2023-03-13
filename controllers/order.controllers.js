const orderCtrls = {} 


const Order = require('../models/Orders.js')


orderCtrls.renderCart = async (req, res)=>{

  const order = await Order.find({user: req.user.id}).sort({createAt:"desc"});

  res.render('products/order-products', {order})


}

orderCtrls.addToCart = async (req, res)=>{

  const {name, price, quantity} = req.body;
  const addCart = new Order({name, price, quantity})
  addCart.user = req.user.id;


  console.log(addCart)
  await addCart.save();

  req.flash('success_msg', 'Producto agragado correctamente')
  res.redirect('/market') 
}

orderCtrls.deleteOrder = async (req, res)=>{
  const productEliminado = await Order.findByIdAndRemove(req.params.id);
  console.log(productEliminado)


  req.flash('success_msg', 'Porducto Eliminado correctamente')
  res.redirect('/cart')


}

module.exports = orderCtrls