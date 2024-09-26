var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Address Model
 * ==========
 */


var Address = new keystone.List('Address', {
	map: { name: 'address_name' }
});
Address.add({
  address_name: { type: String , initial: true , required: true},
  customer_id: { type: Types.Relationship, ref: 'User', index: true  },
	address_1: { type: String, initial: true, required: true},
  address_2: { type: String , initial: true, required: true},
  city: { type: String, initial: true, required: true},
  region: { type: String , initial: true, required: true},
  postal_code: { type: String , initial: true, required: true},
  country: { type: String , initial: true, required: true},
  shipping_region: { type: Number, initial: true, required: true },
  day_phone: { type: String, initial: true, required: true},
  eve_phone: { type: String , initial: true, required: true},
  mob_phone: { type: String, initial: true, required: true }
});


Address.defaultColumns = 'address_name, state|20%, author|20%, publishedDate|20%';
Address.register();
