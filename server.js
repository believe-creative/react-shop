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

app.get('/api/product', (req, res) => {
  sequelize
    .query('CALL catalog_get_product_details (3)')
    .then(product=>res.json(product));
 })
 // sequelize
 //   .query('CALL catalog_get_product_details (:product_id)',
 //         {replacements: { product_id: 3}})
 //   .then(product=>console.log(product));
app.get('/api/products', (req, res) => {
 sequelize
   .query('CALL catalog_get_products_in_category (:inCategoryId, :inShortProductDescriptionLength, :inProductsPerPage, :inStartItem )',
         {replacements: { inCategoryId: 6, inShortProductDescriptionLength: 10, inProductsPerPage:10, inStartItem:1}})
   .then(cat_products=>res.json(cat_products));
 });

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})
