const mongoose = require('mongoose');

// mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

})
.then(db => console.log('Connect'))
.catch(err => console.log(err))
