// NOTE: Nodejs uses commonjs modules
// so need to use require
const express = require('express');
const app = express();

// Route handler
app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

app.listen(5000);
