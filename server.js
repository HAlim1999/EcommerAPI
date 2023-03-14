const express = require('express');
const exphbs = require("express-handlebars");
const path = require('path');
const morgan = require('morgan');
const MethodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const { request } = require('http');
const passport = require('passport');
const bodyParser = require('body-parser');

//Inicio

const app = express();
require('./config/passport')


//Config
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs.engine({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  },
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');




//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(MethodOverride('_method'))
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(bodyParser.urlencoded({ extended: true }));


//Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;

  next();
})



//Routes
app.use('/', require('./routes/index.routes.js'))
app.use(require('./routes/products.routes.js'))
app.use(require('./routes/user.routes.js'))
app.use(require('./routes/market.routes.js'))
app.use(require('./routes/order.routes.js'))


//Static Files
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;
