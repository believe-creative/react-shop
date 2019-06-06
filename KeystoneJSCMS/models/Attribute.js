var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Attribute Value Model
 * ==========
 */


var Attribute_value = new keystone.List('attribute_value', {
	map: { name: 'value' }
});
Attribute_value.add({
  attribute_value_id: { type: Number , initial: true , index: true,  required: true},
  attribute_id: { type: Number , initial: true , index: true,  required: true},
  value: { type: String , initial: true , required: true },
  });


Attribute_value.defaultColumns = 'value, state|20%, author|20%, publishedDate|20%';
Attribute_value.register();
