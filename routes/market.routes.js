const {Router} = require('express');

const router = Router();

const {renderProductMarket} = require('../controllers/market.controlles.js');



router.get('/market', renderProductMarket)


module.exports = router;
