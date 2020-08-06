// jwt : json web token (une librairie qui va gérer les jetons de session)
const jwt = require("jwt-simple");
// on récupère une librairie pour gérer le temps
// moment est une autre librairie avec pour mission de gérer le temps.
const moment = require("moment");

// l'objet module est créée implicitement par node ; en fait, pour node, un fichier = un module
// cet objet représente le code du fichier, encapsuler dans l'objet module.
// exports est une propriété de module.
// checkAuth est un propriété que nous créons.
// dans une requete (req) ou une reponse (res) il y  a toujours un en-tête et un corps.
// L'entête contient les metadonnées; la clé est authorization qui va vérifier le jeton (jwt)
// authorizaton est une clé réservée
// si authorization n'est pas renseigné (! = faux, comme ""), on renvoi le message
module.exports.checkAuth = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).json({
            message : "la requete n'a pas l'entête de l'authentification"
        });
    }

    // récupération du jeton
    const token = req.headers.authorization;
    
    try {
        const pload = jwt.decode(token, process.env.SECRETKEY);
// si on arrive à decoder le token, on va en 28 ; sinon en 36
        if (pload.exp <= moment().unix()) {
            return res.status(403).jsons({
                message : "votre session a expirée"
            });
        }

        req.user = pload;
    }
    catch (e) {
        return res.status(403).json({
            message : "le jeton n'est pas valide"
        });
    }

    next();
};