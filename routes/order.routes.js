const {Router} = require('express');

const router = Router();

const {renderCart, addToCart, deleteOrder, renderMsg} = require('../controllers/order.controllers.js')

const {isAuthenticated} = require('../helpers/auth.js')




router.get('/cart',isAuthenticated, renderCart);

router.post('/cart/add',isAuthenticated, addToCart);

router.delete('/order/delete/:id',isAuthenticated, deleteOrder)

router.post('/confim',isAuthenticated, renderMsg )

module.exports = router; 