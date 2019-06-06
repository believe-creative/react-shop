var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Attribute Model
 * ==========
 */


var Attribute = new keystone.List('attribute', {
	map: { name: 'name' }
});
Attribute.add({
  attribute_id: { type: Number , initial: true , index: true,  required: true},
  name: { type: String , initial: true , required: true },
  });


Attribute.defaultColumns = 'name, state|20%, author|20%, publishedDate|20%';
Attribute.register();
