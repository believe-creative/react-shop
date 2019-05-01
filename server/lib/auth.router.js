const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('./auth.controller')

// Setting up the passport middleware for each of the OAuth providers
const facebookAuth = passport.authenticate('facebook',{ scope : ['email'] })
const googleAuth = passport.authenticate('google', { scope: ['profile','email'] })

// This custom middleware allows us to attach the socket id to the session.
// With the socket id attached we can send back the right user info to 
// the right socket
const addSocketIdtoSession = (req, res, next) => {
  req.session.socketId = req.query.socketId
  next();
}

// Routes that are triggered by the React client
router.get('/facebook', addSocketIdtoSession, facebookAuth)
router.get('/google', addSocketIdtoSession, googleAuth)

// Routes that are triggered by callbacks from OAuth providers once 
// the user has authenticated successfully
router.get('/facebook/callback', facebookAuth, authController.facebook)
router.get('/google/callback', googleAuth, authController.google)

module.exports = router