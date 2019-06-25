require("dotenv").config();
var express = require("express");
var bcrypt = require('bcrypt');
var bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const https = require("https");
const Sequelize = require("sequelize");

let jwt = require("jsonwebtoken");

var http = require("http");
const session = require("express-session");
const { check, validationResult } = require("express-validator/check");
const expressValidator = require("express-validator");
const cors = require("cors");
const passportInit = require("./lib/passport.init");
const authRouter = require("./lib/auth.router");
const { checklogin } = require("./lib/auth.controller");
const { checkToken } = require("./lib/middleware");
const { cryptPassword, comparePassword } = require("./lib/pgen");
const uniqueString = require("unique-string");

// Mail functionality
let mail = require("./nodeMailer");

const socketio = require("socket.io");
var passport = require("passport");
SESSION_SECRET = "justfortesting";

// CLIENT_ORIGIN="https://reactshop.amoha.co"
CLIENT_ORIGIN = "http://localhost:3000";
const stripe = require("stripe")("sk_test_rxGG6bAyvVn3goQP3AimI5dz");

let secret_key = require("./config.js").secret_key;

const port = 5000;
var app = express();
app.use(require("morgan")("combined"));
app.use(expressValidator());
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

const httpServer = http.createServer(app).listen(5000, () => {
  console.log(`Running on https://reactshop.amoha.co:${port}`);
});

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(passport.initialize());
passportInit();
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);
const io = socketio(httpServer);
app.set("io", io);

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectID = require('mongodb').ObjectID;

/*
 * To get API token
 */
