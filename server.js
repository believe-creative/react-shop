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
 app.get('/api/get-department-categories', (req, res)=>{
   let inDepartmentId = req.body.inDepartmentId;
   sequelize.query('CALL catalog_get_department_categories(:inDepartmentId)',
   {replacements: {inDepartmentId:inDepartmentId}})
   .then(department_categories=>res.json(department_categories));
 });

 /*
 * To get all products using department id
 * Parameters {inDepartmentId, inShortProductDescriptionLength, inProductsPerPage, inStartItem }
 */
 app.get('/api/get-department-products', (req, res)=>{
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
app.get('/api/get-category-products', (req, res) => {
  let inCategoryId = req.body.inCategoryId;
  let inShortProductDescriptionLength = req.body.inShortProductDescriptionLength;
  let inProductsPerPage = req.body.inProductsPerPage;
  let inStartItem = req.body.inStartItem;
 sequelize
   .query('CALL catalog_get_products_in_category (:inCategoryId, :inShortProductDescriptionLength, :inProductsPerPage, :inStartItem )',
         {replacements: { inCategoryId: 6, inShortProductDescriptionLength: inShortProductDescriptionLength,
           inProductsPerPage:inProductsPerPage, inStartItem:inStartItem}})
   .then(cat_products=>res.json(cat_products));
 });

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})
