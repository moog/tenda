const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

app.disable('etag');

consign({verbose: false})
    .include('config')
    .then('utils')
    .then('models')
    .then('controllers')
    .then('routes')
    .into(app);

app.listen(1991, function () {
    console.log('Tenda aberta!')
});

module.exports = app;
