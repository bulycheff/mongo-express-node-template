require('dotenv').config();
// require('../localStorage');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  console.log(req.hostname);
  res.status(200).send('Hello from api.adminn.ru');
});

const routes = require('./routes');
routes.forEach(router => {
  app.use(router.path, router.routes);
});

module.exports = app;
