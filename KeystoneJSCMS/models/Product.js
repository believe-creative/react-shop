var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * Product Model
 * ==========
 */

var Product = new keystone.List('Product', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
});


var myStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('./public/uploads/files' ), // required; path where the files should be stored
    publicPath: '/public/uploads/files', // path where files will be served
		generateFilename: (file) => {
			return `${file.originalname}`;
		}
  },schema: {
        url: true,
				originalname: true,
				size: Number,
				mimetype: String,
				originalname: String,
    }
});

Product.add({
	name: { type: String, required: true },
	content: {
		extended: { type: Types.Html, wysiwyg: true, height: 200 },
	},
	price: {type: Types.Money, format: '$0,0.00'},
	discounted_price: {type: Types.Money, format: '$0,0.00'},
	size: { type: Types.Relationship, ref: 'AttributeValue', many: true, filters: { attribute: '5cff5065f4b4e0f0ec566608' } },
	color: { type: Types.Relationship, ref: 'AttributeValue', many: true, filters: { attribute: '5cff5071f4b4e0f0ec566609' } },
	image: { type: Types.File,storage: myStorage},
	image2: { type: Types.File,storage: myStorage },
	thumbnail: {type: Types.File,storage: myStorage},
	categories: { type: Types.Relationship, ref: 'Category'},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
});

Product.schema.virtual('content.full').get(function () {
	return this.content.extended;
});

Product.defaultColumns = 'name, size|15%, color|15% state|10%, author|10%, publishedDate|20%';
Product.register();
