// gère l'application ds sa généralité
const express = require('express');
const app = express();
// récupération du router
const usersRouter = require('./routes/users-router');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/users', usersRouter);

module.exports = app;