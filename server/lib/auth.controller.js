let jwt = require('jsonwebtoken');
  exports.facebook = (req, res) => {
    const io = req.app.get('io')
    const displayName= req.user.displayName
    const user = { 
      name: displayName,
      photo: req.user.photos[0].value
    }
    console.log("got in ---------------------------------------------------------")
    req.session.user=user
    let token = jwt.sign({email:req.user.email,user: user},
        'thisisasecret',
        { expiresIn: '2h'
        }
      );
    io.in(req.session.socketId).emit('facebook', {user:user,token:token})
    res.redirect("/loginsuccess");
  }

  exports.google = (req, res) => {
    const io = req.app.get('io')
    const displayName= req.user.displayName
    const user = { 
      name: displayName,
      photo: req.user.photos[0].value.replace(/sz=50/gi, 'sz=250')
    }
    console.log("got in ---------------------------------------------------------")
    req.session.user=user
    req.session.user=user
    let token = jwt.sign({email:req.user.email,user: user},
        'thisisasecret',
        { expiresIn: '2h'
        }
      );
    io.in(req.session.socketId).emit('google', {user:user,token:token})
    res.redirect("/loginsuccess");
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