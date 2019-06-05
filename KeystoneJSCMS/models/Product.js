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
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	price: {type: Types.Money, format: '$0,0.00'},
	discounted_price: {type: Types.Money, format: '$0,0.00'},
	image: { type: Types.CloudinaryImage },
	image2: { type: Types.CloudinaryImage },
	thumbnail: {type: Types.CloudinaryImage},
	categories: { type: Types.Relationship, ref: 'Category', many: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
});

Product.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Product.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Product.register();
