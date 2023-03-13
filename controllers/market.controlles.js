const marketCtrls = {};


const Market = require('../models/Market.js');


marketCtrls.renderProductMarket = async (req, res) => {
  const markets = await Market.find()
   res.render('products/market-products', { markets });
 }

 module.exports = marketCtrls;