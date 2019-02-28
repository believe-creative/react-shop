require("dotenv").config();
var express = require("express");
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

const socketio = require("socket.io");
var passport = require("passport");
SESSION_SECRET = "justfortesting";
CLIENT_ORIGIN = "http://localhost:3000";
const stripe = require("stripe")("sk_test_rxGG6bAyvVn3goQP3AimI5dz");

let secret_key = require("./config.js").secret_key;

// const options = {
//   key: fs.readFileSync('/etc/letsencrypt/live/reactshop.amoha.co/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/reactshop.amoha.co/fullchain.pem')
//   };

const sequelize = new Sequelize("tshirtshop_db", "root", "", {
  host: "192.168.0.135",
  dialect: "mysql",
  port: 3306
});

// const sequelize = new Sequelize('tshirtshop_db', 'tshirtshop_dba', 'T$h!Rt$h$o@p!D@b@', {
//   host: 'localhost',
//   dialect: 'mysql',
//   port:3306
// });
exports.sequelize = sequelize;
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

// const httpServer = https.createServer(options, app).listen(5000,() => {
//   console.log(`Running on https://reactshop.amoha.co:${port}`)
// });

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

/*
 * To API token
 */
app.get("/api/get_token", (req, res) => {
  let token = jwt.sign({}, secret_key, { expiresIn: "2h" });
  return res.json({ status: "success", token: token });
});

// Define routes.
app.get("/api/checkuser", checkToken, checklogin);

app.post("/api/payment", jsonParser, (req, response) => {
  let amount = Math.round(req.body.amount) * 100;
  console.log(req.body);
  console.log(amount, req.body.id);
  stripe.customers
    .create({
      email: req.body.email,
      card: req.body.id
    })
    .then(customer => {
      return stripe.charges.create({
        amount,
        description: "Customer Charge",
        currency: "gbp",
        customer: customer.id
      });
    })
    .then(charge => {
      sequelize
        .query(
          "CALL shopping_cart_create_order(:inCartId,:inCustomerId,:inShippingId,:inTaxId)",
          {
            replacements: {
              inCartId: req.body.inCartId,
              inCustomerId: req.body.inCustomerId,
              inShippingId: req.body.inShippingId,
              inTaxId: req.body.inTaxId
            }
          }
        )
        .then(create_order => response.json(create_order));
    })
    .catch(err => {
      console.log("Error:", err);
      response.status(500).send({ error: "Purchase Failed" });
    });
});

app.get("/loginsuccess", function(req, res) {
  res.render("success");
});

app.post("/api/login", jsonParser, function(req, res) {
  let email = req.body.email;
  let pwd = req.body.pwd;
  sequelize
    .query("CALL customer_get_login_info(:inEmail)", {
      replacements: { inEmail: email }
    })
    .then(data => {
      if (data.length > 0) {
        comparePassword(pwd, data[0].password, function(error, result) {
          if (error) {
            return res.json({ status: "error", msg: "Incorrect password." });
          } else if (result == false) {
            return res.json({ status: "error", msg: "Incorrect password." });
          } else if (result) {
            sequelize
              .query("CALL customer_get_customer(:inCustomerId)", {
                replacements: { inCustomerId: data[0].customer_id }
              })
              .then(function(totaldata) {
                let user = { name: totaldata[0].name, email: email };
                let token = jwt.sign(
                  { email: email, user: user },
                  "thisisasecret",
                  { expiresIn: "2h" }
                );
                return res.json({
                  status: "success",
                  user: user,
                  token: token
                });
              });
          }
        });
      } else {
        return res.json({
          status: "error",
          msg:
            "Seems like you haven't registered.Please signup through other means."
        });
      }
    });
});

