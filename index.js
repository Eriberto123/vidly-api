const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('config');

//Routes
const home = require('./routes/home');
const genres = require('./routes/genres');
const customer = require('./routes/customer');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

app.use('/api/customer', customer);
app.use('/api/genres', genres);
app.use('/', home);

if (app.get('NODE_ENV') === 'development') {
    console.log('Morgan enabled');
    app.use(morgan('tiny'));
}

const mongodb = {
    'host': config.get('host'),
    'port': config.get('port'),
    'username': config.get('username'),
    'password': config.get('password')
}

const connectionString = `mongodb://${mongodb.username}:${mongodb.password}@${mongodb.host}:${mongodb.port}/vidly`;

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`::::::::::: Listening on port ${port}`));

console.log('::::::::::: Connecting to the database');

mongoose.connect(connectionString, { authSource: 'admin', useNewUrlParser: true })
    .then(() => console.log('::::::::::: Sucessfully connected to the database'))
    .catch((err) => console.error(err));