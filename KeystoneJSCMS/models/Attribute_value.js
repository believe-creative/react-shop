var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Attribute Value Model
 * ==========
 */

var Attribute_value = new keystone.List('AttributeValue', {
  map: { name: 'value' },
  autokey:{path:'slug',from:'value', unique:true},  
});
Attribute_value.add({  
  value: { type: String , initial: true , required: true },
  state:{ type: Types.Select, options:'draft,published,archived', default:'draft', index:true},	
  attribute: {type: Types.Relationship, ref:'Attribute', index:true},  
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
  });
  
Attribute_value.defaultColumns = 'value, attribute|20%, state|20%, publishedDate|20%';
Attribute_value.register();
