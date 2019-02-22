const express = require('express');
const Sequelize = require('sequelize')
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//const sequelize = new Sequelize("mysql://root@192.168.0.135:3306/tshirtshop_db");
const sequelize = new Sequelize('tshirtshop_db', 'root', '', {
  host: '192.168.0.135',
  dialect: 'mysql',
  port:3306
});
/*
* To get all departments
*/
app.get('/api/get-departments', (req, res) => {
  sequelize
    .query('CALL catalog_get_departments()')
    .then(departments=>res.json(departments));
 });

 /*
 * To get all categories using departmentid
 * Parameters {inDepartmentId}
 */
 app.post('/api/get-department-categories', (req, res)=>{
   let inDepartmentId = req.body.inDepartmentId;
   sequelize.query('CALL catalog_get_department_categories(:inDepartmentId)',
   {replacements: {inDepartmentId:inDepartmentId}})
   .then(department_categories=>res.json(department_categories));
 });

 /*
 * To get all products using department id
 * Parameters {inDepartmentId, inShortProductDescriptionLength, inProductsPerPage, inStartItem }
 */
 app.post('/api/get-department-products', (req, res)=>{
   let inDepartmentId = req.body.inDepartmentId;
   let inShortProductDescriptionLength = req.body.inShortProductDescriptionLength;
   let inProductsPerPage = req.body.inProductsPerPage;
   let inStartItem = req.body.inStartItem;
   sequelize
         .query('CALL catalog_get_products_on_department(:inDepartmentId, :inShortProductDescriptionLength, :inProductsPerPage, :inStartItem)',
               {replacements: {inDepartmentId:inDepartmentId, inShortProductDescriptionLength:inShortProductDescriptionLength,
                 inProductsPerPage:inProductsPerPage, inStartItem:inStartItem}})
         .then(department_products=>res.json(department_products));
 });

 /*
 * To get all category related products using category id.
 * Parameters {inCategoryId, inShortProductDescriptionLength, inProductsPerPage, inStartItem }
 */
app.post('/api/get-category-products', (req, res) => {
  let inCategoryId = req.body.inCategoryId;
  let inShortProductDescriptionLength = req.body.inShortProductDescriptionLength;
  let inProductsPerPage = req.body.inProductsPerPage;
  let inStartItem = req.body.inStartItem;
 sequelize
   .query('CALL catalog_get_products_in_category (:inCategoryId, :inShortProductDescriptionLength, :inProductsPerPage, :inStartItem )',
         {replacements: { inCategoryId: inCategoryId, inShortProductDescriptionLength: inShortProductDescriptionLength,
           inProductsPerPage:inProductsPerPage, inStartItem:inStartItem}})
   .then(category_products=>res.json(category_products));
 });

/*
*To get product attributes.
* Parameters{inProductId}
*/
app.post('/api/get-product-attributes',(req,res)=>{
    let inProductId=req.body.inProductId;
    sequelize
      .query('CALL catalog_get_product_attributes(:inProductId)',{replacements:{inProductId:inProductId}}).then(
        product_attribute=>res.json(product_attribute));
});

/*
* To add Selected Product to Cart insert or update Cart details.
* Parameters{inCartId,inProductId,inAttributes}
*/
app.post('/api/add-product-to-cart',(req,res)=>{
  let inCartId=req.body.inCartId;
  let inProductId=req.body.inProductId;
  let inAttributes=req.body.inAttributes;
  sequelize
    .query('CALL shopping_cart_add_product(:inCartId,:inProductId,:inAttributes)',{replacements:{inCartId:inCartId,inProductId:inProductId, inAttributes:inAttributes}}).then(
      add_product_to_cart=>res.json(add_product_to_cart));
});

/*
* To get all Product to Cart.
* Parameters{inCartId}
*/
app.post('/api/get-shopping-cart-products',(req,res)=>{
  let inCartId=req.body.inCartId;
  sequelize
    .query('CALL shopping_cart_get_products(:inCartId)',{replacements:{inCartId:inCartId}}).then(
      get_cart_product=>res.json(get_cart_product));
});

/*
*To delete Product Items from Cart.
*Parameters{inCartId}
*/
app.post('/api/shopping-cart-empty',(req,res)=>{
  let inCartId=req.body.inCartId;
  sequelize
    .query('CALL shopping_cart_empty(:inCartId)',{replacements:{inCartId:inCartId}}).then(
      empty_cart=>res.json(empty_cart));
});
/*
*To get Customer Regions.
*Parameters not required
*/
app.get('/api/get-customer-shipping-regions',(req,res)=>{
  sequelize
    .query('CALL customer_get_shipping_regions()').then(
      customer_regions=>res.json(customer_regions));
});
/*
*To get shipping information.
*Parameters{inShippingRegionId}
*/
app.post('/api/get-order-shipping-info',(req,res)=>{
  let inShippingRegionId=req.body.inShippingRegionId;
  sequelize
    .query('CALL orders_get_shipping_info(:inShippingRegionId)',{replacements:{inShippingRegionId:inShippingRegionId}}).then(
      shipping_info=>res.json(shipping_info));
});


app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})
