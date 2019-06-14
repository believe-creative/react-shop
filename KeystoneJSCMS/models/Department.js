var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Department Model
 * =============
 */

 var Department = new keystone.List('Department', {     
     autokey:{path:'slug', from:'title', unique:true},
 });

 Department.add({
     name:{type:String, required:true},
     state:{type:Types.Select, options:'draft,published,archived', default:'draft', index:true},
     publishedDate:{type:Types.Date, index:true, dependsOn:{state:'published'}},
     content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
 });
 Department.schema.virtual('content.full').get(function(){
     return this.content.extended || this.content.brief;
 });
 Department.defaultColumns = "name, state|20%, publishedDate|20%";
 Department.register();
