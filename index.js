// point d'entrée de l'application appelé aussi le controleur frontal ; un seul par application ; 
// fait le lien entre le client et l'internaute/utiisateur
require('./db');
// import de app du fichier app.js
const app = require('./app');
// env = environnement ; parmis les variables d'environnement, une nous interesse : port
// Le second PORT de la ligne suivante correspond à un élément de process dans node
const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log('listenning on port ' + PORT)
});
