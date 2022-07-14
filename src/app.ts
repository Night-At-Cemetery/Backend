import express from 'express'

const app = express();
const bp = require('body-parser')

app.use(express.json());
app.use(express.urlencoded());

const playerRoutes = require('./routes/player');
const rankRoutes = require('./routes/rank');

app.use('/player', playerRoutes);
app.use('/rank', rankRoutes);

module.exports = app;
