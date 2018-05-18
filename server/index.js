// NOTE: Nodejs uses commonjs modules
// so need to use require
const express = require('express');
const app = express();

// Route handler
app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

// Heroku will inject env variables
const PORT = process.env.PORT || 5000;
app.listen(PORT);
