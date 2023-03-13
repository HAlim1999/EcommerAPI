const {Router} = require('express');

const router = Router();

const { renderProductForm, createNewProduct, renderProducts, renderEditProduct, updateProduct, deleteProduct,renderProductMarket} = require('../controllers/products.controllers.js');


const {isAuthenticated} = require('../helpers/auth.js')




router.get('/products/add',isAuthenticated, renderProductForm)

router.post('/products/new-product',isAuthenticated, createNewProduct) 

router.get('/products',isAuthenticated, renderProducts)



///-----------
router.get('/products/edit/:id',isAuthenticated, renderEditProduct)



router.put('/products/edit/:id',isAuthenticated, updateProduct )



router.delete('/products/delete/:id',isAuthenticated, deleteProduct)



module.exports = router;