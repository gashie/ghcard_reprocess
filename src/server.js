const express = require('express');
const dotenv = require('dotenv');
const { engine, create } = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const fileupload = require('express-fileupload');

const session = require('express-session');
const passport = require('passport');
const helmet = require('helmet');

// initialisation
const app = express();

//call helmet

//load env vars
dotenv.config({ path: './config/config.env' });

// Settings
app.set('port', process.env.PORT || 5121);
app.set('views', path.join(__dirname, 'views'));
app.engine(
  '.hbs',
  engine({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
  })
);

app.set('view engine', '.hbs');

//helper
const hbs = create({
  /* config */
});
hbs.handlebars.registerHelper('fomartprice', function (price) {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',
  }).format(price);
  return formatter;
});



hbs.handlebars.registerHelper("formatnumber", function(str) {
  var numberFormater = str.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return numberFormater
});
// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

// set session here
var expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

// set flash messages to show
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});
// Routes
// app.use(helmet());
app.use(require('./routes/apps'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

//errror middleware
// app.use((req, res, next) => {
//   const error = new Error('Not found');
//   error.status = 404;
//   next(error);
// });

// app.get'*',(error, req, res, next) => {
//   res.status(error.status || 500);
//   res.render('/apps/errors/index.hbs')
// });
app.use((req, res) => {
  res.render('apps/errors/', { layout: 'notfound.hbs' });
});

//Or a catch-all route
app.get('*', (req, res) => {
  res.render('apps/errors/', { layout: 'notfound.hbs' });
});

module.exports = app;
