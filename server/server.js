require('dotenv').config();
var express = require('express')
var bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const https = require('https')
const Sequelize = require('sequelize')
var http = require('http');
const session = require('express-session')
const cors = require('cors')
const passportInit = require('./lib/passport.init')
const authRouter = require('./lib/auth.router')
const {checklogin} = require('./lib/auth.controller')
const {checkToken} = require('./lib/middleware')
const {payment} = require('./lib/payment.controller')

const socketio = require('socket.io')
var passport = require('passport');
SESSION_SECRET="justfortesting"
CLIENT_ORIGIN="http://localhost:3000"

const sequelize = new Sequelize('tshirtshop_db', 'root', '', {
  host: '192.168.0.135',
  dialect: 'mysql',
  port:3306
});


var app = express()

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: SESSION_SECRET, resave: true, saveUninitialized: true }));

const httpServer = http.createServer(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(passport.initialize());
passportInit()
app.use(cors({
    origin: CLIENT_ORIGIN
  }))
const io = socketio(httpServer)
app.set('io', io)

const port = 5000
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })



// Define routes.
app.get('/api/checkuser',checkToken,checklogin);

app.post('/payment',jsonParser,payment);

app.get('/loginsuccess', function (req, res) {
    res.render('success');
  });

  io.on('test',function(msg){
      console.log("fgdfgdfgdfgdfgdfgdgdfdffsfsd+++++++++++++++++++");
  })

app.get('/api/product', (req, res) => {
  sequelize
    .query('CALL catalog_get_product_details (3)')
    .then(product=>res.json(product));
  })
app.get('/api/products', (req, res) => {
  sequelize
    .query('CALL catalog_get_products_in_category (:inCategoryId, :inShortProductDescriptionLength, :inProductsPerPage, :inStartItem )',
          {replacements: { inCategoryId: 6, inShortProductDescriptionLength: 10, inProductsPerPage:10, inStartItem:1}})
    .then(cat_products=>res.json(cat_products));
  });

app.use('/api/sociallogin', authRouter)


// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  res.send('welcome, ' + req.body.username);
})

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
  // create user in req.body
})

httpServer.listen(process.env.PORT || 5000, () => {
    console.log('listening...')
})