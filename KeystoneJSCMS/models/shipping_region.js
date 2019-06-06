var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Shipping Region Model
 * ==========
 */


var Shipping_region = new keystone.List('Shipping_region', {
	map: { name: 'Shipping_region' }
});
Shipping_region.add({
  shipping_region_id: { type: Number , initial: true , index: true,  required: true},
  shipping_region: { type: String , initial: true , required: true },
  });


Shipping_region.defaultColumns = 'Shipping_region, state|20%, author|20%, publishedDate|20%';
Shipping_region.register();
