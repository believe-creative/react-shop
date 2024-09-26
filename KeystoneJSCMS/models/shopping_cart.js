var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Shopping Cart Model
 * ==========
 */


var Shopping_cart = new keystone.List('Shopping_cart', {
	map: { name: 'Shopping_cart' }
});
Shopping_cart.add({
  item_id: { type: Number , initial: true , index: true,  required: true},
  cart_id: { type: String , initial: true , index: true,  required: true},
  product_id: { type: Number , initial: true , index: true,  required: true},
  attributes: { type: String , initial: true, required: true },
	quantity: { type: Number, initial: true , required: true },
  buy_now: { type: Number ,initial: true , required: true},
  added_on: { type: Types.Date, index: true, dependsOn: { state: 'published' } }
  });


Shopping_cart.defaultColumns = 'Shopping_cart, state|20%, author|20%, publishedDate|20%';
Shopping_cart.register();
