var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Product Model
 * ==========
 */

var Product = new keystone.List('Product', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Product.add({
	title: { type: String, required: true },	
	content: {		
		extended: { type: Types.Html, wysiwyg: true, height: 200 },
	},
	price: {type: Types.Money, format: '$0,0.00'},
	discounted_price: {type: Types.Money, format: '$0,0.00'},
	size: { type: Types.Relationship, ref: 'AttributeValue', many: true, filters: { attribute: '5cff5065f4b4e0f0ec566608' } },
	color: { type: Types.Relationship, ref: 'AttributeValue', many: true, filters: { attribute: '5cff5071f4b4e0f0ec566609' } },
	image: { type: Types.CloudinaryImage },
	image2: { type: Types.CloudinaryImage },
	thumbnail: {type: Types.CloudinaryImage},
	categories: { type: Types.Relationship, ref: 'Category', many: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },	
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
});

Product.schema.virtual('content.full').get(function () {
	return this.content.extended;
});

Product.defaultColumns = 'title, size|15%, color|15% state|10%, author|10%, publishedDate|20%';
Product.register();
