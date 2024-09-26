/*
  Product Unit Test
  for Keystone.JS built-in Product Model
 */
var keystone = require('keystone');
var chai = require('chai');
var dbURI = "mongodb://localhost/react-shop-admin" || process.env.MONGO_URL;
            // CHANGE THIS AS NEEDED

describe('Products', function() {
 beforeEach(function(done){
   if (keystone.mongoose.connection.db) return done();
   console.log('Connecting to ' + dbURI)
   keystone.mongoose.connect(dbURI, done);
 });

 it('should be a connection to Mongo', function(done){
   keystone.mongoose.connection.db.should.be.a('Object');
   done();
 });

 it('should be a Mongoose Model', function(done) {
   Product = keystone.list('Product');

   Product.should.be.a('Object');
   Product.should.have.property('model').be.a('Function');
   Product.should.have.property('schema').be.a('Object');  
   done();
 });
});