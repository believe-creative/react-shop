var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Orders Model
 * ==========
 */


var Orders = new keystone.List('Orders', {
	map: { name: 'order_address' }
});
Orders.add({
  total_amount: { type: Number , initial: true , required: true},
  created_on: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	shipped_on: { type: Types.Date, index: true },
  status: { type: Number , initial: true, required: true},
  comments: { type: String, initial: true, required: true},
  order_address: { type: String , initial: true, required: true},
  customer_id: { type: Number , initial: true, required: true},
  auth_code: { type: String , initial: true, required: true},
  reference: { type: String, initial: true, required: true },
  shipping_id: { type: Number, initial: true, required: true},
  tax_id: { type: Number , initial: true, required: true},
});


Orders.defaultColumns = 'order_address, state|20%, author|20%, publishedDate|20%';
Orders.register();
