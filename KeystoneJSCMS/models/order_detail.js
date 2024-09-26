var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Order detail Model
 * ==========
 */


var Order_detail = new keystone.List('order_detail');

Order_detail.add({
  item_id: { type: Number , initial: true , required: true },
  order_id: { type: Number , initial: true, required: true},
	product_id:  { type: Number , initial: true, required: true},
  attributes: { type: String , initial: true, required: true},
  product_name: { type: String, initial: true, required: true},
  quantity:  { type: Number , initial: true, required: true},
  unit_cost: { type: Number , initial: true, required: true},


});


Order_detail.defaultColumns = 'order_detail, state|20%, author|20%, publishedDate|20%';
Order_detail.register();