app.get("/api/get_token", (req, res) => {
  let token = jwt.sign({}, secret_key, { expiresIn: "2h" });
  return res.json({ status: "success", token: token });
});

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("react-shop-admin");


    /*
     * To get Login Details
     */
    app.post("/api/login", checkToken, jsonParser, function(req, res) {
      let email = req.body.email;
      let pwd = req.body.pwd;
      dbo.collection("users").find({ email: { $eq: email } }).toArray(function(err, users) {
        // console.log(users);
        if(users.length>0){
            bcrypt.compare(pwd,users[0].password, function(error, result) {
              // res == true
            // console.log(result);
            if (error) {
              return res.json({ status: "error", msg: "Incorrect password." });
            } else if (result == false) {
              return res.json({ status: "error", msg: "Incorrect password." });
            } else if (result) {
                  let user = { name: users[0].name.first+' '+users[0].name.last, email: users[0].email };
                  let token = jwt.sign({ email: users[0].email, user: user }, secret_key, {
                    expiresIn: "2h"
                  });
                  return res.json({
                    status: "success",
                    user: user,
                    token: token
                  });
            }
            });
        }else {
          return res.json({
                  status: "error",
                  msg:
                    "Seems like you haven't registered.Please signup through other means."
          });
        }
      });
      });

      /*
       * To get sociallogin Details
       */
      app.use("/api/sociallogin", authRouter);

      /*
       * To get Login Success
       */
      app.get("/loginsuccess", function(req, res) {
        res.render("success");
      });

      /*
       * To get Check User
       */
      app.get("/api/checkuser", checkToken, checklogin);

      /*
       * To get Set Password
       */
      app.get("/setpassword", function(req, res) {
        let userEmail= req.session.user.email;
        dbo.collection("users").find({ email: { $eq: userEmail } }).toArray(function(err, data) {
            if (data.length > 0) {
              return res.redirect("loginsuccess");
            } else {
              return res.render("userform", {
                errors: null,
                user: { name: req.session.user.name, email: req.session.user.email }
              });
            }
          });
      });

      /*
       * To get forbidden
       */
      app.get("/forbidden", function(req, res) {
        res.render("forbidden");
      });

      /*
       * To Post Set Password
       */
      app.post(
        "/setpassword",
        [
          // username must be an email
          check("name")
            .isLength({ min: 1 })
            .withMessage("Name is required."),
          check("email")
            .isLength({ min: 1 })
            .withMessage("Name is required.")
            .isEmail()
            .withMessage("Please provide a valid email address"),
          check("pwd")
            .isLength({ min: 0 })
            .withMessage("Password is required.")
            .isLength({ min: 6 })
            .withMessage("Minimum 6 characters required."),
          check("rpwd")
            .custom((value, { req }) => value === req.body.pwd)
            .withMessage("Passwords must matched.")
        ],
        function(req, res) {
          if (req.session.user) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              res.render("userform", { errors: errors.array(), user: req.body });
            } else {
              cryptPassword(req.body.pwd, function(error, hash) {
                if (hash) {
                    let user = {
                        name:{first: req.body.name,last: ""},
                        isAdmin:false,
                        email:req.body.email,
                        password:hash,
                    };

                    dbo.collection("users").save(user, (err, result) => {
                      if(err) {
                        console.log(err);
                      }
                      res.redirect("loginsuccess");
                    });
                }
              });
            }
          } else {
            res.redirect("forbidden");
          }
        });

       /**************** Customer cart API Calls *****************/

      // /*
      //  * creating customer
      //  * Parameters {inName,inEmail,inPassword}
      //  */
      // app.post("/api/create-customer", checkToken, (req, res) => {
      //   let inName = req.body.inName;
      //   let inEmail = req.body.inEmail;
      //   let inPassword = req.body.inPassword;
      //   sequelize
      //     .query("CALL customer_add(:inName,:inEmail,:inPassword)", {
      //       replacements: { inName: inName, inEmail: inEmail, inPassword: inPassword }
      //     })
      //     .then(create_customer => res.json(create_customer));
      // });
      /*
       * To get customer
       * Parameters {inCustomerId}
       */
      app.post("/api/get-customer", checkToken, (req, res) => {
        // console.log("/api/get-customer",req);
        let inCustomerId = req.body.inCustomerId;
        let inEmail = req.body.inEmail;

        if (inCustomerId) {
            // console.log("inCustomerId",inCustomerId);
          dbo.collection("users").find({ _id: { $eq: inCustomerId } }).toArray(function(err, get_customer) {
              res.json(get_customer);
            });

        } else {
          // console.log("inEmail",inEmail);
          dbo.collection("users").find({ email: { $eq: inEmail } }).toArray(function(err, customer_info) {
              // console.log(customer_info);
              dbo.collection("users").find({ _id: { $eq: customer_info[0]._id } }).toArray(function(err, get_customer) {
                  res.json(get_customer);
              });
          });
        }
      });
      /*
       * To Check User Exist or Not, using given email
       * Parameters {inCustomerId}
       */
      app.post("/api/check-user", checkToken, (req, res) => {
        let inEmail = req.body.inEmail;
        dbo.collection("users").find({ email: { $eq: inEmail } }).toArray(function(err, get_user) {
            res.json(get_user);
        });
      });
      /*
       * To Get Customer Address
       * Parameters {inEmail}
       */
      app.post("/api/get-address", checkToken, jsonParser, (req, res) => {
        let inEmail = req.body.inEmail;
        // let inAddressId = req.body.inAddressId;
        console.log(inEmail);

          dbo.collection("users").find({ email: { $eq: inEmail } }).toArray(function(err, get_user) {
            if(get_user.length > 0){
              dbo.collection("addresses").find({ customer_id: { $eq: get_user[0]._id } }).toArray(function(err, get_address) {
                let address_details=[];
                get_address.map((address,ind)=>{
                  let address_data={};
                    address_data.id=address._id;
                    address_data.customer_id=address.customer_id;
                    address_data.address_name=address.address_name;
                    address_data.address_1=address.address_1;
                    address_data.address_2=address.address_2;
                    address_data.city=address.city;
                    address_data.region=address.region;
                    address_data.postal_code=address.postal_code;
                    address_data.country=address.country;
                    address_data.shipping_region_id=address.shipping_region_id;
                    address_data.day_phone=address.day_phone;
                    address_data.eve_phone=address.eve_phone;
                    address_data.mob_phone=address.mob_phone;
                    address_details.push(address_data);
                });

                res.json(address_details);
              });
            }
          });


      });

      /*
       * To get shipping Regions.
       * Parameters not required
       */
      app.get("/api/get-customer-shipping-regions", checkToken, (req, res) => {
        dbo.collection("shipping_regions").find({}).toArray(function(err, get_shipping_regions) {
          let shipping_region_details=[];
          get_shipping_regions.map((shipping,ind)=>{
            let shipping_data={};
            shipping_data.shipping_region_id=shipping._id;
            shipping_data.shipping_region=shipping.shipping_region;
            shipping_region_details.push(shipping_data);
          })
          res.json(shipping_region_details);
        });
      });

      /*
       * To get order shipping information.
       * Parameters{inShippingRegionId}
       */
      app.post("/api/get-order-shipping-info", checkToken, (req, res) => {
        let inShippingRegionId = req.body.inShippingRegionId;
        dbo.collection("shippings").find({}).toArray(function(err, get_shippings) {
          let shipping_details=[];
          get_shippings.map((shipping,ind)=>{
            let shipping_data={};
            if(shipping.shipping_region.toString() == inShippingRegionId.toString() ){
              shipping_data.shipping_id=shipping._id;
              shipping_data.shipping_cost=shipping.shipping_cost;
              shipping_data.shipping_type=shipping.shipping_type;
              shipping_data.shipping_region_id=shipping.shipping_region;
              shipping_details.push(shipping_data);
            }
          })
          res.json(shipping_details);
        });
      });

      /*To Post Payment    .....*/
      app.post("/api/payment", checkToken, jsonParser, (req, response) => {
        let amount = Math.round(req.body.amount) * 100;
        let inOrderAddress = req.body.inOrderAddress;
        stripe.customers
          .create({
            email: req.body.email,
            card: req.body.id
          })
          .then(customer => {
            return stripe.charges.create({
              amount,
              description: "Customer Charge",
              currency: "usd",
              customer: customer.id
            });
          })
          .then(charge => {

            dbo.collection("users").find({email: { $eq: req.body.email}}).toArray(function(err, get_user) {
              let order = {
                cart_id: req.body.inCartId,
                order_address: inOrderAddress,
                customer_id: get_user[0]._id,
                shipping_id: req.body.inShippingId,
                tax_id: req.body.inTaxId,
                shipped_on:"",
                status:"",
                total_amount:"",

              };
              let full_order_details = [];
              dbo.collection("orders").save(order, (err, result) => {
                if(err) {
                  console.log(err);
                }
                full_order_details.push({ order_info:  result.ops[0],shipping_address:get_user[0] });
                  dbo.collection("shopping_carts").find({cart_id: { $eq:  result.ops[0].inCartId}}).toArray(function(err, get_cart) {
                    // console.log(get_cart);
                    let order_detail_array=[];
                    get_cart.map((cart,index)=>{
                    let order_detail={};

                    dbo.collection("products").find({_id: { $eq:  cart.product_id}}).toArray(function(err, product) {
                      // console.log("products",product);
                      order_detail={
                        order_id:result.ops[0]._id,
                        product_id:cart.product_id,
                        attributes:cart.attributes,
                        product_name:product[0].name,
                        quantity:cart.quantity,
                        unit_cost:product[0].discounted_price,
                      }
                      order_detail_array.push(order_detail);
                    dbo.collection("order_details").save(order_detail, (err, order_detail_result) => {
                      if(err) {
                        console.log(err);
                      }
                        full_order_details.push({ products: order_detail_array });

                      // console.log(order_detail_array,full_order_details);
                    });
                  });
                });
                mail.orderEmail(
                  full_order_details,
                  req.body.email
                );
                return response.json({ status: "order created" });
              });
                });

              });
            })
          .catch(err => {
            console.log("Error:", err);
            response.status(500).send({ error: "Purchase Failed" });
          });
      });

      /*
       * To Add Customer Address
       * Parameters {inEmail,inAddressName, inAddress1, inAddress2, inCity, inPostalCode, inCountry, inDayPhone, inEvePhone, inMobPhone}
       */
      app.post("/api/add-address", checkToken, jsonParser, (req, res) => {
        let inEmail = req.body.inEmail;
        let inAddressName = req.body.inAddressName;
        let inAddress1 = req.body.inAddress1;
        let inAddress2 = req.body.inAddress2;
        let inCity = req.body.inCity;
        let inRegion = req.body.inRegion;
        let inPostalCode = req.body.inPostalCode;
        let inCountry = req.body.inCountry;
        let inShippingRegionId = req.body.inShippingRegionId;
        let inDayPhone = req.body.inDayPhone;
        let inEvePhone = req.body.inEvePhone;
        let inMobPhone = req.body.inMobPhone;
        dbo.collection("users").find({email: { $eq: req.body.inEmail}}).toArray(function(err, get_user) {
          let address_details={};
          console.log(get_user);

              address_details={
                customer_id: get_user[0]._id,
                address_name: inAddressName,
                address_1: inAddress1,
                address_2: inAddress2,
                city: inCity,
                region: inRegion,
                postal_code: inPostalCode,
                country: inCountry,
                shipping_region_id: inShippingRegionId,
                day_phone: inDayPhone,
                eve_phone: inEvePhone,
                mob_phone: inMobPhone,

              };

            dbo.collection("addresses").save(address_details, (err, address_detail_result) => {
              if(err) {
                console.log(err);
              }
              res.json(address_detail_result.ops[0]);
            });
        });
      });

      /*
       * To Update Customer Address
       * Parameters {inEmail, inAddressId, inCustomerId, inAddressName, inAddress1, inAddress2, inCity, inPostalCode, inCountry, inDayPhone, inEvePhone, inMobPhone}
       */
      app.post("/api/update-address", checkToken, jsonParser, (req, res) => {
        let inEmail = req.body.inEmail;
        let inAddressId = req.body.inAddressId;
        let inAddressName = req.body.inAddressName;
        let inAddress1 = req.body.inAddress1;
        let inAddress2 = req.body.inAddress2;
        let inCity = req.body.inCity;
        let inRegion = req.body.inRegion;
        let inPostalCode = req.body.inPostalCode;
        let inCountry = req.body.inCountry;
        let inShippingRegionId = req.body.inShippingRegionId;
        let inDayPhone = req.body.inDayPhone;
        let inEvePhone = req.body.inEvePhone;
        let inMobPhone = req.body.inMobPhone;
        var address_id = {
          _id: new ObjectID(inAddressId)
        };
          dbo.collection("users").find({email: { $eq: req.body.inEmail}}).toArray(function(err, get_user) {
            let address_details={};
            console.log(get_user);
            address_details={
              customer_id: get_user[0]._id,
              address_name: inAddressName,
              address_1: inAddress1,
              address_2: inAddress2,
              city: inCity,
              region: inRegion,
              postal_code: inPostalCode,
              country: inCountry,
              shipping_region_id: inShippingRegionId,
              day_phone: inDayPhone,
              eve_phone: inEvePhone,
              mob_phone: inMobPhone,

            };
         dbo.collection("addresses").updateOne(address_id, {$set:address_details}, (err, update_address) => {
          if(err) {
            throw err;
          }
          res.json(update_address)
         });
        });
      });
      /*
       * To Delete Customer Address
       * Parameters {inAddressId}
       */
      app.post("/api/delete-customer-address", checkToken, (req, res) => {
        let inAddressId = {_id: ObjectID(req.body.inAddressId)};
        dbo.collection('addresses').deleteOne(inAddressId, (err, delete_address) => {
          if(err) {
            throw err;
          }
          res.json(delete_address)
        });
      });


    /*
     * To get all departments
     */
    app.get("/api/get-departments", checkToken, (req, res) => {
    dbo.collection("departments").find({}).toArray(function(err, departments) {
      if (err) throw err;
      let departments_details={};
      let departments_array=[];
      departments.map((value,index)=>{
      departments_details.department_id=value._id;
      departments_details.slug=value.slug;
      departments_details.name=value.name;
      departments_array.push(departments_details);
      departments_details={};
    });

    res.json(departments_array);
         // db.close();
    });
  });

  /*
   * To get all categories using departmentid
   * Parameters {inDepartmentId}
   */
   app.post("/api/get-department-categories", checkToken, (req, res) => {
       let department =ObjectID(req.body.inDepartmentId);

       dbo.collection("categories").find({department:department}).toArray(function(err, categories) {
         if (err) throw err;
         let category_array=[];
         categories.map((value,index)=>{
         let category_details={};
         category_details.category_id=value._id;
         category_details.slug=value.slug;
         category_details.name=value.name;
         category_details.state=value.state;
         category_details.department=value.department;
         category_details.publishedDate=value.publishedDate;
         category_array.push(category_details);
       });
         res.json(category_array);
         // db.close();
       });
    });
    /*
     * To get all products using department id
     * Parameters {inDepartmentId, inShortProductDescriptionLength, inProductsPerPage, inStartItem }
     */
    app.post("/api/get-department-products", checkToken, (req, res) => {

      let inDepartmentId = ObjectID(req.body.inDepartmentId);

      dbo.collection("categories").find({department:inDepartmentId}).toArray(function(err, categories) {
        if (err) throw err;
        let category=[];
          categories.map((cat_data, index)=>{
            category.push(ObjectID(cat_data._id));
          });

          //let inShortProductDescriptionLength = ObjectID(req.body.inShortProductDescriptionLength);
          //let inProductsPerPage =  ObjectID(req.body.inProductsPerPage);
        //  let inStartItem =  ObjectID(req.body.inStartItem);
          dbo.collection("products").find({categories:{$in:category}}).toArray(function(err, products) {

            let products_array=[];
            let product_details=[];
            products.map((value,index)=>{
            product_details={};
            product_details.product_id=value._id;
            product_details.slug=value.slug;
            product_details.name=value.name;
            product_details.image=value.image.secure_url;
            product_details.image2=value.image2.secure_url;
            product_details.thumbnail=value.thumbnail.secure_url;
            product_details.price=value.price;
            if(value.discounted_price<=0){
                product_details.discounted_price=value.price;
              }else {
                product_details.discounted_price=value.discounted_price;
              }
            product_details.category_id=value.categories;
            products_array.push(product_details);

          });

            if (err) throw err;
            res.json(products_array);
            // db.close();
          });
      });
      });
      /*
       * To get all category related products using category id.
       * Parameters {inCategoryId, inShortProductDescriptionLength, inProductsPerPage, inStartItem }
       */
      app.post("/api/get-category-products", checkToken, (req, res) => {
        let inCategoryId = ObjectID(req.body.inCategoryId);
        let inShortProductDescriptionLength =
          req.body.inShortProductDescriptionLength;
        let inProductsPerPage = req.body.inProductsPerPage;
        let inStartItem = req.body.inStartItem;
        dbo.collection("products").find({categories:{$in:[inCategoryId]}}).toArray(function(err, products) {
          let products_array=[];
          let product_details=[];
          products.map((value,index)=>{
          product_details={};
          product_details.product_id=value._id;
          product_details.slug=value.slug;
          product_details.name=value.name;
          product_details.image=value.image.secure_url;
          product_details.image2=value.image2.secure_url;
          product_details.thumbnail=value.thumbnail.secure_url;
          product_details.price=value.price;
          if(value.discounted_price<=0){
              product_details.discounted_price=value.price;
            }else {
              product_details.discounted_price=value.discounted_price;
            }
          product_details.category_id=value.categories;
          products_array.push(product_details);

        });

          if (err) throw err;
          res.json(products_array);
          // db.close();
        });
      });
      /*
       * To get product details
       * Parameters {inProductId}
       */
      app.post("/api/product", checkToken, (req, res) => {
        let inProductId = ObjectID(req.body.inProductId);

        dbo.collection("products").find({}).toArray(function(err, products) {

          let products_array=[];
          let product_details=[];

          products.map((value,index)=>{

            let product_Id = ObjectID(value._id);

            if(inProductId.toString() === product_Id.toString()){
              product_details.product_id=value._id;
              product_details.slug=value.slug;
              product_details.name=value.name;
              product_details.image=value.image.secure_url;
              product_details.image2=value.image2.secure_url;
              product_details.thumbnail=value.thumbnail.secure_url;
              product_details.price=value.price;
              if(value.discounted_price<=0){
                product_details.discounted_price=value.price;
              }else {
                product_details.discounted_price=value.discounted_price;
              }
              product_details.category_id=value.categories;
              products_array.push(product_details);
            }

          product_details={};
        });
          if (err) throw err;
          res.json(products_array);
          // db.close();
        });

      });

      /*
       * To get product locations
       * Parameters {inProductId}
       */
      app.post("/api/get-product-locations", checkToken, (req, res) => {
        let inProductId = ObjectID(req.body.inProductId);
        dbo.collection("products").find({}).toArray(function(err, products) {
          let products_array=[];
          let product_details=[];
          products.map((value,index)=>{
            product_details={};
            let product_Id = ObjectID(value._id);
            let category_Id = ObjectID(value.categories[0]);
              if(inProductId.toString() === product_Id.toString()){
                dbo.collection("categories").find({_id:category_Id}).toArray(function(err, categories) {
                  let department_Id = ObjectID(categories[0].department);
                  let category_name= categories[0].name;
                  dbo.collection("departments").find({_id:department_Id}).toArray(function(err, departments) {

                  product_details.category_id=category_Id;
                  product_details.category_name=category_name;
                  product_details.department_id=departments[0]._id;
                  product_details.department_name=departments[0].name;
                  products_array.push(product_details);

                  if (err) throw err;
                  res.json(products_array);
                  // db.close();
                });
                if (err) throw err;
                // db.close();
              });
            }
        });
        if (err) throw err;
        // db.close();
        });
      });

      /*
       * To get product recommendations
       * Parameters{inProductId, inShortProductDescriptionLength}
       */
      app.post("/api/get-product-recommendations", checkToken, (req, res) => {
        let inProductId = ObjectID(req.body.inProductId);
        let inShortProductDescriptionLength =
          req.body.inShortProductDescriptionLength;

      });

      /*
       * To add Selected Product to Cart insert or update Cart details.
       * Parameters{inCartId,inProductId,inAttributes}
       */
      app.post("/api/add-product-to-cart", checkToken, (req, res) => {
        let inCartId = req.body.inCartId;
        let inProductId = ObjectID(req.body.inProductId);
        let inAttributes = req.body.inAttributes;

        let i=1;
        if (!inCartId || inCartId == "null" || inCartId == null)
            inCartId = uniqueString();
            let cart_productid="";
            dbo.collection("shopping_carts").find({cart_id:inCartId}).toArray(function(err, cart_details) {
              // console.log("cart_details.product_id:",cart_details);
              if(cart_details[0]){
                cart_productid=cart_details[0].product_id;
              }

                if(inProductId.toString()===cart_productid.toString()){

                  let quantity_details=cart_details[0].quantity+1;
                  var shopping_cart_id = {
                    _id: new ObjectID(cart_details[0]._id)
                  };

                  dbo.collection("shopping_carts").updateOne(shopping_cart_id, {$set:{quantity: parseInt(quantity_details) }}, (err, result) => {
                    if(err) {
                      throw err;
                    }
                  });
                  }else {
                  let shopping_cart = {
                    cart_id: inCartId,
                    product_id: inProductId,
                    attributes:inAttributes,
                    quantity: parseInt(i) ,
                    buy_now:i,
                  };
                  dbo.collection("shopping_carts").save(shopping_cart, (err, result) => {
                    if(err) {
                      console.log(err);
                    }
                  });
                }
            });
          res.json({ inCartId: inCartId,inProductId:inProductId });
      });

      /*
       * To get all products from Cart.
       * Parameters{inCartId}
       */
      app.post("/api/get-shopping-cart-products", checkToken, (req, res) => {
        let inCartId =req.body.inCartId;
        dbo.collection("shopping_carts").find({cart_id:inCartId}).toArray(function(err, cart_details) {
        if (err) throw err;
        dbo.collection("products").find({}).toArray(function(err, products) {
        let products_array=[];
        let product_details={};
            products.map((value,index)=>{
              cart_details.map((cat_data, index)=>{
                let cart_id=cat_data._id;
                let attributes=cat_data.attributes;
                let quantity=parseInt(cat_data.quantity);
                if(cat_data.product_id.toString()==value._id.toString())
                {
                  let subTotal="";
                  product_details.item_id=cart_id;
                  product_details.slug=value.slug;
                  product_details.name=value.name;
                  product_details.thumbnail=value.thumbnail.secure_url;
                  product_details.attributes=attributes;
                  product_details.price=value.price;
                  product_details.quantity=quantity;
                  if(value.discounted_price<=0){
                    subTotal=quantity*value.price;
                    product_details.discounted_price=value.price;
                  }else {
                    product_details.discounted_price=value.discounted_price;
                    subTotal=quantity*value.discounted_price;
                  }
                  product_details.subtotal=subTotal;
                  products_array.push(product_details);
                  product_details={};
                }
              });
            });
            // console.log("products_array",products_array);
            res.json(products_array);
        });
      });
     });


   /*
    *To remove product from cart.
    * Parameters{inItemId}
    */
   app.post("/api/remove-product-from-cart", checkToken, (req, res) => {
     let inItemId = ObjectID(req.body.inItemId);

     dbo.collection('shopping_carts').deleteOne( { _id:inItemId}, (err, result) => {
      if(err) throw err;
      res.json("removed from cart");
     });

   });
   /*
    * To update the shopping by increasing the quantity.
    * Parameters{inItemId,inQuantity}
    */
   app.post("/api/cart-update", checkToken, (req, res) => {
     let inItemId = ObjectID(req.body.inItemId);
     let inQuantity = parseInt(req.body.inQuantity);

     dbo.collection('shopping_carts').updateOne({_id:inItemId}, {$set:{quantity: inQuantity}}, (err, result) => {
      if(err) throw err;
      res.json("updated cart");
     });

   });
   /*
    * To get cart total amount.
    * Parameters{inCartId}
    */
   // app.post("/api/get-cart-total", checkToken, (req, res) => {
   //   let inCartId = req.body.inCartId;
   //   sequelize
   //     .query("CALL shopping_cart_get_total_amount(:inCartId)", {
   //       replacements: { inCartId: inCartId }
   //     })
   //     .then(get_total_amount => res.json(get_total_amount));
   // });

   /*
    * To delete Product Items from Cart.
    * Parameters{inCartId}
    */
   // app.post("/api/shopping-cart-empty", checkToken, (req, res) => {
   //   let inCartId = req.body.inCartId;
   //   sequelize
   //     .query("CALL shopping_cart_empty(:inCartId)", {
   //       replacements: { inCartId: inCartId }
   //     })
   //     .then(empty_cart => res.json(empty_cart));
   // });


});
