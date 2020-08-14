import UserService from "./user.service.js";
import UsersListHtml from "./users-list-html.js";

const usersListHtml = document.querySelector('.users-list');

document.querySelector('form').addEventListener('submit', function(event) {
    // form nom d'une balise html ; submit est un nom d'évènement javascript comme clic
    event.preventDefault();
    
    const inputUser = {
        email: this.email.value,
        password: this.password.value,
    };

    UserService.login(inputUser).then (function(data) {
        document.querySelector("h2").innerText = data.user
            ? 'Hi ' + data.user.firstname + ' !'
            : data.message;
            
        if (data.user) {
            document.querySelector('.deconnectionbutton').style.display = 'block';
        }
    });
});

document.querySelector('.deconnectionbutton').addEventListener('click', function() {
    UserService.logout();
    document.querySelector('.deconnectionbutton').style.display = 'none';
})

document.querySelector('.usersbutton').addEventListener('click', function() {
    UserService.findAll();

    const ulh = new UsersListHtml();
    console.log(ulh);

});