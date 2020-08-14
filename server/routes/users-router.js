// creation route qui necessite express
// on appelle la méthode express en la placant ds une constante
const express = require('express');
const {checkAuth} = require('../middlewares/check-auth');
// on appelle la logique du routeur, on créée un routeur ;
// grace au routeur on créée des routes = une adresse + un controle ;
// une adresse est /api/users...
const router = express.Router();
const UsersCtrl = require('../controllers/users-ctrl');

// function middle1(req, res, next) {
//     console.log('middle1');
//     next();
//     //res.send('middle1 ok');
// }
// function middle2(req, res, next) {
//     console.log('middle2');
//     next();
//     //res.send('middle2 ok');
// }

// on créée une première route : un url + une méthode
router.post('/signup', UsersCtrl.saveUser);
// route pour s'inscrire, pour enregistrer un nouvel utilisateur en base de données
router.post('/login', UsersCtrl.loginUser);
router.get('/', checkAuth, UsersCtrl.findAll);
// route pour récupérer la liste de tous les utilisateurs
router.get('/:id', checkAuth, UsersCtrl.findById);
// route pour récupérer un utlisateur selon son id


// rendre accessible le router
// node, pour chaque fichier créée, il créée un module ;
//donc fichier=module
module.exports = router;