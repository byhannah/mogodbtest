let userToken = '';

export default class UserService {
    static login(inputUser) {
        userToken = '';
        
        return fetch('http://localhost:3000/api/users/login', {
            method: 'post', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(inputUser)
        }).then(res => res.json())
        .then(function(data){
            if (data.token && data.user) {
                userToken = data.token;
            }

            return data;
        });
    }

    static findAll() {
        fetch('http://localhost:3000/api/users', {
            method: 'get',
            headers: {Authorization: userToken}
        }).then(res => res.json())
        .then(function(data){
            console.log(data);
        })
    }

    static logout() {
        userToken = '';
    }
}