// la constante jwt (Json Web Token) fait appel à la dépendance de cette application - 
// npm install jwt-simple.
const jwt = require('jwt-simple');
// même chose pour moment qui gère le temps
const moment = require('moment');

// on crée un module : libraire externe, 
// exports : rendre puoblic une parie du fichier aux utilisateurs/codeurs, create
// createToken : création d'un jeton de session
// à partir de là on crée une fonction qui va permettre l'utilisation du jeton dans lequel on met les informations que l'on veut
module.exports.createToken = function({_id, firstname, lastname, pseudo, email, role, image}) {
    // pload sont les données qui fassent partie de mon token
    const pload = {
        // sub : subject ; sub est un prorpiété réservée de pload
        // idem pour iat et exp
        sub: _id,
        // iat : issued at -> moment de la création du token ; 
        // unix : c'est le nom de unix, c'est le temps depuis le 1er janvier 1970, minuit
        iat: moment().unix(),
        // exp : expiration du jeton
        exp: moment().add(30, "days").unix(),
        // on ajoute les informations de l'utilisateur connecté qu'on met dans le jeton
        // en ligne suivant, ce sont des proprités qui nous appartiennent
        firstname, lastname, pseudo, email, role, image,
    };
    
    //return : encodage afin de générer un token
    return jwt.encode(pload, process.env.SECRETKEY);
};