/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');
var keystone = require('keystone');

/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Blog', key: 'category', href: '/category' },
    	{ label: 'Sample Page', key: 'team', href: '/pages/sample-page' },
		{ label: 'Gallery', key: 'gallery', href: '/gallery' },
		{ label: 'Contact', key: 'contact', href: '/contact' },
	];
	res.locals.user = req.user;
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};




// exports.Role = keystone.createItems({
// 					 Role:[{
// 						'name': 'Super',
// 						__ref: 'role_super'
// 					},
// 					{
// 						'name': 'Developer',
// 						__ref: 'role_developer'
// 					},
// 					{
// 						'name': 'Author',
// 						__ref: 'role_author'
// 					}]
// 				  }, { verbose: true}, function (err, stats) {
// 					if (err) throw new Error('panic!', err);
// 					console.log('our results', stats);
// 				  });
		

// exports.Permission = keystone.createItems({
// 	Permission:[{
//         'name': 'Role List Permissions',
//         'listName': 'Role',
//         'create': ['role_super'],
//         'read': ['role_super'],
//         'update': ['role_super'],
//         'delete': ['role_super'],
//         __ref: 'permission_role'
//     },
//     {
//         'name': 'User List Permissions',
//         'listName': 'User',
//         'create': ['role_super'],
//         'read': ['role_super'],
//         'update': ['role_super'],
//         'delete': ['role_super'],
//         __ref: 'permission_user'
//     },
//     {
//         'name': 'Permission List Permissions',
//         'listName': 'Permission',
//         'create': ['role_super'],
//         'read': ['role_super'],
//         'update': ['role_super'],
//         'delete': ['role_super'],
//         __ref: 'permission_permission'
//     }]
// }, { verbose: true}, function (err, stats) {
// 	if (err) throw new Error('panic!', err);
// 	console.log('our results', stats);
//   });

// exports.User = [
//     {
//         'name.first': 'Admin',
//         'name.last': '',
//         'name.full': 'Admin',
//         email: 'srinu@teamdevx.com',
//         password: 'admin',
//         isAdmin: true,
//         roles: ['role_super'],
//         __ref: 'admin_user'
//     }
// ];