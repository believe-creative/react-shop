var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Shipping Region Model
 * ==========
 */


var Shipping_region = new keystone.List('Shipping_region', {
	map: { name: 'shipping_region' }
});
Shipping_region.add({
  shipping_region: { type: String , initial: true , required: true },
  });


Shipping_region.defaultColumns = 'shipping_region';
Shipping_region.register();
