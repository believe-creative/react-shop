var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Tax Model
 * ==========
 */


var Tax = new keystone.List('tax', {
	map: { name: 'tax_type' }
});
Tax.add({
  tax_id: { type: Number , initial: true , index: true,  required: true},
  tax_type: { type: String , initial: true , required: true },
  tax_percentage: { type: Number , initial: true , index: true,  required: true},
  });


Tax.defaultColumns = 'tax_type, state|20%, author|20%, publishedDate|20%';
Tax.register();