app.get("/setpassword", function(req, res) {
  sequelize
    .query("CALL customer_get_login_info(:inEmail)", {
      replacements: { inEmail: req.session.user.email }
    })
    .then(data => {
      console.log(data);
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

app.get("/forbidden", function(req, res) {
  res.render("forbidden");
});

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
      .isLength({ min: 6 })
      .withMessage("Password is required."),
    check("rpwd")
      .isLength({ min: 6 })
      .withMessage("Confirm password is required.")
      .custom((value, { req }) => value === req.body.pwd)
      .withMessage("Passwords must matched.")
  ],
  function(req, res) {
    console.log("came here post ---------------------");
    if (req.session.user) {
      console.log("came here post user---------------------");
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(
          errors.isEmpty(),
          errors.array(),
          "came here post erors---------------------"
        );
        res.render("userform", { errors: errors.array(), user: req.body });
      } else {
        cryptPassword(req.body.pwd, function(error, hash) {
          if (hash) {
            sequelize
              .query("CALL customer_add(:inName,:inEmail,:inPassword)", {
                replacements: {
                  inName: req.body.name,
                  inEmail: req.body.email,
                  inPassword: hash
                }
              })
              .then(function() {
                return res.redirect("loginsuccess");
              });
          }
        });
      }
    } else {
      res.redirect("forbidden");
    }
  }
);

app.use("/api/sociallogin", authRouter);

/***********Products API Calls ***************/
/*
 * To get all departments
 */
app.get("/api/get-departments", (req, res) => {
  sequelize
    .query("CALL catalog_get_departments()")
    .then(departments => res.json(departments));
});

/*
 * To get all categories using departmentid
 * Parameters {inDepartmentId}
 */
app.post("/api/get-department-categories", (req, res) => {
  let inDepartmentId = req.body.inDepartmentId;
  console.log(inDepartmentId);
  sequelize
    .query("CALL catalog_get_department_categories(:inDepartmentId)", {
      replacements: { inDepartmentId: inDepartmentId }
    })
    .then(department_categories => res.json(department_categories));
});

/*
 * To get all products using department id
 * Parameters {inDepartmentId, inShortProductDescriptionLength, inProductsPerPage, inStartItem }
 */
app.post("/api/get-department-products", (req, res) => {
  let inDepartmentId = req.body.inDepartmentId;
  let inShortProductDescriptionLength =
    req.body.inShortProductDescriptionLength;
  let inProductsPerPage = req.body.inProductsPerPage;
  let inStartItem = req.body.inStartItem;
  sequelize
    .query(
      "CALL catalog_get_products_on_department(:inDepartmentId, :inShortProductDescriptionLength, :inProductsPerPage, :inStartItem)",
      {
        replacements: {
          inDepartmentId: inDepartmentId,
          inShortProductDescriptionLength: inShortProductDescriptionLength,
          inProductsPerPage: inProductsPerPage,
          inStartItem: inStartItem
        }
      }
    )
    .then(department_products => res.json(department_products));
});

/*
 * To get all category related products using category id.
 * Parameters {inCategoryId, inShortProductDescriptionLength, inProductsPerPage, inStartItem }
 */
app.post("/api/get-category-products", (req, res) => {
  let inCategoryId = req.body.inCategoryId;
  let inShortProductDescriptionLength =
    req.body.inShortProductDescriptionLength;
  let inProductsPerPage = req.body.inProductsPerPage;
  let inStartItem = req.body.inStartItem;
  sequelize
    .query(
      "CALL catalog_get_products_in_category (:inCategoryId, :inShortProductDescriptionLength, :inProductsPerPage, :inStartItem )",
      {
        replacements: {
          inCategoryId: inCategoryId,
          inShortProductDescriptionLength: inShortProductDescriptionLength,
          inProductsPerPage: inProductsPerPage,
          inStartItem: inStartItem
        }
      }
    )
    .then(category_products => res.json(category_products));
});

/*
 *To get product attributes.
 * Parameters{inProductId}
 */
app.post("/api/get-product-attributes", (req, res) => {
  let inProductId = req.body.inProductId;
  sequelize
    .query("CALL catalog_get_product_attributes(:inProductId)", {
      replacements: { inProductId: inProductId }
    })
    .then(product_attribute => res.json(product_attribute));
});

/*
 * To get attributes
 * Parameters not required
 */
app.get("/api/get-attributes", (req, res) => {
  sequelize
    .query("CALL catalog_get_attributes()")
    .then(get_attributes => res.json(get_attributes));
});

/*
 * To get attribute details
 * Parameters {inAttributeId}
 */
app.post("/api/get-attribute-values", (req, res) => {
  let inAttributeId = req.body.inAttributeId;
  sequelize
    .query("CALL catalog_get_attribute_values(:inAttributeId)", {
      replacements: { inAttributeId: inAttributeId }
    })
    .then(get_attribute_values => res.json(get_attribute_values));
});

/*
 * To get product details
 * Parameters {inProductId}
 */
app.post("/api/product", (req, res) => {
  let inProductId = req.body.inProductId;
  sequelize
    .query("CALL catalog_get_product_info(:inProductId)", {
      replacements: { inProductId: inProductId }
    })
    .then(get_product_info => res.json(get_product_info));
});

/*
 * To get product reviews
 * Parameters{inProductId}
 */
app.post("/api/get-product-reviews", (req, res) => {
  let inProductId = req.body.inProductId;
  sequelize
    .query("CALL catalog_get_product_reviews(:inProductId)", {
      replacements: { inProductId: inProductId }
    })
    .then(product_reviews => res.json(product_reviews));
});

/*
 * To get product recommendations
 * Parameters{inProductId, inShortProductDescriptionLength}
 */
app.post("/api/get-product-recommendations", (req, res) => {
  let inProductId = req.body.inProductId;
  let inShortProductDescriptionLength =
    req.body.inShortProductDescriptionLength;
  sequelize
    .query(
      "CALL catalog_get_recommendations(:inProductId,:inShortProductDescriptionLength)",
      {
        replacements: {
          inProductId: inProductId,
          inShortProductDescriptionLength: inShortProductDescriptionLength
        }
      }
    )
    .then(get_recommendations => res.json(get_recommendations));
});
/*
 * To get catalog search results
 * Parameters{inSearchString,inAllWords,inShortProductDescriptionLength,inProductsPerPage,inStartItem}
 */
app.post("/api/search", (req, res) => {
  let inSearchString = req.body.inSearchString;
  let inAllWords = req.body.inAllWords;
  let inShortProductDescriptionLength =
    req.body.inShortProductDescriptionLength;
  let inProductsPerPage = req.body.inProductsPerPage;
  let inStartItem = req.body.inStartItem;
  sequelize
    .query(
      "CALL catalog_search(:inSearchString,:inAllWords,:inShortProductDescriptionLength,:inProductsPerPage,:inStartItem)",
      {
        replacements: {
          inSearchString: inSearchString,
          inAllWords: inAllWords,
          inShortProductDescriptionLength: inShortProductDescriptionLength,
          inProductsPerPage: inProductsPerPage,
          inStartItem: inStartItem
        }
      }
    )
    .then(catalog_search_value => res.json(catalog_search_value));
});

/**************** Customer cart API Calls *****************/
/*
 * creating customer
 * Parameters {inName,inEmail,inPassword}
 */
app.post("/api/create-customer", (req, res) => {
  let inName = req.body.inName;
  let inEmail = req.body.inEmail;
  let inPassword = req.body.inPassword;
  sequelize
    .query("CALL customer_add(:inName,:inEmail,:inPassword)", {
      replacements: { inName: inName, inEmail: inEmail, inPassword: inPassword }
    })
    .then(create_customer => res.json(create_customer));
});
/*
 * To get customer
 * Parameters {inCustomerId}
 */
app.post("/api/get-customer", (req, res) => {
  let inCustomerId = req.body.inCustomerId;
  let inEmail = req.body.inEmail;
  console.log(inEmail);
  if (inCustomerId) {
    sequelize
      .query("CALL customer_get_customer(:inCustomerId)", {
        replacements: { inCustomerId: inCustomerId }
      })
      .then(get_customer => res.json(get_customer));
  } else {
    sequelize
      .query("CALL customer_get_login_info(:inEmail)", {
        replacements: { inEmail: inEmail }
      })
      .then(customer_info => {
        sequelize
          .query("CALL customer_get_customer(:inCustomerId)", {
            replacements: { inCustomerId: customer_info[0].customer_id }
          })
          .then(get_customer => res.json(get_customer));
      });
  }
});
/*
 * To Check User Exist or Not, using given email
 * Parameters {inCustomerId}
 */
app.post("/api/check-user", (req, res) => {
  let inEmail = req.body.inEmail;
  sequelize
    .query("CALL customer_get_login_info(:inEmail)", {
      replacements: { inEmail: inEmail }
    })
    .then(get_login_info => res.json(get_login_info));
});

/*
 * To Update Customer Account
 * Parameters {inCustomerId,inName,inEmail,inPassword,inDayPhone,inEvePhone,inMobPhone}
 */
app.post("/api/update-account", (req, res) => {
  let inCustomerId = req.body.inCustomerId;
  let inName = req.body.inName;
  let inEmail = req.body.inEmail;
  let inPassword = req.body.inPassword;
  let inDayPhone = req.body.inDayPhone;
  let inEvePhone = req.body.inEvePhone;
  let inMobPhone = req.body.inMobPhone;

  sequelize
    .query(
      "CALL customer_update_account(:inCustomerId,:inName,:inEmail,:inPassword,:inDayPhone,:inEvePhone,:inMobPhone)",
      {
        replacements: {
          inCustomerId: inCustomerId,
          inName: inName,
          inEmail: inEmail,
          inPassword: inPassword,
          inDayPhone: inDayPhone,
          inEvePhone: inEvePhone,
          inMobPhone: inMobPhone
        }
      }
    )
    .then(update_account => res.json(update_account));
});
/*
 * To Update Customer Address
 * Parameters {inCustomerId,inAddress1,inAddress2,inCity,inRegion,inPostalCode,inCountry,inShippingRegionId}
 */
app.post("/api/update-address", jsonParser, (req, res) => {
  let inAddress1 = req.body.inAddress1;
  let inAddress2 = req.body.inAddress2;
  let inCity = req.body.inCity;
  let inEmail = req.body.inEmail;
  let inRegion = req.body.inRegion;
  let inPostalCode = req.body.inPostalCode;
  let inCountry = req.body.inCountry;
  let inShippingRegionId = req.body.inShippingRegionId;
  console.log(req.body.inEmail, req.body[0]);
  sequelize
    .query("CALL customer_get_login_info(:inEmail)", {
      replacements: { inEmail: inEmail }
    })
    .then(customer_info => {
      sequelize
        .query(
          "CALL customer_update_address(:inCustomerId,:inAddress1,:inAddress2,:inCity,:inRegion,:inPostalCode,:inCountry,:inShippingRegionId)",
          {
            replacements: {
              inCustomerId: customer_info[0].customer_id,
              inAddress1: inAddress1,
              inAddress2: inAddress2,
              inCity: inCity,
              inRegion: inRegion,
              inPostalCode: inPostalCode,
              inCountry: inCountry,
              inShippingRegionId: inShippingRegionId
            }
          }
        )
        .then(update_account => res.json(update_account));
    });
});

/*
 * To Update Creditcard
 * Parameters {inCustomerId,inCreditCard}
 */
app.post("/api/update-credit-card", (req, res) => {
  let inCustomerId = req.body.inCustomerId;
  let inCreditCard = req.body.inCreditCard;
  sequelize
    .query("CALL customer_update_credit_card(:inCustomerId,:inCreditCard)", {
      replacements: { inCustomerId: inCustomerId, inCreditCard: inCreditCard }
    })
    .then(update_credit_card => res.json(update_credit_card));
});

/**************** Shopping cart API Calls *****************/

/*
 * To add Selected Product to Cart insert or update Cart details.
 * Parameters{inCartId,inProductId,inAttributes}
 */
app.post("/api/add-product-to-cart", (req, res) => {
  let inCartId = req.body.inCartId;
  let inProductId = req.body.inProductId;
  let inAttributes = req.body.inAttributes;
  if (!inCartId || inCartId == "null" || inCartId == null)
    inCartId = uniqueString();
  sequelize
    .query(
      "CALL shopping_cart_add_product(:inCartId,:inProductId,:inAttributes)",
      {
        replacements: {
          inCartId: inCartId,
          inProductId: inProductId,
          inAttributes: inAttributes
        }
      }
    )
    .then(add_product_to_cart => res.json({ inCartId: inCartId }));
});
/*
 * To get all products from Cart.
 * Parameters{inCartId}
 */
app.post("/api/get-shopping-cart-products", (req, res) => {
  let inCartId = req.body.inCartId;
  sequelize
    .query("CALL shopping_cart_get_products(:inCartId)", {
      replacements: { inCartId: inCartId }
    })
    .then(get_cart_product => res.json(get_cart_product));
});

/*
 * Save product for later(Wishlist).
 * Parameters{inItemId}
 */
app.post("/api/save-product-for-later", (req, res) => {
  let inItemId = req.body.inItemId;
  sequelize
    .query("CALL shopping_cart_save_product_for_later(:inItemId)", {
      replacements: { inItemId: inItemId }
    })
    .then(product_for_later => res.json(product_for_later));
});
/*
 * To get saved cart products.
 * Parameters{inCartId}
 */
app.post("/api/get-saved-products", (req, res) => {
  let inCartId = req.body.inCartId;
  sequelize
    .query("CALL shopping_cart_save_product_for_later(:inCartId)", {
      replacements: { inCartId: inCartId }
    })
    .then(save_product_for_later => res.json(save_product_for_later));
});
/*
 * To create order using shopping cart items.
 * Parameters{inCartId,inCustomerId,inShippingId,inTaxId}
 */
app.post("/api/create-order", (req, res) => {
  let inCartId = req.body.inCartId;
  let inCustomerId = req.body.inCustomerId;
  let inShippingId = req.body.inShippingId;
  let inTaxId = req.body.inTaxId;
  sequelize
    .query(
      "CALL shopping_cart_create_order(:inCartId,:inCustomerId,:inShippingId,:inTaxId)",
      {
        replacements: {
          inCartId: inCartId,
          inCustomerId: inCustomerId,
          inShippingId: inShippingId,
          inTaxId: inTaxId
        }
      }
    )
    .then(create_order => res.json(create_order));
});
/*
 *To remove product from cart.
 * Parameters{inItemId}
 */
app.post("/api/remove-product-from-cart", (req, res) => {
  let inItemId = req.body.inItemId;
  sequelize
    .query("CALL shopping_cart_remove_product(:inItemId)", {
      replacements: { inItemId: inItemId }
    })
    .then(remove_product_from_cart => res.json("removed from cart"));
});
/*
 * To update the shopping by increasing the quantity.
 * Parameters{inItemId,inQuantity}
 */
app.post("/api/cart-update", (req, res) => {
  let inItemId = req.body.inItemId;
  let inQuantity = req.body.inQuantity;
  sequelize
    .query("CALL shopping_cart_update(:inItemId,:inQuantity)", {
      replacements: { inItemId: inItemId, inQuantity: inQuantity }
    })
    .then(cart_update => res.json("updated cart"));
});
/*
 * To get cart total amount.
 * Parameters{inCartId}
 */
app.post("/api/get-cart-total", (req, res) => {
  let inCartId = req.body.inCartId;
  sequelize
    .query("CALL shopping_cart_get_total_amount(:inCartId)", {
      replacements: { inCartId: inCartId }
    })
    .then(get_total_amount => res.json(get_total_amount));
});

/*
 * To delete Product Items from Cart.
 * Parameters{inCartId}
 */
app.post("/api/shopping-cart-empty", (req, res) => {
  let inCartId = req.body.inCartId;
  sequelize
    .query("CALL shopping_cart_empty(:inCartId)", {
      replacements: { inCartId: inCartId }
    })
    .then(empty_cart => res.json(empty_cart));
});
/*
 * To get shipping Regions.
 * Parameters not required
 */
app.get("/api/get-customer-shipping-regions", (req, res) => {
  sequelize
    .query("CALL customer_get_shipping_regions()")
    .then(customer_regions => res.json(customer_regions));
});

/**************** Orders API Calls *****************/
/*
 * To get customer order list
 * Parameters {inCustomerId}
 */
app.post("/api/get-customer-orders-list", (req, res) => {
  let inCustomerId = req.body.inCustomerId;
  sequelize
    .query("CALL orders_get_by_customer_id(:inCustomerId)", {
      replacements: { inCustomerId: inCustomerId }
    })
    .then(customer_order_list => res.json(customer_order_list));
});
/*
 * To get order details
 * Parameters {inOrderId}
 */
app.post("/api/get-order-details", (req, res) => {
  let inOrderId = req.body.inOrderId;
  sequelize
    .query("CALL orders_get_order_details(:inOrderId)", {
      replacements: { inOrderId: inOrderId }
    })
    .then(order_details => res.json(order_details));
});

/*
 * To get order information
 * Parameters {inOrderId}
 */
app.post("/api/get-order-info", (req, res) => {
  let inOrderId = req.body.inOrderId;
  sequelize
    .query("CALL orders_get_order_info(:inOrderId)", {
      replacements: { inOrderId: inOrderId }
    })
    .then(order_info => res.json(order_info));
});

/*
 * To get order short details
 * Parameters {inOrderId}
 */
app.post("/api/get-order-short-details", (req, res) => {
  let inOrderId = req.body.inOrderId;
  sequelize
    .query("CALL orders_get_order_short_details(:inOrderId)", {
      replacements: { inOrderId: inOrderId }
    })
    .then(order_short_details => res.json(order_short_details));
});
/*
 * To get order shipping information.
 * Parameters{inShippingRegionId}
 */
app.post("/api/get-order-shipping-info", (req, res) => {
  let inShippingRegionId = req.body.inShippingRegionId;
  sequelize
    .query("CALL orders_get_shipping_info(:inShippingRegionId)", {
      replacements: { inShippingRegionId: inShippingRegionId }
    })
    .then(shipping_info => res.json(shipping_info));
});

/*
 * To create a cart add a product to it.
 * Parameters{inItemId}
 */
app.post("/api/add-product-to-empty-cart", (req, res) => {
  let inItemId = req.body.inItemId;
  sequelize
    .query("CALL shopping_cart_move_product_to_cart(:inItemId)", {
      replacements: { inItemId: inItemId }
    })
    .then(cartId => {
      res.json(cartId);
    });
});
