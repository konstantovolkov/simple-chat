const express = require('express');
const path = require('path');
const setupProxy = require('./setupProxy');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

setupProxy(app)

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((req, res, next) => {
  console.log({ req, res });
  next();
})

app.listen(process.env.PORT || 80);
