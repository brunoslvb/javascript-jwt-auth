require('dotenv').config({ path: '.env' });

const express   = require('express');
const morgan    = require('morgan');

const app = express();

const indexRoute = require('./routes/indexRoute');
const customerRoute = require('./routes/customerRoute');

app.use(morgan('dev'));

app.use(express.json());

app.use('/', indexRoute);
app.use('/customers', customerRoute);

app.listen(3333, () => {
    console.log("Server Started");
});