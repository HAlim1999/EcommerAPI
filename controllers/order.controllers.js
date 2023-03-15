const orderCtrls = {};

const Order = require("../models/Orders.js");
const orderConfirm = require("../models/OrderConfirm.js");

orderCtrls.renderCart = async (req, res) => {
  const order = await Order.find({ user: req.user.id }).sort({
    createAt: "desc",
  });

  res.render("products/order-products", { order });
};

orderCtrls.renderMsg = async (req, res) => {
  const order = await Order.find({ user: req.user.id }).sort({
    createAt: "desc",
  });
  console.log(order);

  if (order) {
    order.map((elemt) => {
      (name = elemt.name),
        (price = elemt.price),
        (quantity = elemt.quantity),
        (user = elemt.user);

      const productConfirm = new orderConfirm({ name, price, quantity, user });
      productConfirm.save();
    });
  }
  const products = await Order.deleteMany({ user: req.user.id });
  console.log(products);

  req.flash("success_msg", "Orden confirmada");
  res.redirect("/cart");
};

orderCtrls.addToCart = async (req, res) => {
  const { name, price, quantity } = req.body;
  const addCart = new Order({ name, price, quantity });
  addCart.user = req.user.id;

  console.log(addCart);
  await addCart.save();

  req.flash("success_msg", "Producto agregado correctamente");
  res.redirect("/market");
};

orderCtrls.deleteOrder = async (req, res) => {
  const productEliminado = await Order.findByIdAndRemove(req.params.id);
  console.log(productEliminado);

  req.flash("success_msg", "Porducto Eliminado correctamente");
  res.redirect("/cart");
};

module.exports = orderCtrls;
