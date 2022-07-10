require('dotenv').config();
require('./localStorage.js');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./src/routes');
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).send('Hello from api.adminn.ru');
});

routes.forEach(router => {
  app.use(router.path, router.routes);
});

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));


