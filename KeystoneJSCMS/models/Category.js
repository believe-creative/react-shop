var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Category Model
 * ==================
 */

var Category = new keystone.List('Category',{
	autokey:{path:'slug', from:'name', unique:true},
});

Category.add({
	name: { type: String, required: true },
	state:{ type: Types.Select, options:'draft,published,archived', default:'draft', index:true},
	department: {type: Types.Relationship, ref:'Department', index:true},
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
});

Category.relationship({ ref: 'Product', path: 'products', refPath: 'categories' });
Category.defaultColumns = 'name, department|20%, state|20%, publishedDate|20%';
Category.register();
