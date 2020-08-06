// Ici on créée un modèle
const mongoose = require('mongoose');
// maintenant qu'on a récupérer la base de données, il faut indiquer un shéma (structure d'un objet de la base de donnée)
const userSchema = mongoose.Schema({
    firstname : String,
    lastname : String,
    pseudo : String,
    password : String,
    email : String,
    image : String,
    role : String,
});

module.exports = mongoose.model('users', userSchema);