const {Router} = require('express');

const router = Router();
const { renderIndex, renderAbout }= require('../controllers/index.controllers.js')
const {renderProductMarket} = require('../controllers/market.controlles.js');

router.get('/', renderProductMarket )

router.get('/about', renderAbout)



module.exports = router