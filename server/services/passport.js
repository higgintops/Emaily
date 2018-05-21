const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// our model class - gives us a handle
// to underlying collection that exists
// in our MongoDB
const User = mongoose.model('users');

// For cookies serializeUser & deserializeUser
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // search our collection of users with id
  User.findById(id).then( (user) => {
    done(null, user);
  });
});

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
          // pass to done() 1st arg = a null error,
          // and 2nd arg is the user
          done(null, existingUser);
        } else {
          // create new instance of a user & save to db
          new User({ googleId: profile.id }).save().then(user => {
            done(null, user);
          });
        }
      });
    }
  )
);
