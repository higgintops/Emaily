const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

// instruct mongoose to connect to MongoDB
mongoose.connect(keys.mongoURI);


const app = express();

// when we require the authRoutes files -- it returns a function
// so here we are immediately invoking this function and passing
// in the `app` as the function parameter
require('./routes/authRoutes')(app);


// Heroku will inject env variables
const PORT = process.env.PORT || 5000;
app.listen(PORT);
