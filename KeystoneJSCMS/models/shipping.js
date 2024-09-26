var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Shipping Model
 * ==========
 */


var Shipping = new keystone.List('Shipping', {
	map: { name: 'shipping_type' }
});
Shipping.add({
  shipping_type: { type: String , index: true, required: true },
	shipping_cost: { type: Number, initial: true , required: true },
  shipping_region: {type: Types.Relationship, ref:'Shipping_region', index:true},
  });


Shipping.defaultColumns = 'shipping_type, state|20%, author|20%, publishedDate|20%';
Shipping.register();
