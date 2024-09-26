var keystone = require('keystone');
var Types = keystone.Field.Types;
var _ = require('underscore');
keystone.import('models');
function listNames() {
    var listNames = [];
    // console.log("keystone details:",keystone.lists.Role);
    if (keystone.lists) {
        _.each(Object.keys(keystone.lists), function(list,b) {           
            // TODO:  do we return hidden lists?
            listNames.push(list);
        });
    }
        
    return listNames;
}

var Permission = new keystone.List('Permission', {
    autokey: { path: 'key', from: 'name', unique: true },
    track: true
});

Permission.add({
    name: { type: String, required: true, index: true },
    listName: { type: Types.Select, options: listNames(), required: true, initial: true, index: true },
    create: { type: Types.Relationship, ref: 'Role', many: true },
    read: { type: Types.Relationship, ref: 'Role', many: true },
    update: { type: Types.Relationship, ref: 'Role', many: true },
    delete: { type: Types.Relationship, ref: 'Role', many: true }
});

Permission.defaultColumns = 'name, create, read, update, delete';
Permission.register();

module.exports = Permission;