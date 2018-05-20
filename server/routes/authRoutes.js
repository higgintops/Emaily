const passport = require('passport');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // this time the 'code' will be in the URL
  app.get(
    '/auth/google/callback',
    passport.authenticate('google')
  );
};
