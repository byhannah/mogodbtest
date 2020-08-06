// importation
const mongoose = require('mongoose');
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PWD = process.env.DB_PWD;

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PWD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
// useNewUrlParser : interne à mongoose
// useUnifiedTopology : interne à mongoose

).then(function() {
    console.log('connection database ok');
// catch :
}).catch(function(error) {
    console.log(error);
});
