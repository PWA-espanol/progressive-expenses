const express = require('express')
const app = express()

app.get('/api', function (req, res) {
  res.send('Hello World!')
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/expense/:id', function (req, res) {
  if (!req.params.id) {
    res.redirect('/');
  }

  res.sendFile(__dirname + '/public/expense.html');
});

app.use(express.static('public'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});