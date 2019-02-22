const passport = require('passport')
const { Strategy: FacebookStrategy } = require('passport-facebook')
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth')
const FACEBOOK_CONFIG={
        clientID: "296478381042343",
        clientSecret:'beeb5f2c2f9a93bb5d7c4a289257f857',
        callbackURL: '/api/sociallogin/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'email']
      }
      
const GOOGLE_CONFIG={
    consumerKey: "723179674220-dpuchaqikq3rrc5geg1493q63n9m35cb.apps.googleusercontent.com",
    consumerSecret: "e0LbL4KfMIVfI5_LhSENw6zX",
    clientID: "723179674220-dpuchaqikq3rrc5geg1493q63n9m35cb.apps.googleusercontent.com",
    clientSecret: "e0LbL4KfMIVfI5_LhSENw6zX",
    callbackURL: "/api/sociallogin/google/callback"
  }
module.exports = () => {  

  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser((user, cb) => cb(null, user))
  passport.deserializeUser((obj, cb) => cb(null, obj))
  
  // The function that is called when an OAuth provider sends back user 
  // information.  Normally, you would save the user to the database here
  // in a callback that was customized for each provider.
  const callback = (accessToken, refreshToken, profile, cb) => cb(null, profile)

  // Adding each OAuth provider's strategy to passport
  passport.use(new FacebookStrategy(FACEBOOK_CONFIG, callback))
  passport.use(new GoogleStrategy(GOOGLE_CONFIG, callback))
}