// Initial application setup happens in here
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

// instruct mongoose to connect to MongoDB
mongoose.connect(keys.mongoURI);

const app = express();

// tell express to make use of cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

// tell passport to use cookies to manage authentication
app.use(passport.initialize());
app.use(passport.session());

// when we require the authRoutes files -- it returns a function
// so here we are immediately invoking this function and passing
// in the `app` as the function parameter
require('./routes/authRoutes')(app);


// Heroku will inject env variables
const PORT = process.env.PORT || 5000;
app.listen(PORT);
