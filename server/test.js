// module 1 ==> fichier 1
exports = {
    contact: {name: "kate", age: 54},
    sayHello: function() { console.log('Hey') },
    number: 4
};

function require(nameOfModule) {
    return nameOfModule;
}

// module 2 ==> fichier 2
const {contact} = require(exports);
console.log(contact);