const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// our model class - gives us a handle
// to underlying collection that exists
// in our MongoDB
const User = mongoose.model('users');

// tell passport how to make use of the GoogleStrategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // first check to see if we have a user already
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // already have record with profile ID
        } else {
          // create new instance of a user & save to db
          new User({ googleId: profile.id }).save();
        }
      });
    }
  )
);
