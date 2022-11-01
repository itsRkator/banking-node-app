const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const transactionsRoutes = require('./routes/transactions');

const app = express();

mongoose.connect('<MONGODB_CONNECTION_URL>').then(() => {
  console.log('Connected to database!');
}).catch(() => {
  console.log('Connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.get('/', (req, res, next) => {
  res.send('Hello from Banking app!');
});

app.use('/api/transactions', transactionsRoutes);

module.exports = app;