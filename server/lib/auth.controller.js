let jwt = require('jsonwebtoken');
const {checkUserWithEmail} = require('../server');
let secret_key = require('../config.js').secret_key;
  exports.facebook = (req, res) => {
    const io = req.app.get('io')
    const displayName= req.user.displayName
    const user = {
      name: displayName,
      photo: req.user.photos[0].value,
      email:req.user.emails[0].value
    }
    req.session.user=user
    let token = jwt.sign({email:user.email,user: user},
        secret_key,
        { expiresIn: '2h'
        }
      );
    io.in(req.session.socketId).emit('facebook', {user:user,token:token});
    res.redirect("/setpassword");

  }

  exports.google = (req, res) => {
    const io = req.app.get('io')
    const displayName= req.user.displayName
    console.log(req.user);
    const user = {
      name: displayName,
      photo: req.user.photos[0].value.replace(/sz=50/gi, 'sz=250'),
      email:req.user.emails[0].value
    }
    console.log("got in ---------------------------------------------------------")
    req.session.user=user
    let token = jwt.sign({email:user.email,user: user},
        secret_key,
        { expiresIn: '2h'
        }
      );
    io.in(req.session.socketId).emit('google', {user:user,token:token})
    res.redirect("/setpassword");

  }


  exports.checklogin = (req, res) => {
      if(req.decoded)
      {
        res.json({
            success: true,
            user: req.decoded.user
          });
      }
      else
      {
        res.json({
            success: false
          });
      }
  }
