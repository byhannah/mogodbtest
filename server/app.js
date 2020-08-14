// gère l'application ds sa généralité
const express = require('express');
const app = express();
const cors = require('cors');
// récupération du router
const usersRouter = require('./routes/users-router');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/users', usersRouter);

module.exports = app;