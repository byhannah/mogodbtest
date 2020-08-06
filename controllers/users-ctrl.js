const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const user = require('../models/user');
const {createToken} = require ('../services/create-token');
// User.find().then();
// supression tous les utilisateurs
//User.deleteMany({}).then(function() {
  //  console.log ('ok');
//});

class UsersCtrl {
    findAll(req, res) {
    // terminer la requête pour éviter que le serveur tourne pour rien
        User.find()
            .then(function(users) {
                if (!users || users.length < 1) {
                    return res.status(404).json({
                        message : "no users in database"
                    });
                }
                res.status(200).json({ users });
            })
            .catch(function(error) {
                res.status(500).json({
                    message: "erreur coté serveur",
                    error
                })
            });
    }

    findById(req, res) {
        const userId = req.params.id;

        if (userId) {
            User.findById(userId)
                .then(function(user) {
                    if (!user) {
                        return res.status(404).json({
                            message : 'user not found'
                        });
                    }
                    res.status(200).json({ user });
                })
                .catch(function(error) {
                    res.status(500).json({
                        message: "erreur coté serveur",
                        error
                    })
                });
            
        }
        else {
            res.status(403).json({
                message : 'bad id',
            })
        }
    }

    saveUser(req, res) {
        const {firstname, lastname, pseudo, email, password} = req.body;

        if (firstname && lastname && pseudo && email && password) {
            const user = new User();

            user.firstname = firstname.trim();
            user.lastname = lastname.trim();
            user.pseudo = pseudo.trim();
            user.email = email.trim();
            user.role = "ROLE_USER";
            user.image = null;

            User.find({$or: [{email: email}, {pseudo: pseudo}]})
                .then(function(usersFound){
                    if (usersFound.length > 0){
                        return res.status(403).json({
                            message : "This user already exists"
                        });
                    }

                    bcrypt.hash(password, null, null, function(error, passwordHashed) {
                        if (error) {
                            return res.status(500).json({
                                message : "hash didn't work"
                            });
                        }

                        user.password = passwordHashed;
                        user.save()
                            .then(function(user){
                                res.status(200).json({
                                    user
                                });
                            })
                            .catch(function(error){
                                res.status(500).json({error});
                            });
                    });

                })
                .catch(function(error){
                    res.status(500).json({error});
                })
        }
        else {
            res.status(400).json({
                message : 'you miss some informations'
            });
        }
    }
    
    loginUser(req, res) {
        const { email, password } = req.body;

        User.findOne({email})
            .then(function(userFound) {
                if (!userFound) {
                    return res.status(404).json({message : "this user is not recorded"});
                }
                bcrypt.compare(password, userFound.password, function(error, checked) {
                    if (error && !checked) {
                        return res.status(404).json({message : "Wrong password"});
                    }

                    userFound.password = undefined;
                    res.status(200).json({user: userFound, token: createToken(userFound)});
                });

            })
            .catch(function(error) {
                res.status(500).json({error});
            });
    }
}

// on créée une instance de la class
// instance : c'est l'objet à partir de la class ; 
// la class est une boite avec des objets à l'intérieur
module.exports = new UsersCtrl();