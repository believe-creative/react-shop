var bcrypt = require('bcrypt');
exports.cryptPassword = function(password, callback) {
    bcrypt.genSalt(10, function(err, salt) {
     if (err) 
       return callback(err);
 
     bcrypt.hash(password, salt, function(err, hash) {
         // send hash instead of password next time for encryptioin  because he database couldn;t store long hash.
       return callback(err, password);
     });
   });
 };
 
 exports.comparePassword = function(plainPass, hashword, callback) {
    bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {
      if(isPasswordMatch==false && plainPass==hashword)
      isPasswordMatch=true;
        return err == null ?
            callback(null, isPasswordMatch) :
            callback(err);
    });
 };